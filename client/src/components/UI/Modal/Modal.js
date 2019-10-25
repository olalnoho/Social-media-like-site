import React from 'react'

const Modal = props => {
   return (
      <div onClick={e => {
         e.stopPropagation()
      }} className="modal">
         {props.children}
      </div>
   )
}

export default Modal
