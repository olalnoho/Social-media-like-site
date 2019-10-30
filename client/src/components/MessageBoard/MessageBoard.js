import React, { useState, useContext, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { SocketContext } from '../../context/SocketContext'
import messageQuery from '../../queries/getMessages'
import messageMutation from '../../queries/createMessage'

import Spinner from '../UI/Spinner/Spinner'
import Message from './Message'

const MessageBoard = () => {
   const [limit, setLimit] = useState(5)
   const [moreResults, setMoreResults] = useState(true)
   const { socket } = useContext(SocketContext)
   const [messageText, setMessageText] = useState('')
   const [sendMessage, { loading: sendLoading, error: sendError }] = useMutation(messageMutation)

   const {
      data: messages,
      loading: messageLoading,
      error: messageError,
      refetch,
      fetchMore
   } = useQuery(messageQuery, { variables: { offset: 0, limit: 5 }, fetchPolicy: 'network-only' })
   

   console.log(messageLoading)


   useEffect(() => {
      const refetchAtLimit = () => {
         refetch({ limit: limit + 1 })
      }
      socket.on('message_update', refetchAtLimit)
      return () => socket.off('message_update', refetchAtLimit)
   }, [refetch, socket, limit])

   if (messageLoading) {
      return <div className="container flex">
         </div>
   }

   const onSubmit = e => {
      e.preventDefault()
      sendMessage({
         variables: { content: messageText }, refetchQueries: () => {
            return [{ query: messageQuery, variables: { offset: 0, limit } }]
         }, awaitRefetchQueries: true
      }).then(_ => setMessageText(''))
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

            setLimit(fetchMoreResult.getMessages.length + limit)

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

               {(messageLoading || sendLoading) && <Spinner />}

            </form>

            {(sendError || messageError) && <div className="alert" style={{ textAlign: 'center' }}> Something went wrong, try again.</div>}

            <div className="messageboard__messages">

               {messages.getMessages.length > 0 ? messages.getMessages.map(msg => {
                  return <Message key={msg.mid} msg={msg} />
               }) : <h2 style={{ textAlign: 'center' }} className="heading-2"> No messages yet... </h2>}

            </div>

            {moreResults && messages.getMessages.length + 2 >= limit &&
               <button onClick={e => loadMore()} className="btn btn--secondary">Load more</button>
            }

         </div>
      </div>
   )
}

export default MessageBoard
