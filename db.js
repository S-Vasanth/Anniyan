const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

function getConnection() {
  const connect = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
  });
  return connect;
}

module.exports.getConnection = getConnection;
