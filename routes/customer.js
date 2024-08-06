// //Hadeel and Rabeaa

// const express = require("express");

// const db = require("../dbcon"); // dbcon is a module for database connection

// const router = express.Router();

// // Route to fetch all customers
// router.get("/customer", (req, res) => {
//   const q = "SELECT * FROM`customers`";
//   db.query(q, (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.json(err);
//     }
//     return res.json(data);
//   });
// });
// // Route to create a new customers
// router.post("/createCustomer", (req, res) => {
//   let { id, name, family, phoneNumber, email, address } = req.body;
//   const q = `
//       INSERT INTO profile (id, name, family, phoneNumber, email, address) 
//       VALUES (?, ?, ?, ?,?,?)
//       ON DUPLICATE KEY UPDATE 
//         name =VALUES(name), 
//         family = VALUES(family),
//         phoneNumber = VALUES(phoneNumber),
//         email = VALUES(email),
//         address = VALUES(address),
//     `;
//   db.query(q,
//     [id, name, family, phoneNumber, email, address],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.json("You have added successfully!");
//       }
//     }
//   );
// });


// // Route to update a customer by id
// router.put("/customer/:id", (req, res) => {
//   const sql =
//     "UPDATE `customers` SET `name`=?,`family`=?,`phoneNumber`=?,`email`=?,`address`=? WHERE id = ?";
//   const values = [
//     req.body.name,
//     req.body.family,
//     req.body.phoneNumber,
//     req.body.email,
//     req.body.address,
//   ];
//   const type = req.params.id;
//   db.query(sql, [...values, type], (err, data) => {
//     if (err) return res.json("Error");
//     return res.json(data); // Return result of the update operation
//   });
// });

// module.exports = router;
const express = require("express");
const db = require("../dbcon"); // dbcon is a module for database connection
const router = express.Router();

// Route to fetch all customers
router.get("/customer", (req, res) => {
  const q = "SELECT * FROM `customers`";
  db.query(q, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    return res.status(200).json(data);
  });
});

// Route to create a new customer
router.post("/createCustomer", (req, res) => {
  const { id, name, family, phoneNumber, email, address } = req.body;

  if (!id || !name || !family || !phoneNumber || !email || !address) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const q = `
      INSERT INTO customers (id, name, family, phoneNumber, email, address) 
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        name = VALUES(name), 
        family = VALUES(family),
        phoneNumber = VALUES(phoneNumber),
        email = VALUES(email),
        address = VALUES(address)
    `;

  db.query(q, [id, name, family, phoneNumber, email, address], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    return res.status(201).json({ message: "Customer added successfully!" });
  });
});

// Route to update a customer by id
router.put("/customer/:id", (req, res) => {
  const { name, family, phoneNumber, email, address } = req.body;
  const id = req.params.id;

  if (!name || !family || !phoneNumber || !email || !address) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = `
    UPDATE customers SET 
      name = ?, 
      family = ?, 
      phoneNumber = ?, 
      email = ?, 
      address = ? 
    WHERE id = ?
  `;

  db.query(sql, [name, family, phoneNumber, email, address, id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    if (data.affectedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    return res.status(200).json({ message: "Customer updated successfully!" });
  });
});

module.exports = router;
