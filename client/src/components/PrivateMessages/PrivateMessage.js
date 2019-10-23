import React from 'react'

const PrivateMessage = ({ msg }) => {
   console.log(msg)
   return (
      <div className="privatemessages__msgs--msg">
         <img src={msg.from_user.avatar} alt="avatar" />
         <h3 className="heading-2">
            From: {msg.from_user.username}
         </h3>
         <p className="lead">
            {msg.content}
         </p>
         <button className="btn btn--primary">Reply</button>
      </div>
   )
}

export default PrivateMessage
