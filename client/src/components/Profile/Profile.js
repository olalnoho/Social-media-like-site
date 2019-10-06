import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Redirect, Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import getProfile from '../../queries/getProfile'
import ProfileCreation from './ProfileCreation'

const Profile = ({ authLoading }) => {
   const { data, loading: profileLoading, error } = useQuery(getProfile)
   const { isAuth, userDetails } = useContext(AuthContext)

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

            </div>
         </div>
      </div>
   )
}

export default Profile
