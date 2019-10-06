const knex = require('knex')({
   client: 'pg',
   connection: {
      host: '127.0.0.1',
      user: 'duh',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
   }
});

module.exports = knex