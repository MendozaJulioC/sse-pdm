const { Pool } = require('pg');


const isProduccion = process.env.NODE_ENV=== "production";

const pool = new Pool({
  connectionString: process.env.url,
   max: 1000,
  idleTimeoutMillis: 40000000,
  connectionTimeoutMillis: 6000000,

  ssl: { rejectUnauthorized: false }
});
pool.connect().then(() => console.log('Conex..DB'))


module.exports = { pool };