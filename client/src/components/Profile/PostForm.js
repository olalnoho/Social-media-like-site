import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { SocketContext } from '../../context/SocketContext'
import createProfilePost from '../../queries/createProfilePost'
import getProfilePosts from '../../queries/getProfilePosts'
const PostForm = ({ placeholder, profileId, username }) => {
   const { socket } = useContext(SocketContext)
   const [submitPost] = useMutation(createProfilePost)
   const [message, setMessage] = useState('')

   const onSubmit = e => {
      e.preventDefault()
      if (message) {
         submitPost({
            variables: { id: profileId, content: message }, refetchQueries: () => {
               return [{ query: getProfilePosts, variables: { id: profileId } }]
            }, awaitRefetchQueries: true
         }).then(_ => {
            setMessage('')
            // Socket emits here so we can update the posts in real time.
            // the user-socket joins the room of the profile username
            // when Profile/OtherProfile component mounts.
            // The username parameter is which room to emit in.
            socket.emit('newPost', username)
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
