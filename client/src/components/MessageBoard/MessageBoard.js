import React from 'react'

const MessageBoard = () => {
   return (
      <div className="container flex">
         <div className="messageboard">
            <form className="form">
               <input type="text" placeholder="Enter a message..." />
            </form>
            <div className="messageboard__messages">
               <h2 className="heading-2">Hello</h2>
            </div>
         </div>
      </div>
   )
}

export default MessageBoard
