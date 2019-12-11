import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import createUser from '../../../queries/createUser'
import { AuthContext } from '../../../context/AuthContext'
import { Redirect } from 'react-router-dom'

const Register = () => {

   const { setIsAuth, setUserDetails } = useContext(AuthContext)
   const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
   })

   const [register, { data, error }] = useMutation(createUser)

   const onSubmit = e => {
      e.preventDefault()
      register({ variables: { username: formData.username, email: formData.email, password: formData.password } })
      setFormData({ username: '', email: '', password: '' })
   }

   if (data) {
      setIsAuth(true)
      localStorage.setItem('token', data.createUser.token)
      setUserDetails(data.createUser.user)
      return <Redirect to="/" />
   }

   return (
      <div className="container flexcenter flexcolumn">
         {error && error.graphQLErrors.map(err => <p key={err.message} className="alert"> {err.message} </p>)}
         <h2 className="heading-2 formheader">
            <i className="far fa-id-badge"></i>
            Register
            </h2>
         <form className="form" onSubmit={onSubmit}>
            <input
               value={formData.username}
               type="text"
               placeholder="Username"
               onChange={e => setFormData({ ...formData, username: e.target.value })} />
            <input
               value={formData.email}
               type="email"
               placeholder="Email"
               onChange={e => setFormData({ ...formData, email: e.target.value })} />
            <input
               value={formData.password}
               type="password"
               placeholder="Password"
               onChange={e => setFormData({ ...formData, password: e.target.value })} />
            <input type="submit" value="Submit" className="btn btn--thirdary" />
         </form>
      </div>
   )
}

export default Register
