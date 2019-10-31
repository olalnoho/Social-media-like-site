import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import getPMs from '../../queries/getPrivateMessages'
import PrivateMessage from './PrivateMessage'
const PrivateMessages = () => {
   const { data, loading } = useQuery(getPMs)
   if(loading) {
      return <div className="container flexcolumn"></div>
   }

   return (
      <div className="container flexcolumn">
         <div className="privatemessages">
            <div className="privatemessages__heading">
               <h2 className="heading-2">
                  Your messages
               </h2>
            </div>
            <div className="privatemessages__msgs">
               {data && data.getPrivateMessagesWithUniqueUsers.map(msg => {
                  return <PrivateMessage key={msg.id} msg={msg} />
               })}
            </div>
         </div>
      </div>
   )
}

export default PrivateMessages
