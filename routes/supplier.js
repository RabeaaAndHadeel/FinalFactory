const express = require("express");
const db = require("../dbcon"); // dbcon is a module for database connection
const router = express.Router();


// Route to fetch all suppliers
router.get("/suppliers", (req, res) => {
  // Changed route to /suppliers
  const q = "SELECT * FROM `suppliers`";
  db.query(q, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database query error" });
    }
    return res.json(data);
  });
});

// Route to fetch a single supplier by ID
router.get("/supplier/:id", (req, res) => {
  // Changed route to /suppliers/:id
  const id = req.params.id;
  console.log(`Fetching supplier with ID: ${id}`);

  const q = "SELECT * FROM `suppliers` WHERE id = ?";
  db.query(q, [id], (err, data) => {
    if (err) {
      console.error(`Database error: ${err.message}`);
      return res.status(500).json({ error: "Database error" });
    }
    if (data.length === 0) {
      console.log(`Supplier with ID ${id} not found`);
      return res.status(404).json({ error: "Supplier not found" });
    }
    console.log(`Supplier found: ${JSON.stringify(data[0])}`);
    return res.status(200).json(data[0]);
  });
});

// Route to create a new supplier
router.post("/createSupplier", (req, res) => {
  // Changed route to /suppliers
  const { name, id, address, contact, email, phoneNumber } = req.body;

  const sql =
    "INSERT INTO `suppliers` (name, id, address, contact, email, phoneNumber) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [name, id, address, contact, email, phoneNumber],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to create supplier" });
      }
      return res.json({ message: "Supplier added successfully!" });
    }
  );
});


// Route to update a supplier by id
router.put("/supplier/:id", (req, res) => {
  // Changed route to /suppliers/:id
  const sql =
    `UPDATE suppliers SET name = ?, address = ?, contact = ?, email = ?, phoneNumber = ? WHERE id = ?`;
  const { name, address, contact, email, phoneNumber } = req.body;
  const id = req.params.id;

  db.query(
    sql,
    [name, address, contact, email, phoneNumber, id],
    (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to update supplier" });
      }
      if (data.affectedRows === 0) {
        return res.status(404).json({ error: "Supplier not found" });
      }
      return res.json({ message: "Supplier updated successfully" });
    }
  );
});

module.exports = router;
