import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import getMsgs from '../../queries/getWholeConversation'
import Spinner from '../UI/Spinner/Spinner'
const Conversation = React.memo(({ id, username }) => {
   const { data, loading } = useQuery(getMsgs, { variables: { id } })
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
         <form className="form">
            <input type="text" />
            <input type="submit" className="btn btn--primary" />
         </form>
      </div>
   )
})

export default Conversation
