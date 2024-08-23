import React, { useState } from 'react';
import axios from 'axios';
import ProfileModal from './ProfileModal'; // Ensure this path is correct
import Validation from '../validations/ProfileValidation';

export default function Profile1({ profile, setProfile }) {
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [newProfileData, setNewProfileData] = useState({
    id: profile,
    weight: '',
    perimeter: '',
    status: 1, // Assuming 1 is active
  });

  const checkIfProfileExists = async (id) => {
  try {
    const response = await axios.get(`/profile/${id}`);
    console.log('Profile exists, data:', response.data); // Debugging log

    if (response.data.exists) {
      return response.data;
    } else {
      return null;
    }
  } catch (err) {
    if (err.response && err.response.status === 404) {
      console.log('Profile does not exist.'); // Debugging log
      return null;
    } else if (err.response && err.response.status === 500) {
      console.error("Server error occurred while checking profile existence:", err.message);
      return { error: "Server error" };
    } else {
      console.error("Error checking if profile exists:", err.message);
      return null;
    }
  }
};

const handleProfileChange = async (e) => {
  const profileId = e.target.value;
  setProfile(profileId);
  setErrors({ ...errors, profileId: undefined });

  if (profileId.length === 5) { // Check only if the length is exactly 5 characters
    try {
      const existingProfile = await checkIfProfileExists(profileId);
      console.log('API response:', existingProfile); // Debugging log

      if (existingProfile && existingProfile.exists) {
        console.log('Existing Profile data:', existingProfile.data); // Debugging log
        setSuccessMessage('Profile loaded successfully.');
        setNewProfileData(existingProfile.data); // Populate form with existing profile data
      } else {
        setShowModal(true); // Show modal to create new profile
        setSuccessMessage('Profile does not exist, please add a new profile.');
      }
    } catch (error) {
      console.error("Error checking profile:", error);
      setErrors({ ...errors, profileId: "Error checking profile." });
    }
  }
};

const handleSaveNewProfile = async () => {
  const validationErrors = Validation(newProfileData);
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }
  try {
    const response = await axios.post('/profile', newProfileData); // Adjusted the endpoint
    if (response.status === 200) {
      setShowModal(false); // Close modal after saving
      setSuccessMessage('Profile saved successfully.');
    }
  } catch (error) {
    console.error("Error saving new profile:", error);
    setErrors({ ...errors, saveError: "Error saving profile." });
  }
};


  return (
    <div className="form-group">
      <label htmlFor="profile">מק"ט פרופיל:</label>
      <input
        type="text"
        id="profile"
        placeholder="הכנס מקט"
        autoComplete="off"
        value={profile}
        onChange={handleProfileChange}
      />
      
      {errors.profileId && <div className="error-message">{errors.profileId}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {showModal && (
        <ProfileModal
          newProfileData={newProfileData}
          setNewProfileData={setNewProfileData}
          handleSave={handleSaveNewProfile}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
