import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import query from '../../queries/getProfileById'

const OtherProfile = props => {
   const { data, loading, error } = useQuery(query, { variables: { id: props.match.params.id } })

   if (loading) {
      return <div className="container flex" />
   }

   if (error) {
      return <div className="container flex">
         <h2 className="alert" style={{ margin: "auto" }}>
            Profile does not exist
         </h2>
      </div>
   }

   return (
      <div className="container flex">
         <div className="profile">
            {error && error.graphQLErrors.map(err => <p key={err.message} className="alert"> {err.message} </p>)}
            <div className="profile__image">
               <img className="avatar" src={data.getProfileById.avatar} alt="users avatar" />
            </div>
            <div className="profile__heading">
               <h2 className="profile__heading--name">
                  {data.getProfileById.username}'s Profile
               </h2>
            </div>
            <ul className="profile__bio">
               <li className="profile__bio--item">
                  <label>Location: </label>
                  <p className="lead">{data.getProfileById.location ? data.getProfileById.location : 'None specified'}</p>
               </li>
               <li className="profile__bio--item">
                  <label>Bio: </label>
                  <p className="lead">{data.getProfileById.bio ? data.getProfileById.bio : 'None specified'}</p>
               </li>
            </ul>
            <div className="profile__posts">

            </div>
         </div>
      </div>
   )
}

export default OtherProfile
