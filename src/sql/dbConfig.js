const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.url,
  max: 10000,
  idleTimeoutMillis: 3000000000,
  connectionTimeoutMillis: 1000000000,

  ssl: { rejectUnauthorized: false }
});
pool.connect().then(() => console.log('Conex..DB'))


module.exports = { pool };