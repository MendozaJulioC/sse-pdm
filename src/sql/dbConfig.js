const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.url,
  max: 20,
  idleTimeoutMillis: 400000000,
  connectionTimeoutMillis: 100000000,

  ssl: { rejectUnauthorized: false }
});
pool.connect().then(() => console.log('Conex..DB'))


module.exports = { pool };