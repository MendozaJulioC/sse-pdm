const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.url,
  ssl: {
    rejectUnauthorized: false
  }
});
pool.connect().then(() => console.log('Conex..DB'))


module.exports = { pool };