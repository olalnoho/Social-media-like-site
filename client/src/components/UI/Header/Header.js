import React, { useContext } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import { SocketContext } from '../../../context/SocketContext'
import { useApolloClient } from '@apollo/react-hooks'
const Header = ({ authLoading, ...router }) => {
   const client = useApolloClient()
   const { isAuth, setIsAuth, setUserDetails, userDetails } = useContext(AuthContext)
   const { socket } = useContext(SocketContext)
   let links = (
      <>
         <li className="header__list--item">
            <NavLink className="header__list--links" exact to="/">Home</NavLink>
         </li>
         <li className="header__list--item">
            <NavLink className="header__list--links" exact to="/login">Login</NavLink>
         </li>
         <li className="header__list--item">
            <NavLink className="header__list--links" exact to="/register">Register</NavLink>
         </li>
      </>
   )

   if (isAuth) {
      links = (
         <>
            <li className="header__list--item">
               <NavLink className="header__list--links" exact to="/">Home</NavLink>
            </li>
            <li className="header__list--item">
               <NavLink className="header__list--links" exact to="/profile">Profile</NavLink>
            </li>
            <li className="header__list--item">
               <NavLink className="header__list--links" exact to="/msg-board">Message board</NavLink>
            </li>
            <button onClick={e => {
               if (userDetails.username) {
                  socket.emit('logout', userDetails.username)
               }
               setUserDetails({})
               setIsAuth(false)
               localStorage.removeItem('token')
               client.resetStore()
               router.history.push('/')
            }} className="header__list--item"> Logout </button>
         </>
      )
   }
   return (
      <header className="header">
         {!authLoading && <>
            <div className="header__info">
               <Link to="/"><i className="fab fa-centos"></i></Link>
               <h2>Bestest site ever</h2>
            </div>
            <nav className="header__nav">
               <ul className="header__list">
                  {links}
               </ul>
            </nav>
         </>
         }
      </header>
   )
}

export default withRouter(Header)