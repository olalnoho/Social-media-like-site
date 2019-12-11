import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import createProfile from '../../queries/createProfile'
import getProfile from '../../queries/getProfile'
import { Redirect } from 'react-router-dom'
const ProfileCreation = () => {
   
   const [formData, setFormData] = useState({
      location: '',
      avatar: '',
      bio: '',
   })

   const [createMutation, { data, error }] = useMutation(createProfile)

   const onSubmit = e => {
      const obj = {}
      if (formData.location) {
         obj.location = formData.location
      }

      if (formData.avatar) {
         obj.avatar = formData.avatar
      }

      if (formData.bio) {
         obj.bio = formData.bio
      }

      e.preventDefault()
      createMutation({
         variables: obj, refetchQueries: () => {
            return [{ query: getProfile }]
         }, awaitRefetchQueries: true
      })
   }

   if (data) {
      return <Redirect to="/profile" />
   }

   return (
      <div className="container flex">
         {error && <p className="alert"> Something went wrong.. try again </p>}
         <div className="profilecreation">
            <div className="profilecreation__heading">
               <h2 className="heading-2">Looks like you don't have a profile yet.</h2>
               <p className="lead">
                  Fill out the form below to set one up!
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
                  placeholder="URL to avatar you'd like to use"
                  onChange={e => setFormData({ ...formData, avatar: e.target.value })}
               />
               <textarea
                  value={formData.bio}
                  rows="20"
                  placeholder="A little about you..."
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
               />
               <input type="submit" className="btn btn--thirdary" value="Submit" />
            </form>
         </div>
      </div>
   )
}

export default ProfileCreation
