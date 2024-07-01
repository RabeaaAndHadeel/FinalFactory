// //Hadeel and Rabeaa
// const path = require("path");

// const express = require("express");

// const db = require("../dbcon"); //  dbcon is a module for database connection

// const router = express.Router();
// // Route to get all glass info
// router.get("/glass", (req, res) => {
//   const q = "SELECT * FROM `glass`";
//   // query to fetch data from the database
//   db.query(q, (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.json(err); // Return error response as JSON
//     }
//     return res.json(data); // Return fetched data as JSON
//   });
// });
// // Return fetched data as JSON
// router.post("/create", (req, res) => {
//   // Extract necessary data from request body
//   let { glassType, thickness } = req.body;
//   thickness = Number(thickness); // Ensure thickness is a number

//   // Execute the query to insert new data into the database
//   db.query(
//     "INSERT INTO `glass`(`glassType`, `Thickness`) VALUES (?,?)",
//     [glassType, thickness],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.json("You have added successfully!"); // Return success message
//       }
//     }
//   );
// });
// // Route to delete a specific glass item
// router.delete("/glass/:glassType", (req, res) => {
//   const sql = "DELETE FROM `glass` WHERE glassType = ?";
//   const type = req.params.glassType; // Extract glass type from request parameters
//   // Execute the query to delete data from the database
//   db.query(sql, [type], (err, data) => {
//     if (err) return res.json("Error");
//     return res.json(data); // Return result of the deletion operation
//   });
// });
// // Route to update details of a specific glass item
// router.put("/update/:glassType", (req, res) => {
//   const sql = "UPDATE `glass` set `Thickness` =? WHERE glassType =?";
//   const values = [req.body.Thickness];
//   const type = req.params.glassType; // Extract glass type from request parameters
//   // Execute the query to update data in the database
//   db.query(sql, [...values, type], (err, data) => {
//     if (err) return res.json("Error");
//     return res.json(data); // Return result of the update operation
//   });
// });
// module.exports = router; // Export the router for use in other modules
const express = require("express");
const cors = require("cors");
const db = require("../dbcon"); // Assuming dbcon is a module for database connection

const router = express.Router();

// Route to get all glass info
router.get("/glass", (req, res) => {
  const q = "SELECT * FROM `glass`";
  // Query to fetch data from the database
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(data); // Return fetched data as JSON
  });
});

// Route to create a new glass item
router.post("/create", (req, res) => {
  // Extract necessary data from request body
  let { glassType, Thickness } = req.body;
  Thickness = Number(Thickness); // Ensure Thickness is a number

  // Execute the query to insert new data into the database
  db.query(
    "INSERT INTO `glass`(`glassType`, `Thickness`) VALUES (?, ?)",
    [glassType, Thickness],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.json({ message: "Glass added successfully!", data: { glassType, Thickness } }); // Return success message and inserted data
    }
  );
});

// Route to delete a specific glass item
router.delete("/glass/:glassType", (req, res) => {
  const sql = "DELETE FROM `glass` WHERE glassType = ?";
  const glassType = req.params.glassType;

  db.query(sql, [glassType], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json({ message: "Glass deleted successfully!" }); // Return success message
  });
});

// Route to update details of a specific glass item
router.put("/update/:glassType", (req, res) => {
  const sql = "UPDATE `glass` SET `Thickness` = ? WHERE glassType = ?";
  const { Thickness } = req.body;
  const { glassType } = req.params;

  db.query(sql, [Thickness, glassType], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json({ message: "Glass updated successfully!" }); // Return success message
  });
});

module.exports = router;
