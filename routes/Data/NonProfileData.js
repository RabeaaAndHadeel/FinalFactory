const express = require("express");
const profileService = require("../Service/nonProfileService"); 
const router = express.Router();

// Route to fetch all nonActiveProfile
router.get("/nonActiveProfile", async (req, res) => {
  try {
    const data = await profileService.getAllProfiles();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// Route to create a new nonActiveProfile
router.post("/nonActiveProfile", async (req, res) => {
  try {
    const newProfile = await profileService.createProfile(req.body);
    res.json(newProfile);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// Route to update a nonActiveProfile by ID
router.put("/nonActiveProfile/:id", async (req, res) => {
  try {
    const result = await profileService.updateProfileById(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.json("Error");
  }
});
// Route to move selected nonActiveProfile to profile and delete them from profile
router.post("/nonActiveProfile/move", async (req, res) => {
  try {
    const { ids } = req.body;
    const result = await profileService.moveProfilesToNotActive(ids);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.json("Error");
  }
});

// Route to delete selected profiles by IDs
router.delete("/nonActiveProfile", async (req, res) => {
  try {
    const { ids } = req.body;
    const result = await profileService.deleteProfilesByIds(ids);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.json("Error");
  }
});


module.exports = router;
