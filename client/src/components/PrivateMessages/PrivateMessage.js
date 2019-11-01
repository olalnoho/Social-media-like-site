import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
const defaultAvatar = "http://www.iconsalot.com/asset/icons/freepik/electronic-commerce/128/user-avatar-profile-icon.png"
const PrivateMessage = ({ msg, selectUser }) => {
   const { userDetails } = useContext(AuthContext)

   return (
      <div className='privatemessages__msgs--msg'>
         {!msg.read && userDetails.username !== msg.sent_by_username && <div className="unread"></div>}
         <img src={msg.avatar ? msg.avatar : defaultAvatar} alt="avatar" />
         <h3 className="heading-3">
            {msg.username}
         </h3>
         <span>Last Message, sent by {msg.sent_by_username} </span>
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

export default React.memo(PrivateMessage)