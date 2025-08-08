require("dotenv").config();  //db.js
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

console.log("Connecting to database with URL: ", process.env.DB_URL);

pool.connect()
  .then(client => {
    return client.query('SELECT NOW()')
      .then(res => {
        console.log('Connected to the database successfully:', res.rows[0]);
        client.release();
      })
      .catch(err => {
        console.error('Error executing query', err.stack);
      });
  })
  .catch(err => {
    console.error('Error connecting to the database', err.stack);
  });

module.exports = { pool };
