const path = require("path");

const express = require("express");

const db = require("../dbcon");

const router = express.Router();

router.post("/signup", (req, res) => {
  // SQL query to insert user data into the 'users' table
  const sql = "INSERT INTO users (`id`,`name`,`password`) VALUES(?)";
  const values = [req.body.id, req.body.name, req.body.password];

  // Executing the SQL query with the provided values
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    // Returning the inserted data
    return res.json(data);
  });
});

// Endpoint for user login
router.post("/login", (req, res) => {
  console.log(req.body);
  // SQL query to retrieve user data based on provided ID and password
  const sql = "SELECT * FROM users WHERE `id`=? AND  `password`=?";
  db.query(sql, [req.body.id, req.body.password], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    // Checking if any matching user data is found
    if (data.length > 0) {
      return res.json("success"); // Returning success if user is found
    } else {
      return res.json("Wrong ID or Password"); // Returning error message if no matching user is found
    }
  });
});

module.exports = router;
