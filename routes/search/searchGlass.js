//Hadeel and Rabeaa
const path = require("path");
const cors = require("cors");
const express = require("express");

const db = require("../../dbcon"); // dbcon is a module for database connection

const router = express.Router();
router.post("/glass", (req, res) => {
  const { searchTerm } = req.body;
  const query = "SELECT * FROM glass WHERE glassType LIKE ?";
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
