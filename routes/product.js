//Hadeel and Rabeaa
const path = require("path");

const express = require("express");

const db = require("../dbcon"); // dbcon is a module for database connection

const router = express.Router();

// Route to fetch all products
router.get("/product", (req, res) => {
  const q = "SELECT * FROM `product`";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
// Route to create a new product
router.post("/createProduct", (req, res) => {
  let {
    type,
    profileType,
    customersId,
    Remarks,
    width,
    length,
    count,
    price,
    date,
  } = req.body;

  db.query(
    "INSERT INTO `product`(`type`, `profileType`, `customersId`,`Remarks`,`width`,`length`,`count`,`price`,`date`) VALUES (?,?,?,?,?,?,?,?,?)",
    [
      type,
      profileType,
      customersId,
      Remarks,
      width,
      length,
      count,
      price,
      date,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json("You have added successfully!");
      }
    }
  );
});

// Route to delete a product by id
router.delete("/product/:customersId", (req, res) => {
  const sql = "DELETE FROM `product` WHERE customersId = ?";
  const id = req.params.customersId;
  db.query(sql, [id], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

// Route to update a product by id
router.put("/updateProduct/:customersId", (req, res) => {
  const sql =
    "UPDATE `product` SET `type`=?,`profileType`=?,`Remarks`=?,`width`=?,`length`=?,`count`=?,`price`=?,`date`=? WHERE customersId = ?";
  const values = [
    req.body.type,
    req.body.profileType,
    req.body.Remarks,
    req.body.width,
    req.body.length,
    req.body.count,
    req.body.price,
    req.body.date,
  ];
  const id = req.params.customersId;
  db.query(sql, [...values, id], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data); // Return result of the update operation
  });
});

module.exports = router;
