const path = require('path')

const { ApolloServer } = require('apollo-server-express')
const express = require('express')

// Database and GraphQL stuff
const db = require('./db/db')
const typeDefs = require('./typeDefs/index')
const resolvers = require('./resolvers/root')

// Socket stuff
const socketManager = require('./socketManager')
const app = express()
const http = app.listen(
   process.env.PORT || 4000
)
const io = require('socket.io')(http)

const server = new ApolloServer({
   playground: false,
   typeDefs,
   resolvers,
   context: req => ({ req, db, io })
})

socketManager(io)

if (process.env.NODE_ENV === 'production') {
   app.use(express.static('client/build'))
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(
         __dirname, 'client', 'build', 'index.html'
      ))
   })
}

server.applyMiddleware({ app })