import React, { useState, useEffect } from "react";
import axios from "axios";
import Validation from "../../js/validations/GlassValidation";

const GlassComponent = ({ glassType, setGlassType }) => {
  const [glassExists, setGlassExists] = useState(false);
  const [errors, setErrors] = useState({});
  const [showAddGlassModal, setShowAddGlassModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [glassTypes, setGlassTypes] = useState([]);
  const [glass, setGlass] = useState({
    glassType: "",
    Thickness: "",
    status: 1,
  });

  useEffect(() => {
    const fetchGlassTypes = async () => {
      try {
        const response = await axios.get("/glass");
        setGlassTypes(response.data);
      } catch (err) {
        console.error("Error fetching glass types:", err.message);
      }
    };
    fetchGlassTypes();
  }, []);

  const checkIfGlassExists = async (glassType) => {
    try {
      const response = await axios.get(`/glass1/${glassType}`);
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 404) {
        return null;
      } else {
        console.error("Error checking if glass exists:", err.message);
        return null;
      }
    }
  };

  const handleGlassTypeChange = async (e) => {
    const selectedGlassType = e.target.value;
    setGlassType(selectedGlassType); 
    setGlass({ ...glass, glassType: selectedGlassType });
    setErrors({ ...errors, glassType: undefined });

    if (selectedGlassType) {
      if (selectedGlassType === "other") {
        setGlass({
          glassType: "",
          Thickness: "",
          status: 1,
        });
        setGlassType(""); 
        setGlassExists(false);
        setSuccessMessage("");
        setShowAddGlassModal(true);
      } else {
        const existingGlass = await checkIfGlassExists(selectedGlassType);
        if (existingGlass) {
          setGlass(existingGlass);
          console.log("Form data updated with existing glass:", existingGlass);
          setGlassExists(true);
          setSuccessMessage("סוג זכוכית קיים נטען בהצלחה");
          setShowAddGlassModal(false);
        } else {
          setGlass({
            glassType: selectedGlassType,
            Thickness: "",
            status: 1,
          });
          setGlassType(selectedGlassType); 
          setGlassExists(false);
          setSuccessMessage("סוג זכוכית אינו קיים, בבקשה להוסיף אותו");
          setShowAddGlassModal(true);
        }
      }
    } else {
      setGlass({
        ...glass,
        glassType: "", // Reset glassType if no option is selected
      });
      setShowAddGlassModal(false);
      setGlassExists(false);
      setSuccessMessage("");
    }
  };

  const handleNewGlassChange = (event) => {
    const { name, value } = event.target;
    setGlass((prevGlass) => ({
      ...prevGlass,
      [name]: value,
    }));
  };

  const handleAddGlass = async () => {
    const validationErrors = Validation(glass);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const { glassType } = glass;
      if (glassType.length > 0) {
        const existingGlass = await checkIfGlassExists(glassType);

        if (existingGlass) {
          await axios.put(`/update/${glassType}`, glass);
          setSuccessMessage("סוג זכוכית נשמר בהצלחה");
        } else {
          await axios.post("/create", glass);
          setSuccessMessage("סוג זכוכית נוצר בהצלחה");
          setGlassTypes((prevGlassTypes) => [...prevGlassTypes, glass]);
          setGlassExists(true);
        }
        setShowAddGlassModal(false);
      } else {
        setErrors({ ...errors, glassType: "סוג זכוכית חייב להיות שם" });
      }
    } catch (err) {
      console.error(
        "Error saving or fetching glass:",
        err.response?.data?.error || err.message
      );
    }
  };

  return (
    <div>
      <label htmlFor="glassType" style={{ fontWeight: "bolder" }}>
        הכנס סוג זכוכית
      </label>
      <select
        id="glassType"
        name="glassType"
        value={glass.glassType}
        onChange={handleGlassTypeChange}
        style={styles.inputField}
      >
        <option value="">בחר סוג זכוכית</option>
        {glassTypes.map((type) => (
          <option key={type.glassType} value={type.glassType}>
            {type.glassType}
          </option>
        ))}
        <option value="other">אחר (הוסף סוג זכוכית חדש)</option>
      </select>

      {errors.glassType && <p style={styles.errorText}>{errors.glassType}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      {showAddGlassModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={{ textAlign: "center" }}>
              {glassExists ? "ערוך סוג זכוכית קיים:" : "הוסף סוג זכוכית חדש:"}
            </h3>
            <label htmlFor="glassType" style={{ fontWeight: "bolder" }}>
              הכנס סוג זכוכית
            </label>
            <input
              type="text"
              name="glassType"
              id="glassType"
              placeholder="סוג זכוכית"
              value={glass.glassType}
              onChange={handleNewGlassChange}
              style={styles.inputField}
            />
            <label htmlFor="Thickness" style={{ fontWeight: "bolder" }}>
              עובי
            </label>
            <input
              type="text"
              name="Thickness"
              id="Thickness"
              placeholder="עובי"
              value={glass.Thickness}
              onChange={handleNewGlassChange}
              style={styles.inputField}
            />
            <button onClick={handleAddGlass} style={styles.button}>
              {glassExists ? "שמור סוג זכוכית" : "הוסף סוג זכוכית"}
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

export default GlassComponent;
