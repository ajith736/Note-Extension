const Pool = require("pg").Pool;

require('dotenv').config()

// const pool = new Pool({
//     user:"postgres",
//     password:"Ajith@2003",
//     host:"localhost",
//     port:5432,
//     database:"perntodo"

// });
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
  })

  pool.connect((err) => {
    if (err) throw err
    console.log("Connect to PostgreSQL successfully!")
})

module.exports = pool;