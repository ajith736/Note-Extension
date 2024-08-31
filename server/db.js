const Pool = require("pg").Pool;

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

module.exports = pool;