const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.url,
  max: 1000,
  idleTimeoutMillis: 300000000,
  connectionTimeoutMillis: 100000000,

  ssl: {
    rejectUnauthorized: false
  }
});
pool.connect().then(() => console.log('Conex..DB'))


module.exports = { pool };