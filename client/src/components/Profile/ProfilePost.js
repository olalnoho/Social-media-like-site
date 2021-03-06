import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { SocketContext } from '../../context/SocketContext'
import { useMutation } from '@apollo/react-hooks'
import deleteProfilePostMutation from '../../queries/deleteProfilePost'
import getProfilePosts from '../../queries/getProfilePosts'
import { Link } from 'react-router-dom'
const defaultAvatar = "http://www.iconsalot.com/asset/icons/freepik/electronic-commerce/128/user-avatar-profile-icon.png"
const ProfilePost = ({ msg, owner, profileId, profileUsername, setMoreResults }) => {
   const { userDetails } = useContext(AuthContext)
   const { socket } = useContext(SocketContext)
   const [deletePost] = useMutation(deleteProfilePostMutation)
   const withOutLink = <h3 className="heading-3"> {msg.username} </h3>
   const withLink = <Link to={`/profiles/${msg.profileid}`}><h3 className="heading-3"> {msg.username} </h3></Link>

   const removePost = id => {
      deletePost({
         variables: { id },
         refetchQueries: () => [
            {
               query: getProfilePosts,
               variables: { id: profileId, limit: 5, offset: 0 }
            }],
         awaitRefetchQueries: true
      }).then(_ => {
         socket.emit('newPost', profileUsername)
         setMoreResults(true)
      })
   }

   return (
      <div className="profile__posts--post">
         <img src={msg.avatar ? msg.avatar : defaultAvatar} alt="avatar" />
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
