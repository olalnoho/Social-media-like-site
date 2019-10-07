import React, { useState, useContext, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { SocketContext } from '../../context/SocketContext'
import { AuthContext } from '../../context/AuthContext'
import messageQuery from '../../queries/getMessages'
import messageMutation from '../../queries/createMessage'
import deleteMessageMutation from '../../queries/deleteMessage'

import Spinner from '../UI/Spinner/Spinner'

const MessageBoard = () => {
   const { socket } = useContext(SocketContext)
   const { userDetails } = useContext(AuthContext)
   const [messageText, setMessageText] = useState('')
   const [sendMessage, { loading: sendLoading, error: sendError }] = useMutation(messageMutation)
   const [deleteMessage, { loading: deleteLoading }] = useMutation(deleteMessageMutation)

   const {
      data: messages,
      loading: messageLoading,
      error: messageError,
      refetch,
   } = useQuery(messageQuery, { fetchPolicy  : 'network-only' })


   useEffect(() => {
      socket.on('message_update', refetch)
      return () => socket.off('message_update', refetch)
   }, [refetch, socket])

   if (messageLoading) {
      return <div className="container flex" />
   }

   const onSubmit = e => {
      e.preventDefault()
      sendMessage({
         variables: { content: messageText }, refetchQueries: () => {
            return [{ query: messageQuery }]
         }, awaitRefetchQueries: true
      }).then(_ => setMessageText(''))
   }

   const onDelete = id => {
      if (window.confirm('Are you sure you want to delete your message?')) {
         deleteMessage({ variables: { id } })
      }
   }

   return (
      <div className="container flex">
         <div className="messageboard">
            <form className="form" onSubmit={onSubmit} >
               <input
                  value={messageText}
                  type="text"
                  placeholder="Enter a message..."
                  required
                  onChange={e => setMessageText(e.target.value)} />
               <input type="submit" className="btn btn--primary" value="Send message" />
               {(messageLoading || sendLoading || deleteLoading) && <Spinner />}
            </form>
            {(sendError || messageError) && <div className="alert" style={{ textAlign: 'center' }}> Something went wrong, try again.</div>}
            <div className="messageboard__messages">
               {messages.getMessages.map(msg => {
                  return <div key={msg.mid} className="messageboard__messages--msg">
                     <img src={msg.avatar} alt="users avatar" />
                     <Link to={`/profiles/${msg.pid}`}><h2>
                        {msg.username}
                     </h2></Link>
                     <p className="lead">
                        {msg.content}
                     </p>
                     {msg.username === userDetails.username &&
                        <button
                           onClick={e => onDelete(msg.mid)}
                           className="btn btn--thirdary">Remove</button>
                     }
                  </div>
               })}
            </div>
         </div>
      </div>
   )
}

export default MessageBoard
