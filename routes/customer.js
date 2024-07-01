//Hadeel and Rabeaa

const express = require("express");

const db = require("../dbcon"); // dbcon is a module for database connection

const router = express.Router();

// Route to fetch all customers
router.get("/customer", (req, res) => {
  const q = "SELECT * FROM`customers`";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
// Route to create a new customers
router.post("/createCustomer", (req, res) => {
  let { id, name, family, phoneNumber, email, address } = req.body;

  db.query(
    "INSERT INTO `customers`(`id`, `name`, `family`,`phoneNumber`,`email`,`address`) VALUES (?,?,?,?,?,?)",
    [id, name, family, phoneNumber, email, address],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json("You have added successfully!");
      }
    }
  );
});


// Route to update a customer by id
router.put("/customer/:id", (req, res) => {
  const sql =
    "UPDATE `customers` SET `name`=?,`family`=?,`phoneNumber`=?,`email`=?,`address`=? WHERE id = ?";
  const values = [
    req.body.name,
    req.body.family,
    req.body.phoneNumber,
    req.body.email,
    req.body.address,
  ];
  const type = req.params.id;
  db.query(sql, [...values, type], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data); // Return result of the update operation
  });
});

module.exports = router;
