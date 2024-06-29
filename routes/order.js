//Hadeel and Rabeaa
const path = require("path");

const express = require("express");

const db = require("../dbcon"); // dbcon is a module for database connection

const router = express.Router();

// Route to fetch all orders
router.get("/order", (req, res) => {
  const q = "SELECT * FROM`order`";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
// Route to create a new orders
router.post("/createOrder", (req, res) => {
  let { orderNumber, type, count } = req.body;

  db.query(
    "INSERT INTO `order`(`orderNumber`, `type`, `count`) VALUES (?,?,?)",
    [orderNumber, type, count],
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
router.delete("/order/:orderNumber", (req, res) => {
  const sql = "DELETE FROM `order` WHERE orderNumber = ?";
  const type = req.params.orderNumber;
  db.query(sql, [type], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

// Route to update an order by orderNumber
router.put("/updateOrder/:orderNumber", (req, res) => {
  const sql = "UPDATE `order` SET `type`=?,`count`=? WHERE orderNumber = ?";
  const values = [req.body.type, req.body.count];
  const type = req.params.orderNumber;
  db.query(sql, [...values, type], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data); // Return result of the update operation
  });
});

module.exports = router;
