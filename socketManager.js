module.exports = function (io) {

   const onlineUsers = {}
   
   io.on('connection', socket => {
      io.emit('updateOnlineData', onlineUsers)

      socket.on('auth', data => {
         onlineUsers[data.username] = true
         socket.join(data.username)
         io.emit('updateOnlineData', onlineUsers)
      })

      socket.on('joinProfileRoom', profileRoom => {
         socket.join(profileRoom, () => {
            console.log(socket.rooms)
         })
      })

      socket.on('leaveProfileRoom', profileRoom => {
         socket.leave(profileRoom)
      })

      socket.on('newPost', username => {
         io.in(username).emit('updateProfilePosts')
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