<<<<<<< HEAD
import React, { useState, useContext, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { SocketContext } from '../../context/SocketContext'
=======
import React, { useState, useContext } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
>>>>>>> 30731cda84a22e4fe276718a5bc4e9473a496eb4
import messageQuery from '../../queries/getMessages'
import messageMutation from '../../queries/createMessage'
import deleteMessageMutation from '../../queries/deleteMessage'

import Spinner from '../UI/Spinner/Spinner'
import Message from './Message'

const MessageBoard = () => {
<<<<<<< HEAD
   const [limit, setLimit] = useState(5)
   const [moreResults, setMoreResults] = useState(true)
   const { socket } = useContext(SocketContext)
   const [messageText, setMessageText] = useState('')
   const [sendMessage, { loading: sendLoading, error: sendError }] = useMutation(messageMutation)
   const [fetchMoreLoading, setFetchMoreLoading] = useState(false)

=======
   const { userDetails } = useContext(AuthContext)
   const [messageText, setMessageText] = useState('')
   const [sendMessage, { loading: sendLoading, error: sendError }] = useMutation(messageMutation)
   const [deleteMessage, { loading: deleteLoading }] = useMutation(deleteMessageMutation)
>>>>>>> 30731cda84a22e4fe276718a5bc4e9473a496eb4
   const {
      data: messages,
      loading: messageLoading,
      error: messageError,
<<<<<<< HEAD
      refetch,
      fetchMore
   } = useQuery(messageQuery, { variables: { offset: 0, limit: 5 }, fetchPolicy: 'network-only' })

   useEffect(() => {
      const refetchAtLimit = () => {
         refetch({ limit: limit + 1 })
      }
      socket.on('message_update', refetchAtLimit)
      return () => socket.off('message_update', refetchAtLimit)
   }, [refetch, socket, limit])
=======
   } = useQuery(messageQuery, {
      fetchPolicy: 'network-only',
      pollInterval: 5000
   })
>>>>>>> 30731cda84a22e4fe276718a5bc4e9473a496eb4

   if (messageLoading) {
      return <div className="container flex">
      </div>
   }

   const onSubmit = e => {
      e.preventDefault()
      sendMessage({
         variables: { content: messageText },
      }).then(_ => setMessageText(''))
   }

<<<<<<< HEAD
   const loadMore = e => {
      setFetchMoreLoading(true)
      fetchMore({
         variables: { offset: messages.getMessages.length },
         updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult.getMessages.length) {
               setMoreResults(false)
               return prev
            }
            else if (fetchMoreResult.getMessages.length < 5) {
               setMoreResults(false)
            }

            setLimit(fetchMoreResult.getMessages.length + limit)

            return Object.assign({}, prev, {
               getMessages: [...prev.getMessages, ...fetchMoreResult.getMessages]
            })
         }
      }).then(_ => {
         setFetchMoreLoading(false)
      })
   }
=======
   const onDelete = id => {
      console.log(id)
      if (window.confirm('Are you sure you want to delete your message?')) {
         deleteMessage({
            variables: { id }, refetchQueries: () => {
               return [{ query: messageQuery }]
            }, awaitRefetchQueries: true
         })
      }
   }

>>>>>>> 30731cda84a22e4fe276718a5bc4e9473a496eb4

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
<<<<<<< HEAD
               {messages.getMessages.length > 0 ? messages.getMessages.map(msg => {
                  return <Message key={msg.mid} msg={msg} />
               }) : <h2 style={{ textAlign: 'center' }} className="heading-2"> No messages yet... </h2>}
=======
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
>>>>>>> 30731cda84a22e4fe276718a5bc4e9473a496eb4
            </div>
            {fetchMoreLoading ? <div className="messageboard--load">
               <Spinner />
            </div> :
               moreResults && messages.getMessages.length >= limit &&
               <button onClick={e => loadMore()} className="btn btn--secondary">Load more</button>
            }

         </div>
      </div>
   )
}

export default MessageBoard
