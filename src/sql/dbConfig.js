const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.url,
  host: dbSocketAddr[0], // e.g. '127.0.0.1'
  port: dbSocketAddr[1], // e.g. '5432'
  max: 20,
  //acquireTimeoutMillis: 0,
 // createTimeoutMillis: 0,
 
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,

  ssl: { rejectUnauthorized: false }
});
pool.connect().then(() => console.log('Conex..DB'))


module.exports = { pool };