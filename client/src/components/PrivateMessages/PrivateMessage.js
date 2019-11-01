import React from 'react'
const defaultAvatar = "http://www.iconsalot.com/asset/icons/freepik/electronic-commerce/128/user-avatar-profile-icon.png"
const PrivateMessage = ({ msg, selectUser }) => {

   let cName = "privatemessages__msgs--msg"
   if (!msg.read) {
      cName += ' unread'
   }

   return (
      <div className={cName}>
         {!msg.read && <div className="unread"></div>}
         <img src={msg.avatar ? msg.avatar : defaultAvatar} alt="avatar" />
         <h3 className="heading-3">
            {msg.username}
         </h3>
         <span>Last Message: </span>
         <p className="lead">
            {msg.content}
         </p>
         <button onClick={e => {
            e.stopPropagation()
            selectUser({
               id: msg.userid,
               username: msg.username
            })
         }} className="btn btn--secondary">
            View message history
         </button>
      </div>
   )
}

export default PrivateMessage
