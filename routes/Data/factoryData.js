const express = require("express");
const factoryService = require("./factoryService"); // Adjust the path as necessary
const router = express.Router();

// Route to fetch all factories
router.get("/factory", async (req, res) => {
  try {
    const data = await factoryService.getAllFactories();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// Route to create a new factory
router.post("/createFactory", async (req, res) => {
  try {
    const result = await factoryService.createFactory(req.body);
    res.json("You have added successfully!");
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// Route to delete a factory by ID
router.delete("/factory/:id", async (req, res) => {
  try {
    const result = await factoryService.deleteFactoryById(req.params.id);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.json("Error");
  }
});

// Route to update a factory by ID
router.put("/updateFactory/:id", async (req, res) => {
  try {
    const result = await factoryService.updateFactoryById(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.json("Error");
  }
});

module.exports = router;
