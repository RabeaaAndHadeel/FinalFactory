//Hadeel and Rabeaa
const express = require("express");

const db = require("../dbcon"); // dbcon is a module for database connection

const router = express.Router();

// Route to fetch all orders
router.get("/order", (req, res) => {
  const q = "SELECT * FROM`orders`";
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
    "INSERT INTO `orders`(`count`, `profileType`, `customersId`, `orderNumber` ) VALUES (?,?,?,?)",
    [orderNumber, customersId, profileType, count],
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
  const sql = "DELETE FROM `orders` WHERE orderNumber = ?";
  const type = req.params.orderNumber;
  db.query(sql, [type], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

// Route to update an order by orderNumber
router.put("/updateOrder/:orderNumber", (req, res) => {
  const sql = "UPDATE `orders` SET `type`=?,`count`=? WHERE orderNumber = ?";
  const values = [req.body.type, req.body.count];
  const type = req.params.orderNumber;
  db.query(sql, [...values, type], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data); // Return result of the update operation
  });
});
// Define an API endpoint to fetch data from order and order_material tables
router.get("/order", (req, res) => {
  const query = `
    SELECT orderNumber  , count
FROM "order" 

  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
      return;
    }
    res.json(results);
  });
});

module.exports = router;
