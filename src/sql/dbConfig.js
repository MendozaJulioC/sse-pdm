const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.url,
  max: 20,
  idleTimeoutMillis: 400000000000,
  connectionTimeoutMillis: 60000000,

  ssl: { rejectUnauthorized: true }
});
pool.connect().then(() => console.log('Conex..DB'))


module.exports = { pool };