//Hadeel and Rabeaa
const path = require("path");

const express = require("express");

const db = require("../dbcon"); // dbcon is a module for database connection

const router = express.Router();

// Route to fetch all profiles
router.get("/foam", (req, res) => {
  const q = "SELECT * FROM foam";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
// Route to create a new foam
router.post("/createFoam", (req, res) => {
  let { foamId, foamType } = req.body;

  db.query(
    "INSERT INTO foam (foamId, foamType) VALUES (?,?)",
    [foamId, foamType],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json("You have added successfully!");
      }
    }
  );
});

// Route to delete a foam by id
router.delete("/foam/:foamId", (req, res) => {
  const sql = "DELETE FROM foam WHERE foamId = ?";
  const type = req.params.foamId;
  db.query(sql, [type], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

// Route to update a foam by id
router.put("/updateFoam/:foamId", (req, res) => {
  const sql = "UPDATE foam SET foamType = ? WHERE foamId = ?";
  const values = [req.body.foamType];
  const type = req.params.foamId;
  db.query(sql, [...values, type], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data); // Return result of the update operation
  });
});

module.exports = router;
