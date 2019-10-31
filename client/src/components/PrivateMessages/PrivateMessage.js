import React from 'react'

const PrivateMessage = ({ msg }) => {
   let cName = "privatemessages__msgs--msg"
   if (!msg.read) {
      cName += ' unread'
   }
   return (
      <div className={cName}>
         <img src={msg.avatar} alt="avatar" />
         <h3 className="heading-3">
            {msg.username}
         </h3>
         <span>Last Message: </span>
         <p className="lead">
            {msg.content}
         </p>
         <button className="btn btn--primary">
            View message history
         </button>
      </div>
   )
}

export default PrivateMessage
