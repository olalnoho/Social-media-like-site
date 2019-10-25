import React from 'react'
import { Link } from 'react-router-dom'
const ProfilePost = ({ msg }) => {
   const withOutLink = <h3 className="heading-3"> {msg.username} </h3>
   const withLink = <Link to={`/profiles/${msg.profileid}`}><h3 className="heading-3"> {msg.username} </h3></Link>
   return (
      <div className="profile__posts--post">
         <img src={msg.avatar} alt="avatar" />
         {msg.profileid ? withLink : withOutLink}
         <p className="lead"> {msg.content} </p>
      </div>
   )
}

export default ProfilePost
