// 3rd party
import React, { useEffect, useContext, useState } from 'react';
import { Route, Switch } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

// Context
import { AuthContext } from './context/AuthContext'

// Components
import Landing from './components/Landing/Landing'
import Header from './components/UI/Header/Header'
import Login from './components/Auth/Login/Login'
import Register from './components/Auth/Register/Register'
import Profile from './components/Profile/Profile';

// Maybe move creation to different page?
// import ProfileCreation from './components/Profile/ProfileCreation';

// Queries
import getUser from './queries/me'
import EditProfile from './components/Profile/EditProfile';
import MessageBoard from './components/MessageBoard/MessageBoard';
import OtherProfile from './components/Profile/OtherProfile';

const App = () => {

  const { setIsAuth, setUserDetails } = useContext(AuthContext)
  const { data, loading, refetch } = useQuery(getUser)

  // InitLoad:
  // For protected routes
  // If I use the loading from useQuery
  // private components redirects at refresh
  // It needs to start as true.

  // @todo: Maybe research better ways later.

  const [initLoad, setInitLoad] = useState(true)

  useEffect(() => {
    // Authentication
    if (!localStorage.getItem('token')) {
      setIsAuth(false)
      setInitLoad(false)
      return
    }

    if (data && data.me) {
      setIsAuth(true)
      setInitLoad(false)
      setUserDetails(data.me)
    }
  }, [loading, data, setUserDetails, setIsAuth])

  return (
    <>
      <Header authLoading={initLoad} />
      <Switch>
        <Route path="/" exact component={props => <Landing {...props} authLoading={initLoad} />} />
        <Route path="/login" exact component={props => <Login {...props} refetch={refetch} />} />
        <Route path="/register" exact component={props => <Register {...props} refetch={refetch} />} />
        <Route path="/profile" component={props => <Profile {...props} authLoading={initLoad} />} />
        <Route path="/profiles/:id" component={OtherProfile} />
        <Route path="/edit-profile" component={props => <EditProfile {...props} authLoading={initLoad} />} />
        <Route path="/msg-board" component={MessageBoard} />
        {/* <Route path="/profile-creation" component={ProfileCreation} /> */}
      </Switch>
    </>
  )
}

export default App;
