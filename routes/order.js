const express = require("express");
const db = require("../dbcon"); // Assuming dbcon handles database connection
const router = express.Router();

// Helper function to handle async queries
const queryPromise = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, rows) => {
      if (err) {
        console.error("Query error:", err);
        return reject(err);
      }
      resolve(rows);
    });
  });
};

// Route to fetch all orders
router.get("/order", (req, res) => {
  const sql = "SELECT * FROM `orders`";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching orders:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(data);
  });
});

// Route to create a new order
router.post("/createOrder", (req, res) => {
  const { orderNumber, profileType, count, customersId, supplierId } = req.body;
  const status = 1; // Setting default status as 1 (active)
  const sql =
    "INSERT INTO `orders` (`orderNumber`, `profileType`, `count`, `customersId`, `supplierId`, `status`) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [orderNumber, profileType, count, customersId, supplierId, status],
    (err, result) => {
      if (err) {
        console.error("Error creating order:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.json("Order added successfully!");
    }
  );
});

// Route to delete an order by orderNumber
router.delete("/order/:orderNumber", (req, res) => {
  const sql = "DELETE FROM `orders` WHERE `orderNumber` = ?";
  const orderNumber = req.params.orderNumber;
  db.query(sql, [orderNumber], (err, data) => {
    if (err) {
      console.error("Error deleting order:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(data);
  });
});

// Route to update an order by orderNumber
router.put("/order/:orderNumber", (req, res) => {
  const sql = "UPDATE `orders` SET `status`=? WHERE `orderNumber` = ?";
  const { status } = req.body;
  const orderNumber = req.params.orderNumber;
  db.query(sql, [status, orderNumber], (err, data) => {
    if (err) {
      console.error("Error updating order status:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(data);
  });
});



// Route to fetch supplier orders count
router.get("/supplier/orders", async (req, res) => {
  try {
    const supplierOrdersQuery = `
      SELECT supplierId, COUNT(supplierId) as orderCount 
      FROM orders 
      GROUP BY supplierId
    `;
    const supplierOrdersData = await queryPromise(supplierOrdersQuery);
    res.json(supplierOrdersData);
  } catch (err) {
    console.error("Error fetching supplier orders:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
