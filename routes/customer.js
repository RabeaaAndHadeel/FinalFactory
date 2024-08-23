
const express = require("express");
const db = require("../dbcon"); // חיבור לבסיס נתונים
const router = express.Router();

// שליפת לקוח לפי ID
router.get("/customer1/:id", (req, res) => {
  const id = req.params.id;
  console.log(`Fetching customer with ID: ${id}`);

  const q = "SELECT * FROM `customers` WHERE id = ?";
  db.query(q, [id], (err, data) => {
    if (err) {
      console.error(`Database error: ${err.message}`);
      return res.status(500).json({ error: "Database error" });
    }
    if (data.length === 0) {
      console.log(`Customer with ID ${id} not found`);
      return res.status(404).json({ error: "Customer not found" });
    }
    console.log(`Customer found: ${JSON.stringify(data[0])}`);
    return res.status(200).json(data[0]);
  });
});

// שליפת כל הלקוחות
router.get("/customers", (req, res) => {
  const q = "SELECT * FROM `customers`";
  db.query(q, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    return res.status(200).json(data);
  });
});

// הוספת לקוח חדש
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

// עדכון פרטי לקוח לפי ID
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
