const express = require("express");
const orderData = require("./orderData"); // Importing the database interaction functions
const router = express.Router();

// Route to fetch all orders
router.get("/order", async (req, res) => {
  try {
    const data = await orderData.getAllOrders(); // Fetch all orders from the database
    res.json(data); // Send the retrieved data as a JSON response
  } catch (err) {
    console.error("Error fetching orders:", err); // Log the error for debugging
    res.status(500).json({ error: "Internal server error" }); // Send a 500 error response if something goes wrong
  }
});

// Route to create a new order
router.post("/createOrder", async (req, res) => {
  const { orderNumber, profileType, count, customersId, supplierId } = req.body; // Extract order details from the request body
  const status = 1; // Setting default status as 1 (active)

  try {
    await orderData.createOrder({
      orderNumber,
      profileType,
      count,
      customersId,
      supplierId,
      status,
    }); // Create a new order in the database
    res.json("Order added successfully!"); // Send a success message as a JSON response
  } catch (err) {
    console.error("Error creating order:", err); // Log the error for debugging
    res.status(500).json({ error: "Internal server error" }); // Send a 500 error response if something goes wrong
  }
});

// Route to get order by orderNumber
router.get("/order/:orderNumber", async (req, res) => {
  const { orderNumber } = req.params; // Extract orderNumber from the route parameters

  try {
    const order = await orderData.getOrderById(orderNumber); // Fetch order details by orderNumber from the database
    res.json(order); // Send the retrieved order details as a JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Send a 500 error response if something goes wrong
  }
});

// Route to delete an order by orderNumber
router.delete("/order/:orderNumber", async (req, res) => {
  const orderNumber = req.params.orderNumber; // Extract orderNumber from the route parameters

  try {
    const data = await orderData.deleteOrder(orderNumber); // Delete the order by orderNumber from the database
    res.json(data); // Send a success message or the result as a JSON response
  } catch (err) {
    console.error("Error deleting order:", err); // Log the error for debugging
    res.status(500).json({ error: "Internal server error" }); // Send a 500 error response if something goes wrong
  }
});

// Route to update an order by orderNumber
router.put("/order/:orderNumber", async (req, res) => {
  const { status } = req.body; // Extract status from the request body
  const orderNumber = req.params.orderNumber; // Extract orderNumber from the route parameters

  try {
    const data = await orderData.updateOrderStatus(orderNumber, status); // Update the order status by orderNumber in the database
    res.json(data); // Send the updated order details or a success message as a JSON response
  } catch (err) {
    console.error("Error updating order status:", err); // Log the error for debugging
    res.status(500).json({ error: "Internal server error" }); // Send a 500 error response if something goes wrong
  }
});

// Route to fetch supplier orders count
router.get("/suppliers/orders", async (req, res) => {
  try {
    const supplierOrdersData = await orderData.getSupplierOrdersCount(); // Fetch the count of orders per supplier from the database
    res.json(supplierOrdersData); // Send the supplier orders data as a JSON response
  } catch (err) {
    console.error("Error fetching supplier orders:", err); // Log the error for debugging
    res.status(500).json({ error: "Internal server error" }); // Send a 500 error response if something goes wrong
  }
});

module.exports = router; // Export the router to be used in other modules
