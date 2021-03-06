import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Redirect } from 'react-router-dom'


import login from '../../../queries/login'
import { AuthContext } from '../../../context/AuthContext'
import { SocketContext } from '../../../context/SocketContext'

const Login = () => {

   const { setIsAuth, setUserDetails } = useContext(AuthContext)
   const { socket } = useContext(SocketContext)
   const [identifier, setIdentifier] = useState('')
   const [password, setPassword] = useState('')
   const [loginMutation, { data, error }] = useMutation(login)

   const onSubmit = e => {
      e.preventDefault()
      loginMutation({ variables: { identifier, password } })
      setPassword('')
      setIdentifier('')
   }

   if (data) {
      setIsAuth(true)
      setUserDetails(data.login.user)
      localStorage.setItem('token', data.login.token)
      // auth is for online list
      socket.emit('auth', data.login.user)
      // joinOwnRoom is for notifications
      socket.emit('joinOwnRoom', data.login.user.username)
      return <Redirect to="/" />
   }

   return (
      <div className="container flexcenter flexcolumn">
         {error && error.graphQLErrors.map(err => <p key={err.message} className="alert"> {err.message} </p>)}
         <h2 className="heading-2 formheader">
            <i className="fas fa-unlock-alt"></i>
            Login
            </h2>
         <form className="form" onSubmit={onSubmit}>
            <input
               value={identifier}
               type="text"
               placeholder="Username or email"
               onChange={e => setIdentifier(e.target.value)} />
            <input
               value={password}
               type="password"
               placeholder="Password"
               onChange={e => setPassword(e.target.value)} />
            <input type="submit" value="Submit" className="btn btn--thirdary" />
         </form>
      </div>
   )
}

export default Login
