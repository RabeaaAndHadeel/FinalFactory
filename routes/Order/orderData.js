const db = require("../../dbcon"); // Assuming dbcon handles database connection

// Helper function to handle async queries
const queryPromise = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, rows) => {
      if (err) {
        console.error("Query error:", err); // Log any errors for debugging
        return reject(err); // Reject the promise with the error
      }
      resolve(rows); // Resolve the promise with the result
    });
  });
};

// Function to fetch all orders
const getAllOrders = () => {
  const sql = "SELECT * FROM `orders`"; // SQL query to select all orders
  return queryPromise(sql); // Return a promise that resolves with the query result
};

// Function to create a new order
const createOrder = (orderData) => {
  const { orderNumber, profileType, count, customersId, supplierId, status } = orderData; // Extract order details from the input object
  const sql = `
    INSERT INTO \`orders\` (\`orderNumber\`, \`profileType\`, \`count\`, \`customersId\`, \`supplierId\`, \`status\`) 
    VALUES (?, ?, ?, ?, ?, ?)
  `; // SQL query to insert a new order
  return queryPromise(sql, [
    orderNumber,
    profileType,
    count,
    customersId,
    supplierId,
    status,
  ]); // Return a promise that resolves when the order is inserted
};

// Function to get an order by orderNumber
const getOrderById = async (orderNumber) => {
  const query = "SELECT * FROM `orders` WHERE `orderNumber` = ?"; // SQL query to select an order by orderNumber
  const [rows] = await db.query(query, [orderNumber]); // Execute the query and get the result
  return rows[0]; // Return the first result (order) or undefined if not found
};

// Function to delete an order by orderNumber
const deleteOrder = (orderNumber) => {
  const sql = "DELETE FROM `orders` WHERE `orderNumber` = ?"; // SQL query to delete an order by orderNumber
  return queryPromise(sql, [orderNumber]); // Return a promise that resolves when the order is deleted
};

// Function to update an order's status by orderNumber
const updateOrderStatus = (orderNumber, status) => {
  const sql = "UPDATE `orders` SET `status` = ? WHERE `orderNumber` = ?"; // SQL query to update the status of an order
  return queryPromise(sql, [status, orderNumber]); // Return a promise that resolves when the order status is updated
};

// Function to fetch supplier orders count
const getSupplierOrdersCount = () => {
  const supplierOrdersQuery = `
    SELECT supplierId, COUNT(supplierId) as orderCount 
    FROM orders 
    GROUP BY supplierId
  `; // SQL query to count orders per supplier
  return queryPromise(supplierOrdersQuery); // Return a promise that resolves with the supplier orders count
};

module.exports = {
  getAllOrders,
  createOrder,
  deleteOrder,
  updateOrderStatus,
  getSupplierOrdersCount,
  getOrderById,
}; // Export functions for use in other modules
