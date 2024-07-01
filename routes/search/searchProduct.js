//Hadeel and Rabeaa
const path = require("path");
const cors = require("cors");
const express = require("express");

const db = require("../../dbcon"); // dbcon is a module for database connection

const router = express.Router();
router.post("/product", (req, res) => {
  const { searchTerm } = req.body;
  const query = "SELECT * FROM product WHERE customersId LIKE ?";
  db.query(query, [`%${searchTerm}%`], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});
module.exports = router;
