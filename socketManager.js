module.exports = function (io) {

   const onlineUsers = {}

   io.on('connection', socket => {
      let socketname;
      io.emit('updateOnlineData', onlineUsers)

      socket.on('auth', data => {
         onlineUsers[data.username] = true
         socket.join(data.username)
         io.emit('updateOnlineData', onlineUsers)
      })

      socket.on('joinOwnRoom', username => {
         console.log('ran')
         // @note
         // you should always be in your own room
         // for notifying when new post on profile
         // or if you get a PM
         socket.join(username)

         // @note
         // notifications get its own room
         // because other users might be in
         // username room, for profile post updates
         socket.join(username + 'notifications')
      })

      socket.on('joinProfileRoom', profileRoom => {
         socket.join(profileRoom)
      })

      socket.on('leaveProfileRoom', profileRoom => {
         socket.leave(profileRoom)
      })

      socket.on('newPost', username => {
         io.in(username).emit('updateProfilePosts')
      })

      socket.on('newPms', username => {
         io.in(username).emit('updatePms')
      })

      socket.on('sendPMNotification', username => {
         io.in(username + 'notifications').emit('PMNotification')
      })

      socket.on('sendProfileNotification', username => {
         io.in(username + 'notifications').emit('profileNotification')
      })

      socket.on('logout', data => {
         delete onlineUsers[data]
         io.emit('updateOnlineData', onlineUsers)
      })

      socket.on('getOnlineData', () => {
         io.emit('updateOnlineData', onlineUsers)
      })
   })
}