const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.url,
  max: 20,
  idleTimeoutMillis: 300000000,
  connectionTimeoutMillis: 90000000,

  ssl: { rejectUnauthorized: false }
});
pool.connect().then(() => console.log('Conex..DB'))


module.exports = { pool };