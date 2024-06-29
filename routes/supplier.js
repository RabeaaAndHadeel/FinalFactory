const express = require("express");
const db = require("../dbcon"); // dbcon is a module for database connection
const router = express.Router();

// Middleware to parse JSON bodies
router.use(express.json());

// Route to fetch all suppliers
router.get("/supplier", (req, res) => {
  const q = "SELECT * FROM `suppliers`";
  db.query(q, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database query error" });
    }
    return res.json(data);
  });
});

// Route to create a new supplier
router.post("/createSupplier", (req, res) => {
  const { name, id, address, contact, mail, phone } = req.body;

  const sql =
    "INSERT INTO `suppliers` (name, id, address, contact, mail, phone) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [name, id, address, contact, mail, phone], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to create supplier" });
    }
    return res.json({ message: "Supplier added successfully!" });
  });
});

// Route to delete a profile by id
router.delete("/supplier/:id", (req, res) => {
  const sql = "DELETE FROM `suppliers` WHERE id = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to delete supplier" });
    }
    if (data.affectedRows === 0) {
      return res.status(404).json({ error: "Supplier not found" });
    }
    return res.json({ message: "Supplier deleted successfully" });
  });
});

// Route to update a profile by id
router.put("/updateSupplier/:id", (req, res) => {
  const sql =
    "UPDATE `suppliers` SET name = ?, address = ?, contact = ?, mail = ?, phone = ? WHERE id = ?";
  const { name, address, contact, mail, phone } = req.body;
  const id = req.params.id;

  db.query(sql, [name, address, contact, mail, phone, id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to update supplier" });
    }
    if (data.affectedRows === 0) {
      return res.status(404).json({ error: "Supplier not found" });
    }
    return res.json({ message: "Supplier updated successfully" });
  });
});

module.exports = router;
