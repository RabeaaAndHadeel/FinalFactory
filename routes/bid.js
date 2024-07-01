//Hadeel and Rabeaa
const express = require("express");

const db = require("../dbcon"); // dbcon is a module for database connection

const router = express.Router();

// Route to fetch all orders
router.get("/bid", (req, res) => {
  const q = "SELECT * FROM`bid`";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
// Route to create a new orders
router.post("/createBid", (req, res) => {
  let { number, 
    customersId, 
    profileType, 
    VAT, 
    total, 
    date } = req.body;

  db.query(
    "INSERT INTO `bid`(`number`, `profileType`, `customersId`, `VAT`, `total`, `date` ) VALUES (?,?,?,?,?,?)",
    [ number, 
    customersId, 
    profileType, 
    VAT, 
    total, 
    date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json("You have added successfully!");
      }
    }
  );
});

// Route to delete a order by orderNumber
router.delete("/bid/:number", (req, res) => {
  const sql = "DELETE FROM `bid` WHERE number = ?";
  const type = req.params.number;
  db.query(sql, [type], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

// Route to update an order by orderNumber
router.put("/updateBid/:number", (req, res) => {
  const sql = "UPDATE `bid` SET `profileType` =?, `customersId`=?, `VAT`=?, `total`=?, `date`=? WHERE number = ?";
  const values = [req.body.profileType, req.body.customersId, req.body.VAT, req.body.total, req.body.date];
  const type = req.params.number;
  db.query(sql, [...values, type], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data); // Return result of the update operation
  });
});

module.exports = router;
