import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

export const SocketContext = React.createContext({
   socket: null
})

const socket = io('http://localhost:4000')

export default props => {
   const [onlineList, setOnlineList] = useState({})
   useEffect(() => {
      const updateOnlineList = data => {
         setOnlineList(data)
      }
      socket.on('updateOnlineData', data => updateOnlineList(data))
      return () => socket.off('updateOnlineData', data => updateOnlineList(data))
   }, [])
   
   return (
      <SocketContext.Provider value={{ socket, onlineList }}>
         {props.children}
      </SocketContext.Provider>
   )
}