const { Pool } = require('pg');


const isProduccion = process.env.NODE_ENV=== "production";

const pool = new Pool({
  connectionString: process.env.url,
   max: 1000,
   idleTimeoutMillis: 10000, // Time to keep a connection idle. Default is 10s
  waitForAvailableConnectionTimeoutMillis: 90000, // Time to wait to obtain a connection from the pool. Default is 90s
  connectionTimeoutMillis: 30000, // Max time to connect to postgres. Default is 30s

  ssl: { rejectUnauthorized: false }
});
pool.connect().then(() => console.log('Conex..DB'))


module.exports = { pool };