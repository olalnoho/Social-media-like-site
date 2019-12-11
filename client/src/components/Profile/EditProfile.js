import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useMutation } from '@apollo/react-hooks'
import mutation from '../../queries/updateProfile'
import getProfile from '../../queries/getProfile'
import { Redirect } from 'react-router-dom'

const EditProfile = ({ location, authLoading }) => {
   const { isAuth } = useContext(AuthContext)
   const [udpateProfile, { data, error }] = useMutation(mutation)

   const [formData, setFormData] = useState({
      location: location.state ? location.state.data.getProfile.location : '',
      bio: location.state ? location.state.data.getProfile.bio : '',
      avatar: location.state ? location.state.data.getProfile.avatar : '',
   })

   const onSubmit = e => {
      e.preventDefault()

      udpateProfile({
         variables: formData, refetchQueries: () => {
            return [{ query: getProfile }]
         }, awaitRefetchQueries: true
      })
   }

   if (data) {
      return <Redirect to='/profile' />
   }

   // If you did not come from the button-redirect on /profile, go back to homepage
   if (!location.state) {
      return <Redirect to="/" />
   }

   if (!isAuth && !authLoading) {
      return <Redirect to="/" />
   }

   return (
      <div className="container flex">
         <div className="profilecreation">
            {error && <p className="alert"> Something went wrong.. try again </p>}
            <div className="profilecreation__heading">
               <h2 className="heading-2">Edit Profile</h2>
               <p className="lead">
                  Update the form below to make changes to your profile
               </p>
            </div>
            <form className="form" onSubmit={onSubmit}>
               <input
                  value={formData.location}
                  type="text"
                  placeholder="Location"
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
               />
               <input
                  value={formData.avatar}
                  type="text"
                  placeholder="URL to avatar you'd like to use."
                  onChange={e => setFormData({ ...formData, avatar: e.target.value })}
               />
               <textarea
                  value={formData.bio}
                  rows="20"
                  placeholder="A little about you..."
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
               />
               <input type="submit" value="Submit" className="btn btn--thirdary" />
            </form>
         </div>
      </div>
   )
}

export default EditProfile
