import React, { useState } from "react";
import axios from "axios";
import Validation from '../../../js/validations/ProfileValidation';

const ProfileComponent = ({ profile,  setProfile }) => {
  const [profileExists, setProfileExists] = useState(false);
  const [errors, setErrors] = useState({});
  const [showAddProfileModal, setShowAddProfileModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const checkIfProfileExists = async (id) => {
    try {
      const response = await axios.get(`/profile/${id}`);
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 404) {
        return null;
      } else {
        console.error("Error checking if profile exists:", err.message);
        return null;
      }
    }
  };

  const handleIdChange = async (e) => {
  const id = e.target.value;
  setProfile({ ...profile, id });
  setErrors({ ...errors, id: undefined });

  if (id.length === 5) {
    const existingProfile = await checkIfProfileExists(id);
    if (existingProfile) {
      setProfile(existingProfile);
      console.log(
        "Form data updated with existing profile:",
        existingProfile
      );
      setProfileExists(true);
      setSuccessMessage("פרופיל קיים נטען בהצלחה");
      setShowAddProfileModal(true);
    } else {
      setProfile({
        id: id,
        perimeter: "",
        weight: "",
        status: 1,
        price: "",
        priceShutters:"",
      });
      setProfileExists(false);
      setSuccessMessage("פרופיל אינו קיים בבקשה להוסיף אותו");
      setShowAddProfileModal(true);
    }
  } else {
    setShowAddProfileModal(false);
    setProfileExists(false);
    setSuccessMessage("");
  }
};


  const handleNewProfileChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleAddProfile = async () => {
    const validationErrors = Validation(profile);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const { id } = profile;
      if (id.length === 5) {
        const existingProfile = await checkIfProfileExists(id);

        if (existingProfile) {
          await axios.put(`/profile/${id}`, profile);
          setSuccessMessage("פרופיל נשמר בהצלחה");
        } else {
          await axios.post("/profile", profile);
          setSuccessMessage("פרופיל נוצר בהצלחה");
          setProfileExists(true);
        }
        setShowAddProfileModal(false);
      } else {
        setErrors({ ...errors, id: "ID must be 5 characters long" });
      }
    } catch (err) {
      console.error(
        "Error saving or fetching profile:",
        err.response?.data?.error || err.message
      );
    }
  };

  return (
    <div>
      <label htmlFor="profileId" style={{ fontWeight: "bolder" }}>
        הכנס מק"ט פרופיל
      </label>
      <input
        type="text"
        id="profileId"
        name="id"
        placeholder="הכנס מקט"
        value={profile.id}
        onChange={handleIdChange}
        maxLength={5}
        style={styles.inputField}
        onFocus={(e) => {
          e.target.style.borderColor = "#66afe9";
          e.target.style.boxShadow = "0 0 8px rgba(102, 175, 233, 0.6)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#ccc";
          e.target.style.boxShadow = "none";
        }}
      />

      {errors.id && <p style={styles.errorText}>{errors.id}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      {showAddProfileModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={{ textAlign: "center" }}>
              {profileExists ? "ערוך פרופיל קיים:" : "הוספת פרופיל חדש:"}
            </h3>
            <label htmlFor="perimeter" style={{ fontWeight: "bolder" }}>
              היקף
            </label>
            <input
              type="text"
              name="perimeter"
              id="perimeter"
              placeholder="היקף"
              value={profile.perimeter}
              onChange={handleNewProfileChange}
              style={styles.inputField}
            />
            <label htmlFor="weight" style={{ fontWeight: "bolder" }}>
              משקל
            </label>
            <input
              type="text"
              name="weight"
              id="weight"
              placeholder="משקל"
              value={profile.weight}
              onChange={handleNewProfileChange}
              style={styles.inputField}
            />
            <label htmlFor="price" style={{ fontWeight: "bolder" }}>
              מחיר למטר מרובע
            </label>
            <input
              type="double"
              name="price"
              id="price"
              placeholder=" מחיר למטר מרובע"
              value={profile.price}
              onChange={handleNewProfileChange}
              style={styles.inputField}
            />
            <label htmlFor="priceShutters" style={{ fontWeight: "bolder" }}>
              מחיר תריס (1 מטר מרובע)
            </label>
            <input
              type="double"
              name="priceShutters"
              id="priceShutters"
              placeholder="מחיר תריס"
              value={profile.priceShutters}
              onChange={handleNewProfileChange}
              style={styles.inputField}
            />
            <button onClick={handleAddProfile} style={styles.button}>
              {profileExists ? "שמור פרופיל" : "הוסף פרופיל"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  inputField: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
    fontSize: "16px",
    color: "#333",
    backgroundColor: "#fff",
    outline: "none",
  },
  errorText: {
    color: "red",
    marginBottom: "10px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    fontSize: "16px",
  },
};

export default ProfileComponent;
