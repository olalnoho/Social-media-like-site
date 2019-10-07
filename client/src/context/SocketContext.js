import React from 'react'
import io from 'socket.io-client'

export const SocketContext = React.createContext({
   socket: null
})

const socket = io('http://localhost:4000')

export default props => {
   return (
      <SocketContext.Provider value={{ socket }}>
         {props.children}
      </SocketContext.Provider>
   )
}