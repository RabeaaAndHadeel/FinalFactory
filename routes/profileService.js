const db = require("../dbcon"); // Adjust the path as necessary

// Function to fetch all profiles
const getAllProfiles = () => {
  return new Promise((resolve, reject) => {
    const q = "SELECT * FROM profile";
    db.query(q, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// Function to create a new profile
const createProfile = (profile) => {
  return new Promise((resolve, reject) => {
    const { id, perimeter, weight } = profile;
    const q = "INSERT INTO profile (id, perimeter, weight) VALUES (?, ?, ?)";
    db.query(q, [id, perimeter, weight], (err, result) => {
      if (err) {
        reject(err);
      } else {
        // Fetch the newly created profile
        const newProfileQuery = "SELECT * FROM profile WHERE id = ?";
        db.query(newProfileQuery, [id], (err, newProfileData) => {
          if (err) {
            reject(err);
          } else {
            resolve(newProfileData[0]);
          }
        });
      }
    });
  });
};

// Function to delete a profile by ID
const deleteProfileById = (id) => {
  return new Promise((resolve, reject) => {
    const q = "DELETE FROM profile WHERE id = ?";
    db.query(q, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Function to update a profile by ID
const updateProfileById = (id, profile) => {
  return new Promise((resolve, reject) => {
    const { perimeter, weight } = profile;
    const q = "UPDATE profile SET perimeter = ?, weight = ? WHERE id = ?";
    db.query(q, [perimeter, weight, id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getAllProfiles,
  createProfile,
  deleteProfileById,
  updateProfileById
};
