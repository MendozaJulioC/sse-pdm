const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.url,
  max: 200,
  acquireTimeoutMillis: 600000,
  createTimeoutMillis: 30000,

  idleTimeoutMillis: 600000000,
 // connectionTimeoutMillis: 100000000,
  ssl: { rejectUnauthorized: false }
});
pool.connect().then(() => console.log('Conex..DB'))


module.exports = { pool };