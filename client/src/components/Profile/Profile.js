import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { SocketContext } from '../../context/SocketContext'
import { Redirect, Link } from 'react-router-dom'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'

import getProfile from '../../queries/getProfile'
// getProfileMessages is a seperate query from getProfile so 
// we don't have to refetch the entire profile when refetching posts.
import getProfilePosts from '../../queries/getProfilePosts'
import ProfileCreation from './ProfileCreation'

import ProfilePost from './ProfilePost'
import PostForm from './PostForm'

const Profile = ({ authLoading }) => {
   const limit = 5
   const { data, loading: profileLoading, error } = useQuery(getProfile)
   const [moreResults, setMoreResults] = useState(true)
   const { isAuth, userDetails } = useContext(AuthContext)
   const { socket } = useContext(SocketContext)
   const [profileMsgQuery, { data: profileMsgQueryData, refetch, fetchMore }] = useLazyQuery(getProfilePosts)

   useEffect(() => {
      // Fetch posts for the profile
      if (data && data.getProfile !== null) {
         profileMsgQuery({
            variables: {
               id: data.getProfile.id,
               limit: 5,
               offset: 0
            }
         })
      }
   }, [data, profileMsgQuery])

   useEffect(() => {
      const refetchAndUpdate = () => {
         refetch()
         setMoreResults(true)
      }
      // For real time updates on profile posts
      if (userDetails.username) {
         socket.on('updateProfilePosts', refetchAndUpdate)
      }

      return () => {
         socket.off('updateProfilePosts', refetchAndUpdate)
      }

   }, [userDetails.username, refetch, socket])

   const loadMore = e => {
      fetchMore({
         variables: { offset: profileMsgQueryData.getProfilePosts.length },
         updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult.getProfilePosts.length) {
               setMoreResults(false)
               return prev
            } else if (fetchMoreResult.getProfilePosts.length < limit) {
               setMoreResults(false)
            }

            return Object.assign({}, prev, {
               getProfilePosts: [...prev.getProfilePosts, ...fetchMoreResult.getProfilePosts]
            })
         }
      })
   }

   if (!authLoading && !isAuth) {
      return <Redirect to="/login" />
   }

   if (profileLoading || authLoading) return <div className="container" />

   if (!profileLoading
      && !authLoading
      && data.getProfile === null
   ) return <ProfileCreation />

   return (
      <div className="container flex">
         <div className="profile">
            {error && error.graphQLErrors.map(err => <p key={err.message} className="alert"> {err.message} </p>)}
            <div className="profile__image">
               <img className="avatar" src={data.getProfile.avatar} alt="users avatar" />
            </div>
            <div className="profile__heading">
               <h2 className="profile__heading--name">
                  {userDetails.username}'s Profile
               </h2>
               <Link className="btn btn--primary" to={{
                  pathname: '/edit-profile',
                  state: { data },
               }}> Edit Profile </Link>
            </div>
            <ul className="profile__bio">
               <li className="profile__bio--item">
                  <label>Location: </label>
                  <p className="lead">{data.getProfile.location ? data.getProfile.location : 'None specified'}</p>
               </li>
               <li className="profile__bio--item">
                  <label>Bio: </label>
                  <p className="lead">{data.getProfile.bio ? data.getProfile.bio : 'None specified'}</p>
               </li>
            </ul>
            <div className="profile__posts">
               <PostForm
                  setMoreResults={setMoreResults}
                  username={userDetails.username}
                  profileId={data.getProfile.id}
                  placeholder={"What's on your mind?"} />
               {profileMsgQueryData && profileMsgQueryData.getProfilePosts.map(msg => {
                  return <ProfilePost
                     setMoreResults={setMoreResults}
                     owner={true}
                     profileUsername={userDetails.username}
                     profileId={msg.profileid}
                     key={msg.id}
                     msg={msg} />
               })}
               {moreResults && profileMsgQueryData && profileMsgQueryData.getProfilePosts.length === 5 &&
                  <button onClick={e => loadMore()} className="btn btn--secondary loadmore">Load more</button>}
            </div>
         </div>
      </div>
   )
}

export default Profile
