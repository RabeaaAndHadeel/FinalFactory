import React, { useState, useEffect } from "react";
import axios from "axios";
import Validation from "../../js/validations/ShtterValidation";  

const ShutterComponent = ({ shutterType, setShutterType }) => {
  const [shutterExists, setShutterExists] = useState(false);
  const [errors, setErrors] = useState({});
  const [showAddShutterModal, setShowAddShutterModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [shutterTypes, setShutterTypes] = useState([]);
  const [shutter, setShutter] = useState({
    shutterId : null,         
    shutterType: "",
    status: 1,
  });

  useEffect(() => {
    const fetchShutterTypes = async () => {
      try {
        const response = await axios.get("/shutters");
        setShutterTypes(response.data);
      } catch (err) {
        console.error("Error fetching shutter types:", err.message);
      }
    };
    fetchShutterTypes();
  }, []);

  const checkIfShutterExists = async (shutterType) => {
    try {
      const response = await axios.get(`/shutters/${shutterType}`);
      return response.data;  
    } catch (err) {
      if (err.response && err.response.status === 404) {
        return null;
      } else {
        console.error("Error checking if shutter exists:", err.message);
        return null;
      }
    }
  };

  const handleShutterTypeChange = async (e) => {
    const selectedShutterType = e.target.value;
    setShutterType(selectedShutterType);
    setShutter({ ...shutter, shutterType: selectedShutterType });
    setErrors({ ...errors, shutterType: undefined });

    if (selectedShutterType) {
      if (selectedShutterType === "other") {
        setShutter({
          shutterId : null,
          shutterType: "",
          status: 1,
        });
        setShutterType("");
        setShutterExists(false);
        setSuccessMessage("");
        setShowAddShutterModal(true);
      } else {
        const existingShutter = shutterTypes.find(shutter => shutter.shutterType === selectedShutterType);
        if (existingShutter) {
          setShutter(existingShutter);
          console.log("Form data updated with existing shutter:", existingShutter);
          setShutterExists(true);
          setSuccessMessage("סוג תריס קיים נטען בהצלחה");
          setShowAddShutterModal(false);
        } else {
          setShutter({
            shutterId : null,
            shutterType: selectedShutterType,
            status: 1,
          });
          setShutterType(selectedShutterType);
          setShutterExists(false);
          setSuccessMessage("סוג תריס אינו קיים, בבקשה להוסיף אותו");
          setShowAddShutterModal(true);
        }
      }
    } else {
      setShutter({
        ...shutter,
        shutterType: "",
      });
      setShowAddShutterModal(false);
      setShutterExists(false);
      setSuccessMessage("");
    }
  };

  const handleNewShutterChange = (event) => {
    const { name, value } = event.target;
    setShutter((prevShutter) => ({
      ...prevShutter,
      [name]: value,
    }));
  };

  const handleAddShutter = async () => {
    const validationErrors = Validation(shutter);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const { shutterType, shutterId } = shutter;
      if (shutterType.length > 0) {
        if (shutterExists && shutterId) {
          await axios.put(`/shutters/${shutterId}`, shutter); // Update existing
          setSuccessMessage("סוג תריס נשמר בהצלחה");
        } else {
          await axios.post("/shutters", shutter); // Add new
          setSuccessMessage("סוג תריס נוצר בהצלחה");
          setShutterTypes((prevShutterTypes) => [...prevShutterTypes, shutter]);
          setShutterExists(true);
        }
        setShowAddShutterModal(false);
      } else {
        setErrors({ ...errors, shutterType: "סוג תריס חייב להיות שם" });
      }
    } catch (err) {
      console.error(
        "Error saving or fetching shutter:",
        err.response?.data?.error || err.message
      );
    }
  };

  return (
    <div>
      <label htmlFor="shutterType" style={{ fontWeight: "bolder" }}>
        הכנס סוג תריס
      </label>
      <select
        id="shutterType"
        name="shutterType"
        value={shutter.shutterType}
        onChange={handleShutterTypeChange}
        style={styles.inputField}
      >
        <option value="">בחר סוג תריס</option>
        {shutterTypes.map((type) => (
          <option key={type.shutterType} value={type.shutterType}>
            {type.shutterType}
          </option>
        ))}
        <option value="other">אחר (הוסף סוג תריס חדש)</option>
      </select>

      {errors.shutterType && <p style={styles.errorText}>{errors.shutterType}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      {showAddShutterModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={{ textAlign: "center" }}>
              {shutterExists ? "ערוך סוג תריס קיים:" : "הוסף סוג תריס חדש:"}
            </h3>
            <label htmlFor="shutterType" style={{ fontWeight: "bolder" }}>
              הכנס סוג תריס
            </label>
            <input
              type="text"
              id="shutterType"
              name="shutterType"
              placeholder="סוג תריס"
              value={shutter.shutterType}
              onChange={handleNewShutterChange}
              style={styles.inputField}
            />
            <label htmlFor="status" style={{ fontWeight: "bolder" }}>
              סטטוס
            </label>
            <input
              type="text"
              id="status"
              name="status"
              placeholder="סטטוס"
              value={shutter.status}
              onChange={handleNewShutterChange}
              style={styles.inputField}
            />
            <button onClick={handleAddShutter} style={styles.button}>
              {shutterExists ? "שמור סוג תריס" : "הוסף סוג תריס"}
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

export default ShutterComponent;
