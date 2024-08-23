const express = require("express");
const profileService = require("../Service/profileService"); // Adjust the path as necessary
const router = express.Router();
// Route to fetch all profiles
router.get("/profiles", async (req, res) => {
  try {
    const data = await profileService.getAllProfiles();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch profiles" });
  }
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM profile WHERE id = ?';
  
  console.log(`Executing query: ${query} with ID: ${id}`);
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Database query error:', err.message);
      console.error('Error stack:', err.stack); // This will give you the full stack trace of the error
      return res.status(500).json({ error: 'Database query error', details: err.message });
    }
    if (results.length > 0) {
      return res.json({ exists: true, data: results[0] });
    } else {
      return res.status(404).json({ exists: false });
    }
  });
});

// Route to create a new profile
router.post("/profile", async (req, res) => {
  try {
    const newProfile = await profileService.createProfile(req.body);
    res.status(201).json(newProfile);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create profile" });
  }
});

// Route to update a profile by ID
router.put("/profile/:id", async (req, res) => {
  try {
    const result = await profileService.updateProfileById(req.params.id, req.body);
    if (result) {
      res.json({ message: "Profile updated successfully", data: result });
    } else {
      res.status(404).json({ error: "Profile not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

module.exports = router;
