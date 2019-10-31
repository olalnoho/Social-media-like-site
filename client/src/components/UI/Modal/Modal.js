import React from 'react'

const Modal = props => {
   let classNames = 'modal'
   if(props.extraClass) {
      classNames += ` ${props.extraClass}`
   }
   return (
      <div onClick={e => {
         e.stopPropagation()
      }} className={classNames}>
         {props.children}
      </div>
   )
}

export default Modal
