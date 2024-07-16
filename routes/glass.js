const express = require("express");
const cors = require("cors");
const db = require("../dbcon"); // Assuming dbcon is a module for database connection

const router = express.Router();

// Route to get all glass info
router.get("/glass", (req, res) => {
  const q = "SELECT * FROM `glass`";
  db.query(q, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(data);
  });
});

// Route to create a new glass item
router.post("/create", (req, res) => {
  let { glassType, Thickness } = req.body;
  Thickness = Number(Thickness);

  const status = 1;

  const query = `
    INSERT INTO glass (glassType, Thickness, status) 
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE 
      Thickness = VALUES(Thickness), 
      status = VALUES(status)
  `;

  db.query(query, [glassType, Thickness, status], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json({
      message: "Glass added or updated successfully!",
      data: { glassType, Thickness, status },
    });
  });
});

// Route to delete a specific glass item
router.delete("/glass/:glassType", (req, res) => {
  const sql = "DELETE FROM `glass` WHERE glassType = ?";
  const glassType = req.params.glassType;

  db.query(sql, [glassType], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json({ message: "Glass deleted successfully!" });
  });
});

// Route to update details of a specific glass item
router.put("/update/:glassType", (req, res) => {
  const { Thickness, status } = req.body; // Allow updating Thickness and status
  const { glassType } = req.params;

  const sql =
    "UPDATE `glass` SET `Thickness` = ?, `status` = ? WHERE glassType = ?";

  db.query(sql, [Thickness, status, glassType], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json({ message: "Glass updated successfully!" });
  });
});

module.exports = router;
