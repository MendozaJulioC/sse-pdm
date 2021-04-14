const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.url,
   max: 20,
  //acquireTimeoutMillis: 0,
  //createTimeoutMillis: 0,
 
  idleTimeoutMillis: 300000,
  connectionTimeoutMillis: 20000,

  ssl: { rejectUnauthorized: false }
});
pool.connect().then(() => console.log('Conex..DB'))


module.exports = { pool };