import React from 'react'

const ProfilePost = ({msg}) => {
   return (
      <div className="profile__posts--post">
         <img src={msg.avatar} alt="avatar"/>
         <h3 className="heading-3"> {msg.username} </h3>
         <p className="lead"> {msg.content} </p>
      </div>
   )
}

export default ProfilePost
