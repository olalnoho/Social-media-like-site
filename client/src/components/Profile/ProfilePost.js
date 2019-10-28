import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useMutation } from '@apollo/react-hooks'
import deleteProfilePostMutation from '../../queries/deleteProfilePost'
import getProfilePosts from '../../queries/getProfilePosts'
import { Link } from 'react-router-dom'
const ProfilePost = ({ msg, owner, profileId }) => {
   const { userDetails } = useContext(AuthContext)
   const [deletePost] = useMutation(deleteProfilePostMutation)
   const withOutLink = <h3 className="heading-3"> {msg.username} </h3>
   const withLink = <Link to={`/profiles/${msg.profileid}`}><h3 className="heading-3"> {msg.username} </h3></Link>

   const removePost = id => {
      deletePost({
         variables: { id },
         refetchQueries: () => [
            {
               query: getProfilePosts,
               variables: { id: profileId }
            }],
         awaitRefetchQueries: true
      })
   }

   return (
      <div className="profile__posts--post">
         <img src={msg.avatar} alt="avatar" />
         {msg.profileid ? withLink : withOutLink}
         {(owner || userDetails.username === msg.username) && <button
            onClick={e => removePost(msg.id)}
            className="btn btn--thirdary"
         >Remove</button>}
         <p className="lead"> {msg.content} </p>
      </div>
   )
}

export default ProfilePost
