//Hadeel and Rabeaa

const express = require("express");

const db = require("../dbcon"); // dbcon is a module for database connection

const router = express.Router();

// // Route to fetch all products
// router.get("/product", (req, res) => {
//   const q = "SELECT * FROM `product`";
//   db.query(q, (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.json(err);
//     }
//     return res.json(data);
//   });
// });
// // Route to create a new product
// router.post("/createProduct", (req, res) => {
//   let {
//     type,
//     profileType,
//     customersId,
//     Remarks,
//     width,
//     length,
//     count,
//     price,
//     date,
//   } = req.body;

//   db.query(
//     "INSERT INTO `product`(`type`, `profileType`, `customersId`,`Remarks`,`width`,`length`,`count`,`price`,`date`) VALUES (?,?,?,?,?,?,?,?,?)",
//     [
//       type,
//       profileType,
//       customersId,
//       Remarks,
//       width,
//       length,
//       count,
//       price,
//       date,
//     ],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.json("You have added successfully!");
//       }
//     }
//   );
// });

// // Route to delete a product by id
// router.delete("/product/:customersId", (req, res) => {
//   const sql = "DELETE FROM `product` WHERE customersId = ?";
//   const id = req.params.customersId;
//   db.query(sql, [id], (err, data) => {
//     if (err) return res.json("Error");
//     return res.json(data);
//   });
// });

// // Route to update a product by id
// router.put("/updateProduct/:customersId", (req, res) => {
//   const sql =
//     "UPDATE `product` SET `type`=?,`profileType`=?,`Remarks`=?,`width`=?,`length`=?,`count`=?,`price`=?,`date`=? WHERE customersId = ?";
//   const values = [
//     req.body.type,
//     req.body.profileType,
//     req.body.Remarks,
//     req.body.width,
//     req.body.length,
//     req.body.count,
//     req.body.price,
//     req.body.date,
//   ];
//   const id = req.params.customersId;
//   db.query(sql, [...values, id], (err, data) => {
//     if (err) return res.json("Error");
//     return res.json(data); // Return result of the update operation
//   });
// });
// // Endpoint to save items
// app.post('/saveItems', (req, res) => {
//   const newItems = req.body.list;
//   if (newItems && Array.isArray(newItems)) {
//     items = newItems;
//     return res.status(200).json({ message: 'Items saved successfully!' });
//   } else {
//     return res.status(400).json({ message: 'Invalid data format.' });
//   }
// });
// Endpoint to save items
// Save items endpoint
router.post('/saveItems', async (req, res) => {
  console.log('Incoming data:', req.body.list); // Log the incoming data
  const items = req.body.list;

  if (items && Array.isArray(items)) {
    const client = await db.connect();
    try {
      await client.query('BEGIN');

      for (const item of items) {
        const { id, item: itemName, length, width, quantity, price, total } = item;

        console.log('Saving item:', { id, itemName, length, width, quantity, price, total });
        const queryText = `
          INSERT INTO product (type, profileType, customersId, Remarks, width, length, count, price, numberBid)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `;
        const values = [id, itemName, '', '', width, length, quantity, price, 0];

        await client.query(queryText, values);
      }

      await client.query('COMMIT');
      res.status(200).json({ message: 'Items saved successfully!' });
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error saving items:', error);
      res.status(500).json({ message: 'Failed to save items. Please try again.', error: error.message });
    } finally {
      client.release();
    }
  } else {
    res.status(400).json({ message: 'Invalid data format.' });
  }
});
// Endpoint to get items (optional, for testing)
router.get('/product', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM product');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error retrieving items:', error);
    res.status(500).json({ message: 'Failed to retrieve items. Please try again.', error: error.message });
  }
});
module.exports = router;
