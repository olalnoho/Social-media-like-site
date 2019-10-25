import React, { useContext, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { AuthContext } from '../../context/AuthContext'
import { SocketContext } from '../../context/SocketContext'
import { Redirect } from 'react-router-dom'
import query from '../../queries/getProfileById'
import Modal from '../UI/Modal/Modal'
import PMForm from './PMForm'

const OtherProfile = props => {
   const { data, loading, error } = useQuery(query, { variables: { id: props.match.params.id } })
   const { userDetails } = useContext(AuthContext)
   const { onlineList } = useContext(SocketContext)
   const [showModal, setShowModal] = useState(false)

   if (loading) {
      return <div className="container flex" />
   }

   if (error) {
      return <div className="container flex">
         <h2 className="alert" style={{ margin: "auto" }}>
            Profile does not exist
         </h2>
      </div>
   }

   if (data && userDetails.username === data.getProfileById.username) {
      return <Redirect to="/profile" />
   }

   if (data) {
      console.log(data.getProfileById)
   }

   return (
      <div className="container flex" onClick={e => {
         setShowModal(false)
      }}>
         {showModal && <Modal>
            <PMForm setShowModal={setShowModal} name={data.getProfileById.username} userId={data.getProfileById.user} />
         </Modal>}
         <div className="profile">
            {error && error.graphQLErrors.map(err => <p key={err.message} className="alert"> {err.message} </p>)}
            <div className="profile__image">
               <img className="avatar" src={data.getProfileById.avatar} alt="users avatar" />
            </div>
            <div className="profile__heading">
               <h2 className="profile__heading--name">
                  {data.getProfileById.username}'s Profile
               </h2>
               <div className="profile__heading--status">
                  {data.getProfileById.username in onlineList ?
                     <p> Online <i style={{ color: 'green' }} className="fas fa-circle"></i></p>
                     : <p> Offline <i style={{ color: 'red' }} className="fas fa-circle"></i></p>
                  }
                  <button
                     onClick={e => {
                        e.stopPropagation()
                        setShowModal(true)
                     }}
                     className="btn btn--secondary">Message</button>
               </div>
            </div>
            <ul className="profile__bio">
               <li className="profile__bio--item">
                  <label>Location: </label>
                  <p className="lead">{data.getProfileById.location ? data.getProfileById.location : 'None specified'}</p>
               </li>
               <li className="profile__bio--item">
                  <label>Bio: </label>
                  <p className="lead">{data.getProfileById.bio ? data.getProfileById.bio : 'None specified'}</p>
               </li>
            </ul>
            <div className="profile__posts">

            </div>
         </div>
      </div>
   )
}


/*
 {data.getProfileById.username in onlineList ?
    <p> Online <i style={{ color: 'green' }} className="fas fa-circle"></i></p>
    : <p> Offline <i style={{ color: 'red' }} className="fas fa-circle"></i></p>
 }
*/

export default OtherProfile
