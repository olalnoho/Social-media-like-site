const { ApolloServer } = require('apollo-server')
const db = require('./db/db')
const typeDefs = require('./typeDefs/index')
const resolvers = require('./resolvers/root')
const server = new ApolloServer({
   playground: true,
   typeDefs,
   resolvers,
   context: req => ({
      req,
      db,
   })
})

server.listen(4000)