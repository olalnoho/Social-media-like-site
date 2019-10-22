// Third party libs
const { ApolloServer } = require('apollo-server-express')
const express = require('express')

// Database and GraphQL stuff
const db = require('./db/db')
const typeDefs = require('./typeDefs/index')
const resolvers = require('./resolvers/root')

// Socket stuff
const app = express()
const http = app.listen(4000)
const io = require('socket.io')(http)

const server = new ApolloServer({
   playground: true,
   typeDefs,
   resolvers,
   context: req => ({ req, db, io })
})

const onlineUsers = {}

io.on('connection', socket => {
   io.emit('updateOnlineData', onlineUsers)
   
   socket.on('auth', data => {
      onlineUsers[data.username] = true
      socket.join(data.username)
      io.emit('updateOnlineData', onlineUsers)
   })

   socket.on('logout', data => {
      delete onlineUsers[data]
      io.emit('updateOnlineData', onlineUsers)
   })

   socket.on('getOnlineData', () => {
      io.emit('updateOnlineData', onlineUsers)
   })
})


server.applyMiddleware({ app })