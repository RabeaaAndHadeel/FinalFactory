import React, { useState, useEffect } from "react";
import axios from "axios";
import Validation from "../../js/validations/DoorValidation";  

const DoorComponent = ({ idDoor, setIdDoor }) => {
  const [doorExists, setDoorExists] = useState(false);
  const [errors, setErrors] = useState({});
  const [showAddDoorModal, setShowAddDoorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [doorTypes, setDoorTypes] = useState([]);
  const [door, setDoor] = useState({
    doorId: null,         
    doorType: "",
  });

  useEffect(() => {
    const fetchDoorTypes = async () => {
      try {
        const response = await axios.get("/doors");
        setDoorTypes(response.data);
      } catch (err) {
        console.error("Error fetching door types:", err.message);
      }
    };
    fetchDoorTypes();
  }, []);

  const checkIfDoorExists = async (doorType) => {
    try {
      const response = await axios.get(`/doors/${doorType}`);
      return response.data;  
    } catch (err) {
      if (err.response && err.response.status === 404) {
        return null;
      } else {
        console.error("Error checking if door exists:", err.message);
        return null;
      }
    }
  };

  const handleDoorTypeChange = async (e) => {
    const selectedDoorType = e.target.value;
    setDoor({ ...door, doorType: selectedDoorType });
    setErrors({ ...errors, doorType: undefined });

    if (selectedDoorType) {
      if (selectedDoorType === "other") {
        setDoor({
          doorId: null,
          doorType: "",
        });
        setIdDoor(null);
        setDoorExists(false);
        setSuccessMessage("");
        setShowAddDoorModal(true);
      } else {
        const existingDoor = doorTypes.find(door => door.doorType === selectedDoorType);
        if (existingDoor) {
          setDoor(existingDoor);
          console.log("Form data updated with existing door:", existingDoor);
          setDoorExists(true);
          setSuccessMessage("סוג דלת קיים נטען בהצלחה");
          setIdDoor(existingDoor.idDoor);
          setShowAddDoorModal(false);
        } else {
          setDoor({
            doorId: null,
            doorType: selectedDoorType,
          });
          setIdDoor(null);
          setDoorExists(false);
          setSuccessMessage("סוג דלת אינו קיים, בבקשה להוסיף אותו");
          setShowAddDoorModal(true);
        }
      }
    } else {
      setDoor({
        ...door,
        doorType: "",
      });
      setIdDoor(null);
      setShowAddDoorModal(false);
      setDoorExists(false);
      setSuccessMessage("");
    }
  };

  const handleNewDoorChange = (event) => {
    const { name, value } = event.target;
    setDoor((prevDoor) => ({
      ...prevDoor,
      [name]: value,
    }));
  };

  const handleAddDoor = async () => {
    const validationErrors = Validation(door);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const { doorType, doorId } = door;
      console.log(doorId)
      if (doorType.length > 0) {
        if (doorExists && doorId) {
          await axios.put(`/doors/${doorId}`, door); // Update existing
          setSuccessMessage("סוג דלת נשמר בהצלחה");
        } else {
          const response = await axios.post("/doors", door); // Add new
          setSuccessMessage("סוג דלת נוצר בהצלחה");
          setDoorTypes((prevDoorTypes) => [
            ...prevDoorTypes,
            { ...door, doorId: response.data.doorId }, // Update with new doorId
          ]);
          setDoorExists(true);
          setIdDoor(response.data.doorId); // Update idDoor with new id
        }
        setShowAddDoorModal(false);
      } else {
        setErrors({ ...errors, doorType: "סוג דלת חייב להיות שם" });
      }
    } catch (err) {
      console.error(
        "Error saving or fetching door:",
        err.response?.data?.error || err.message
      );
    }
  };

  return (
    <div>
      <label htmlFor="doorType" style={{ fontWeight: "bolder" }}>
        הכנס סוג דלת
      </label>
      <select
        id="doorType"
        name="doorType"
        value={door.doorType}
        onChange={handleDoorTypeChange}
        style={styles.inputField}
      >
        <option value="">בחר סוג דלת</option>
        {doorTypes.map((type) => (
          <option key={type.doorId} value={type.doorType}>
            {type.doorType}
          </option>
        ))}
        <option value="other">אחר (הוסף סוג דלת חדש)</option>
      </select>

      {errors.doorType && <p style={styles.errorText}>{errors.doorType}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      {showAddDoorModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={{ textAlign: "center" }}>
              {doorExists ? "ערוך סוג דלת קיים:" : "הוסף סוג דלת חדש:"}
            </h3>
            <label htmlFor="doorType" style={{ fontWeight: "bolder" }}>
              הכנס סוג דלת
            </label>
            <input
              type="text"
              name="doorType"
              id="doorType"
              placeholder="סוג דלת"
              value={door.doorType}
              onChange={handleNewDoorChange}
              style={styles.inputField}
            />
            <button onClick={handleAddDoor} style={styles.button}>
              {doorExists ? "שמור סוג דלת" : "הוסף סוג דלת"}
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

export default DoorComponent;
