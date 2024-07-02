const db = require("../../dbcon"); // Adjust the path as necessary

// Function to fetch all profile_not_active
const getAllProfiles = () => {
  return new Promise((resolve, reject) => {
    const q = "SELECT * FROM profile_not_active";
    db.query(q, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// Function to create a new profile_not_active
const createProfile = (profile) => {
  return new Promise((resolve, reject) => {
    const { id, perimeter, weight } = profile;
    const q = "INSERT INTO profile_not_active (id, perimeter, weight) VALUES (?, ?, ?)";
    db.query(q, [id, perimeter, weight], (err, result) => {
      if (err) {
        reject(err);
      } else {
        // Fetch the newly created profile_not_active
        const newProfileQuery = "SELECT * FROM profile_not_active WHERE id = ?";
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

// Function to delete a profile_not_active by ID
const deleteProfileById = (id) => {
  return new Promise((resolve, reject) => {
    const q = "DELETE FROM profile_not_active WHERE id = ?";
    db.query(q, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Function to update a profile_not_active by ID
const updateProfileById = (id, profile) => {
  return new Promise((resolve, reject) => {
    const { perimeter, weight } = profile;
    const q = "UPDATE profile_not_active SET perimeter = ?, weight = ? WHERE id = ?";
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
