const { Pool } = require('pg');


const isProduccion = process.env.NODE_ENV=== "production";

const pool = new Pool({
  connectionString: process.env.url,
   max: 20,
 
   idleTimeoutMillis: 30005,
    connectionTimeoutMillis: 90000,
 
  ssl: { rejectUnauthorized: false }
});
pool.connect().then(() => console.log('Conex..DB'))


module.exports = { pool };