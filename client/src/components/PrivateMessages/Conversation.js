import React, { useState, useEffect, useContext } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import getMsgs from '../../queries/getWholeConversation'
import sendMsg from '../../queries/sendPrivateMessage'
import markAsRead from '../../queries/markPmsAsRead'
import getUniquePms from '../../queries/getPrivateMessages'
import Spinner from '../UI/Spinner/Spinner'
import { SocketContext } from '../../context/SocketContext'

const Conversation = ({ id, username }) => {
   const [content, setContent] = useState('')
   const { socket } = useContext(SocketContext)
   const [send] = useMutation(sendMsg)
   const { data, loading, refetch } = useQuery(getMsgs, { variables: { id } })
   const [mark] = useMutation(markAsRead)

   useEffect(() => {
      mark({
         variables: { id }, refetchQueries: () => [
            { query: getUniquePms }
         ]
      })
   }, [id, mark])

   useEffect(() => {
      const refetchAndAutoScroll = () => {
         refetch().then(_ => {
            const msgBox = document.querySelector('.conversation__msgs')
            const { scrollHeight: sh, offsetHeight: oh, scrollTop: st } = msgBox
            if (st + oh > sh - 150) {
               msgBox.scrollTop = sh
            }
         })
      }
      socket.on('updatePms', refetchAndAutoScroll)

      return () => socket.off('updatePms', refetchAndAutoScroll)
   }, [socket, username, refetch])

   const onSubmit = e => {

      const msgBox = document.querySelector('.conversation__msgs')
      const { scrollHeight: sh, offsetHeight: oh, scrollTop: st } = msgBox

      e.preventDefault()
      send({
         variables: { to: id, content }, refetchQueries: () => [
            { query: getMsgs, variables: { id } },
            { query: getUniquePms }
         ], awaitRefetchQueries: true
      }).then(_ => {
         // autoscroll
         if (st + oh > sh - 150) {
            msgBox.scrollTop = sh
         }
         socket.emit('newPms', username)
         socket.emit('sendPMNotification', username)
         setContent('')
      })
   }

   return (
      <div className="conversation">
         <h3 className="heading-3">
            {username}
         </h3>
         <div className="conversation__msgs">
            {loading ? <Spinner /> : data && data.getWholeConversation.map(msg => {
               return <div
                  key={msg.id}
                  className={'conversation__msgs--msg ' + (msg.userid === id ? 'other' : 'me')}>
                  <p className="lead"> {msg.content} </p>
               </div>
            })}
         </div>
         <form className="form" onSubmit={onSubmit}>
            <input required type="text" value={content} onChange={e => setContent(e.target.value)} />
            <input type="submit" className="btn btn--primary" />
         </form>
      </div>
   )
}

export default React.memo(Conversation)
