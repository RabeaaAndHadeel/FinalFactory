const mysql = require("mysql");

// Establishing a connection to the MySQL database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "aluminumfactory",
});
module.exports = db;
