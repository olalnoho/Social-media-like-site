import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import getMsgs from '../../queries/getWholeConversation'
const Conversation = React.memo(({ id, username }) => {
   const { data } = useQuery(getMsgs, { variables: { id } })
   return (
      <div className="conversation">
         <h3 className="heading-3">
            {username}
         </h3>
         <div className="conversation__msgs">

         </div>
      </div>
   )
})

export default Conversation
