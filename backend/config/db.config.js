import mysql from 'mysql2/promise.js'; // Use promise-based API
import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
  connectionLimit: 10,
  //socketPath: process.env.DB_SOCKET_PATH, // Adjust as necessary
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

// Create connection pool
const pool = mysql.createPool(dbConfig);
//console.log("DB Config:", dbConfig);
// Prepare query function
async function query(sql, params) {
  const [rows] = await pool.execute(sql, params); // `rows` will be the first element in the array
  return rows; // Return just the rows part
}

export default { query }; // Ensure you're exporting the query function properly