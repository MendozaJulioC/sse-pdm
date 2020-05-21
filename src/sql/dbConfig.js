const { Pool } = require('pg');

const isProduccion = process.env.NODE_ENV=== "production";

const pool = new Pool({
   host     :   process.env.host,
   user     :   process.env.user,
   password :   process.env.password,
   database :   process.env.database,
   port     :   process.env.portdb,
   max: 1000,
   idleTimeoutMillis: 300000000,
   connectionTimeoutMillis: 100000000,

});

pool.connect().then(() => console.log('Conex..DB'))


module.exports = { pool };