import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import messageQuery from '../../queries/getMessages'
import messageMutation from '../../queries/createMessage'

const MessageBoard = () => {
   const [messageText, setMessageText] = useState('')
   const [sendMessage, { loading: sendLoading, error: sendError }] = useMutation(messageMutation)
   const {
      data: messages,
      loading: messageLoading,
      error: messageError,
   } = useQuery(messageQuery, { fetchPolicy: 'network-only' })

   if (messageLoading) {
      return <div className="container flex" />
   }

   const onSubmit = e => {
      e.preventDefault()
      sendMessage({
         variables: { content: messageText }, refetchQueries: () => {
            return [{ query: messageQuery }]
         }, awaitRefetchQueries: true
      })
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
            </form>
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
                  </div>
               })}
            </div>
         </div>
      </div>
   )
}

export default MessageBoard
