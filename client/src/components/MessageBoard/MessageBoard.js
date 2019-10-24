import React, { useState, useContext, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { SocketContext } from '../../context/SocketContext'
import { AuthContext } from '../../context/AuthContext'
import messageQuery from '../../queries/getMessages'
import messageMutation from '../../queries/createMessage'
import deleteMessageMutation from '../../queries/deleteMessage'

import Spinner from '../UI/Spinner/Spinner'

const defaultAvatar = "https://www.seekpng.com/png/full/428-4287240_no-avatar-user-circle-icon-png.png"

const MessageBoard = () => {
   const limit = 5
   const [moreResults, setMoreResults] = useState(true)
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
      fetchMore
   } = useQuery(messageQuery, { variables: { offset: 0, limit }, fetchPolicy: 'network-only' })


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
            return [{ query: messageQuery, variables: { offset: 0, limit } }]
         }, awaitRefetchQueries: true
      }).then(_ => setMessageText(''))
   }

   const onDelete = id => {
      if (window.confirm('Are you sure you want to delete your message?')) {
         deleteMessage({ variables: { id } })
      }
   }

   const loadMore = e => {
      fetchMore({
         variables: { offset: messages.getMessages.length },
         updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult.getMessages.length) {
               setMoreResults(false)
               return prev
            } else if (fetchMoreResult.getMessages.length < limit) {
               setMoreResults(false)
            }

            return Object.assign({}, prev, {
               getMessages: [...prev.getMessages, ...fetchMoreResult.getMessages]
            })
         }
      })
   }

   return (
      <div className="container flex">
         <div className="messageboard flexcolumn">
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
               {messages.getMessages.length > 0 ? messages.getMessages.map(msg => {
                  return <div key={msg.mid} className="messageboard__messages--msg">
                     {msg.avatar ? <img src={msg.avatar} alt="users avatar" /> :
                        <img src={defaultAvatar} alt="users avatar" />}
                     {msg.pid ? <Link to={`/profiles/${msg.pid}`}><h2>
                        {msg.username}
                     </h2></Link> : <h2>
                           {msg.username}
                        </h2>}
                     <p className="lead">
                        {msg.content}
                     </p>
                     {msg.username === userDetails.username &&
                        <button
                           onClick={e => onDelete(msg.mid)}
                           className="btn btn--thirdary">Remove</button>
                     }
                  </div>
               }) : <h2 style={{ textAlign: 'center' }} className="heading-2"> No messages yet... </h2>}
            </div>
            {moreResults && messages.getMessages.length > 5 && <button onClick={e => loadMore()} className="btn btn--secondary">Load more</button>}
         </div>
      </div>
   )
}

export default MessageBoard
