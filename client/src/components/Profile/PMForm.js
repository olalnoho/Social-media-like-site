import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import sendPmMutation from '../../queries/sendPrivateMessage'

import Spinner from '../UI/Spinner/Spinner'
const PMForm = ({ name, userId, setShowModal }) => {
   const [messageText, setMessageText] = useState('')
   const [sendPM, { loading }] = useMutation(sendPmMutation)
   const sendMessage = e => {
      e.preventDefault()
      sendPM({ variables: { to: userId, content: messageText } })
         .then(_ => {
            setMessageText('')
            setShowModal(false)
         })
   }


   if (loading) {
      return <div className="pm">
         <Spinner />
      </div>
   }
   return (
      <div className="pm">
         <h3 className="heading-3">
            Message to {name}
         </h3>
         <form className="form" onSubmit={sendMessage}>
            <textarea
               value={messageText}
               onChange={e => setMessageText(e.target.value)}
               placeholder="Message" />
            <input className="btn btn--primary" type="submit" value="Send" />
         </form>
      </div>
   )
}

export default PMForm
