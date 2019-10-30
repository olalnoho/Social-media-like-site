// 3rd party
import React, { useEffect, useContext, useState } from 'react';
import { Route, Switch } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

// Context
import { AuthContext } from './context/AuthContext'
import { SocketContext } from './context/SocketContext'

// Components
import Landing from './components/Landing/Landing'
import Header from './components/UI/Header/Header'
import Login from './components/Auth/Login/Login'
import Register from './components/Auth/Register/Register'
import Profile from './components/Profile/Profile';

// Queries
import getUser from './queries/me'
import EditProfile from './components/Profile/EditProfile';
import MessageBoard from './components/MessageBoard/MessageBoard';
import OtherProfile from './components/Profile/OtherProfile';
import PrivateMessages from './components/PrivateMessages/PrivateMessages';

// @note
// remeber to change the preload
// in the html file before deploying

const App = () => {

  const { setIsAuth, setUserDetails } = useContext(AuthContext)
  const { socket } = useContext(SocketContext)
  const { data, loading, refetch } = useQuery(getUser)
  const [initLoad, setInitLoad] = useState(true)

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setIsAuth(false)
      setInitLoad(false)
      return
    }

    if (data && data.me) {
      setIsAuth(true)
      setInitLoad(false)
      setUserDetails(data.me)
      socket.emit('joinOwnRoom', data.me.username)
    }
  }, [loading, data, setUserDetails, setIsAuth, socket])

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
        <Route path="/private-messages" component={PrivateMessages} />
        {/* <Route path="/profile-creation" component={ProfileCreation} /> */}
      </Switch>
    </>
  )
}

export default App;
