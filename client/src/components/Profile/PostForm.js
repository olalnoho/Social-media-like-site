import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { SocketContext } from '../../context/SocketContext'
import createProfilePost from '../../queries/createProfilePost'
import getProfilePosts from '../../queries/getProfilePosts'
const PostForm = ({ placeholder, profileId, username, setMoreResults }) => {
   const { socket } = useContext(SocketContext)
   const [submitPost] = useMutation(createProfilePost)
   const [message, setMessage] = useState('')

   const onSubmit = e => {
      e.preventDefault()
      if (message) {
         submitPost({
            variables: { id: profileId, content: message }, refetchQueries: () => {
               return [{ query: getProfilePosts, variables: { id: profileId, limit: 5, offset: 0 } }]
            }, awaitRefetchQueries: true
         }).then(_ => {
            setMessage('')
            socket.emit('newPost', username)
            socket.emit('sendProfileNotification', username)
            setMoreResults(true)
         })
      }
   }

   return (
      <div className="profile__posts__form">
         <form className="form" onSubmit={onSubmit}>
            <input
               required
               value={message}
               onChange={e => setMessage(e.target.value)}
               type="text" placeholder={placeholder} />
            <input className="btn btn--secondary" type="submit" value="Send" />
         </form>
      </div>
   )
}

export default PostForm
