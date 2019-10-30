import React, { useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import deleteMessageMutation from '../../queries/deleteMessage'
import Spinner from '../UI/Spinner/Spinner'

const defaultAvatar = "http://www.iconsalot.com/asset/icons/freepik/electronic-commerce/128/user-avatar-profile-icon.png"
const Message = ({ msg }) => {
   const [deleteMessage, { loading }] = useMutation(deleteMessageMutation)
   const { userDetails } = useContext(AuthContext)

   const onDelete = id => {
      deleteMessage({ variables: { id } })
   }

   if (loading) return <div className="messageboard__messages--msg">
      <Spinner />
   </div>

   return (
      <div className="messageboard__messages--msg">
         {msg.avatar ?
            <img src={msg.avatar} alt="users avatar" />
            : <img src={defaultAvatar} alt="users avatar" />}

         {msg.pid ?
            <Link to={`/profiles/${msg.pid}`}><h2> {msg.username} </h2></Link>
            : <h2> {msg.username} </h2>}

         <p className="lead"> {msg.content} </p>

         {msg.username === userDetails.username &&
            <button onClick={e => onDelete(msg.mid)} className="btn btn--thirdary">Remove</button>}
      </div>
   )
}

export default React.memo(Message)