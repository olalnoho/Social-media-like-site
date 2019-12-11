import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
const Landing = ({ authLoading }) => {
   const { isAuth, userDetails } = useContext(AuthContext)
   let links = (
      <>
         <Link to="/login" className="btn btn--secondary">Login</Link>
         <Link to="/register" className="btn btn--primary">Register</Link>
      </>
   )

   if (isAuth) {
      links = (
         <>
            <Link to="/profile" className="btn btn--secondary">Profile</Link>
            <Link to="/msg-board" className="btn btn--primary">Message Board</Link>
         </>
      )
   }

   let text = (
      <>
         <h1 className="heading-1">Join us</h1>
         <p className="lead">
            Connect with old friends; or find new ones!
         </p>
      </>
   )

   if (isAuth) {
      text = (
         <>
            <h1 className="heading-1">Welcome, {userDetails.username ? userDetails.username : userDetails.email}</h1>
            <p className="lead">
               Go check out your profile area or the message board.
            </p>
         </>
      )
   }

   return (
      <div className="landing">
         {!authLoading &&
            <>
               <div className="landing__left">
                  {text}
               </div>
               <div className="landing__right">
                  <div className="landing__buttongroup">
                     {links}
                  </div>
               </div>
            </>
         }
      </div>
   )
}

export default Landing
