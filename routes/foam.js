const express = require("express");
const db = require("../dbcon"); // dbcon is a module for database connection
const router = express.Router();

// Route to fetch all foams
router.get("/foam", (req, res) => {
  const query = "SELECT * FROM foam";
  db.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(data);
  });
});

// Route to create a new foam
router.post("/createFoam", (req, res) => {
  const { foamId, foamType } = req.body;
  const status = 1;
  const query = `
    INSERT INTO foam (foamId, foamType, status) 
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE 
      foamType = VALUES(foamType), 
      status = VALUES(status)
  `;

  db.query(query, [foamId, foamType, status], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(201).json({
      message: "Foam added or updated successfully!",
      data: { foamId, foamType, status },
    });
  });
});

// Route to delete a foam by id
router.delete("/foam/:foamId", (req, res) => {
  const { foamId } = req.params;

  const query = "DELETE FROM foam WHERE foamId = ?";
  db.query(query, [foamId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json({ message: "Foam deleted successfully!" });
  });
});

// Route to update a foam by id
router.put("/updateFoam/:foamId", (req, res) => {
  const { foamId } = req.params;
  const { foamType, status } = req.body;

  if (!foamType) {
    return res.status(400).json({ error: "Missing foamType" });
  }

  const query = "UPDATE foam SET foamType = ?, status = ? WHERE foamId = ?";
  db.query(query, [foamType, status, foamId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json({ message: "Foam updated successfully!" });
  });
});

module.exports = router;
