import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import createProfilePost from '../../queries/createProfilePost'
import getProfilePosts from '../../queries/getProfilePosts'
const PostForm = ({ placeholder, profileId }) => {
   const [submitPost] = useMutation(createProfilePost)
   const [message, setMessage] = useState('')

   const onSubmit = e => {
      e.preventDefault()
      submitPost({
         variables: { id: profileId, content: message }, refetchQueries: () => {
            return [{ query: getProfilePosts, variables: { id: profileId } }]
         }, awaitRefetchQueries: true
      }).then(_ => setMessage(''))
   }

   return (
      <div className="profile__posts__form">
         <form className="form" onSubmit={onSubmit}>
            <input
               value={message}
               onChange={e => setMessage(e.target.value)}
               type="text" placeholder={placeholder} />
            <input className="btn btn--secondary" type="submit" value="Send" />
         </form>
      </div>
   )
}

export default PostForm
