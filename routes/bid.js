const express = require("express");
const db = require("../dbcon"); // Assuming dbcon handles MySQL connection
const router = express.Router();

// Helper function to handle SQL queries with promises
const queryPromise = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

// Route to fetch all bids
router.get("/bid", (req, res) => {
  const q = "SELECT * FROM `bid`";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Error fetching bids:", err);
      return res.status(500).json({ error: "Error fetching bids" });
    }
    return res.json(data);
  });
});

// Route to create a new bid
router.post("/createBid", (req, res) => {
  const { number, customersId, profileType, VAT, total, date } = req.body;
  const status = 1;

  // Ensure customersId exists in customers table before inserting into bid
  db.query(
    "SELECT * FROM `customers` WHERE `id` = ?",
    [customersId],
    (err, result) => {
      if (err) {
        console.error("Error checking customer existence:", err);
        return res
          .status(500)
          .json({ error: "Error checking customer existence" });
      }
      if (result.length === 0) {
        return res
          .status(404)
          .json({ error: `Customer with id ${customersId} not found` });
      }

      // Insert bid into database
      db.query(
        "INSERT INTO `bid` (`number`, `customersId`, `profileType`, `VAT`, `total`, `date`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [number, customersId, profileType, VAT, total, date, status],
        (err, result) => {
          if (err) {
            console.error("Error creating bid:", err);
            return res.status(500).json({ error: "Error creating bid" });
          }
          res.json({ message: "Bid created successfully", data: result });
        }
      );
    }
  );
});

// Route to delete a bid by bid number
router.delete("/bid/:number", (req, res) => {
  const number = req.params.number;
  const sql = "DELETE FROM `bid` WHERE `number` = ?";

  db.query(sql, [number], (err, result) => {
    if (err) {
      console.error("Error deleting bid:", err);
      return res.status(500).json({ error: "Error deleting bid" });
    }
    res.json({ message: "Bid deleted successfully", data: result });
  });
});

// Route to update a bid status by bid number
router.put("/bid/:number", (req, res) => {
  const { profileType, customersId, VAT, total, date, status } = req.body;
  const number = req.params.number;
  const sql =
    "UPDATE `bid` SET `profileType` = ?, `customersId` = ?, `VAT` = ?, `total` = ?, `date` = ?, `status` = ? WHERE `number` = ?";

  db.query(
    sql,
    [profileType, customersId, VAT, total, date, status, number],
    (err, result) => {
      if (err) {
        console.error("Error updating bid status:", err);
        return res.status(500).json({ error: "Error updating bid status" });
      }
      res.json({ message: "Bid updated successfully", data: result });
    }
  );
});

// Route to fetch customers with their bid counts
router.get("/customer/bid", async (req, res) => {
  try {
    const ordersQuery = "SELECT * FROM `bid`";
    const bidsQuery =
      "SELECT `customersId`, COUNT(`customersId`) as bidCount FROM `bid` GROUP BY `customersId`";

    const [ordersData, bidsData] = await Promise.all([
      queryPromise(ordersQuery),
      queryPromise(bidsQuery),
    ]);

    // Transform bidsData into a map for quick lookup
    const bidsMap = bidsData.reduce((map, { customersId, bidCount }) => {
      map[customersId] = bidCount;
      return map;
    }, {});

    // Combine ordersData with bid counts
    const ordersWithBids = ordersData.map((order) => ({
      ...order,
      bidCount: bidsMap[order.customersId] || 0, // Default to 0 if no bids found
    }));

    res.json(ordersWithBids);
  } catch (err) {
    console.error("Error fetching orders with bid counts:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
