import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'

import getPMs from '../../queries/getPrivateMessages'
import PrivateMessage from './PrivateMessage'

import Modal from '../UI/Modal/Modal'
import Conversation from './Conversation'

const PrivateMessages = () => {
   const { data, loading } = useQuery(getPMs, { fetchPolicy: 'network-only' })
   const [selectedUser, setSelectedUser] = useState(null)
   if (loading) {
      return <div className="container flexcolumn"></div>
   }

   return (
      <div className="container flexcolumn" onClick={e => {
         setSelectedUser(null)
      }}>
         {selectedUser && <Modal extraClass="conversationModal">
            <Conversation id={selectedUser.id} username={selectedUser.username} />
         </Modal>}
         <div className="privatemessages">
            <div className="privatemessages__heading">
               <h2 className="heading-2">
                  Your messages
               </h2>
            </div>
            <div className="privatemessages__msgs">
               {data && data.getPrivateMessagesWithUniqueUsers.map(msg => {
                  return <PrivateMessage selectUser={setSelectedUser} key={msg.id} msg={msg} />
               })}
            </div>
         </div>
      </div>
   )
}

export default PrivateMessages
