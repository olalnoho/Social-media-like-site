// Third party libs
const { ApolloServer } = require('apollo-server-express')
const express = require('express')


// Database and GraphQL stuff
const db = require('./db/db')
const typeDefs = require('./typeDefs/index')
const resolvers = require('./resolvers/root')

// Socket stuff
const socketManager = require('./socketManager')
const app = express()
const http = app.listen(4000)
const io = require('socket.io')(http)

const server = new ApolloServer({
   playground: true,
   typeDefs,
   resolvers,
   context: req => ({ req, db, io })
})

socketManager(io)

server.applyMiddleware({ app })