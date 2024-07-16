const express = require("express");
const db = require("../dbcon"); // dbcon is a module for database connection

const router = express.Router();

// Route to fetch all orders
router.get("/order", (req, res) => {
  const q = "SELECT * FROM `orders`";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

// Route to create a new order
router.post("/createOrder", (req, res) => {
  const { orderNumber, profileType, count, customersId, supplierId } = req.body;
  const status = 1; // Setting default status as 1 (active)
  const q =
    "INSERT INTO `orders` (`orderNumber`, `profileType`, `count`, `customersId`, `supplierId`, `status`) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    q,
    [orderNumber, profileType, count, customersId, supplierId, status],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      res.json("Order added successfully!");
    }
  );
});

// Route to delete an order by orderNumber
router.delete("/order/:orderNumber", (req, res) => {
  const sql = "DELETE FROM `orders` WHERE `orderNumber` = ?";
  const orderNumber = req.params.orderNumber;
  db.query(sql, [orderNumber], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

// Route to update an order by orderNumber
router.put("/order/:orderNumber", (req, res) => {
  const sql = "UPDATE `orders` SET `status`=? WHERE `orderNumber` = ?";
  const { status } = req.body;
  const orderNumber = req.params.orderNumber;
  db.query(sql, [status, orderNumber], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

module.exports = router;
