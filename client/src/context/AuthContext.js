import React, { useState } from 'react'

export const AuthContext = React.createContext({
   isAuth: false,
   setIsAuth: () => { },
   userDetails: {
      username: '',
      email: ''
   },
   setUserDetails: () => { },
   profileData: {},
   setProfileData: () => { }
})

export default props => {
   const [isAuth, setIsAuth] = useState(false)
   const [userDetails, setUserDetails] = useState({
      username: '',
      email: ''
   })

   const [profileData, setProfileData] = useState({})

   return <AuthContext.Provider value={{ isAuth, setIsAuth, userDetails, setUserDetails, setProfileData, profileData }}>
      {props.children}
   </AuthContext.Provider>
}