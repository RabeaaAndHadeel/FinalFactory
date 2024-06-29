const express = require("express");
const profileService = require("./profileService"); // Adjust the path as necessary
const router = express.Router();

// Route to fetch all profiles
router.get("/profile", async (req, res) => {
  try {
    const data = await profileService.getAllProfiles();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// Route to create a new profile
router.post("/profile", async (req, res) => {
  try {
    const newProfile = await profileService.createProfile(req.body);
    res.json(newProfile);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// Route to delete a profile by ID
router.delete("/profile/:id", async (req, res) => {
  try {
    const result = await profileService.deleteProfileById(req.params.id);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.json("Error");
  }
});

// Route to update a profile by ID
router.put("/profile/:id", async (req, res) => {
  try {
    const result = await profileService.updateProfileById(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.json("Error");
  }
});

module.exports = router;
