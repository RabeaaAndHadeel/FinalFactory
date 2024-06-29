const db = require("../dbcon"); // Adjust the path as necessary

// Function to fetch all factories
const getAllFactories = () => {
  return new Promise((resolve, reject) => {
    const q = "SELECT * FROM factory";
    db.query(q, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// Function to create a new factory
const createFactory = (factory) => {
  return new Promise((resolve, reject) => {
    const { factoryName, address, id, contact, phoneNumber, email, vat } = factory;
    const q = "INSERT INTO factory (factoryName, address, id, contact, phoneNumber, email, vat) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(q, [factoryName, address, id, contact, phoneNumber, email, vat], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Function to delete a factory by ID
const deleteFactoryById = (id) => {
  return new Promise((resolve, reject) => {
    const q = "DELETE FROM factory WHERE id = ?";
    db.query(q, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Function to update a factory by ID
const updateFactoryById = (id, factory) => {
  return new Promise((resolve, reject) => {
    const { factoryName, address, contact, phoneNumber, email, vat } = factory;
    const q = "UPDATE factory SET factoryName = ?, address = ?, contact = ?, phoneNumber = ?, email = ?, vat = ? WHERE id = ?";
    db.query(q, [factoryName, address, contact, phoneNumber, email, vat, id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getAllFactories,
  createFactory,
  deleteFactoryById,
  updateFactoryById
};
