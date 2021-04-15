const { Pool } = require('pg');


const isProduccion = process.env.NODE_ENV=== "production";

const pool = new Pool({
  connectionString: process.env.url,
   max: 20,
   reconnectOnDatabaseIsStartingError: true,         // Enable/disable reconnecting on "the database system is starting up" errors
   waitForDatabaseStartupMillis: 0,                  // Milliseconds to wait between retry connection attempts while the database is starting up
   databaseStartupTimeoutMillis: 90000,              // If connection attempts continually return "the database system is starting up", this is the total number of milliseconds to wait until an error is thrown.
   reconnectOnReadOnlyTransactionError: true,        // If the query should be retried when the database throws "cannot execute X in a read-only transaction"
   waitForReconnectReadOnlyTransactionMillis: 0,     // Milliseconds to wait between retry queries while the connection is marked as read-only
   readOnlyTransactionReconnectTimeoutMillis: 90000, // If queries continually return "cannot execute X in a read-only transaction", this is the total number of milliseconds to wait until an error is thrown
   reconnectOnConnectionError: true,                 // If the query should be retried when the database throws "Client has encountered a connection error and is not queryable"
   waitForReconnectConnectionMillis: 0,              // Milliseconds to wait between retry queries after receiving a connection error
   connectionReconnectTimeoutMillis: 90000,

  ssl: { rejectUnauthorized: false }
});
pool.connect().then(() => console.log('Conex..DB'))


module.exports = { pool };