const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.url,
   max: 20,
  //acquireTimeoutMillis: 0,
  //createTimeoutMillis: 0,
 
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,

  ssl: { rejectUnauthorized: false }
});
pool.connect().then(() => console.log('Conex..DB'))


module.exports = { pool };