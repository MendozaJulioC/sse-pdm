const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.url,
  max: 20,
  idleTimeoutMillis: 300000000,
  connectionTimeoutMillis: 90000000,

  ssl: { rejectUnauthorized: false }
});
pool.connect().then(() => console.log('Conex heroku 1..DB'))


const pool2 = new Pool ({

  connectionString: process.env.url2,
  max: 20,
  idleTimeoutMillis: 300000000,
  connectionTimeoutMillis: 90000000,

  ssl: { rejectUnauthorized: false }
})
pool.connect().then(() => console.log('Conex heroku2..DB'))



const pool3 = new Pool ({

  user: 'subpiee',
  host: 'dbsubpiee-aws.cxzcrpauh1po.us-east-2.rds.amazonaws.com',
  database: 'dbsubpiee',
  password: process.env.PASS,
  port: 5432,
  max: 20,
  idleTimeoutMillis: 300000000,
  connectionTimeoutMillis: 100000000,
  ssl: { rejectUnauthorized: false }
})
pool3.connect().then(() => console.log('Conex ws..DB'))


module.exports = { pool, pool2, pool3 };