import React, { useState, useEffect } from "react";
import axios from "axios";
import Validation from "../../js/validations/WindowValidation";

const WindowComponent = ({ idWindow, setIdWindow }) => {
  // State variables
  const [windowExists, setWindowExists] = useState(false);
  const [errors, setErrors] = useState({});
  const [showAddWindowModal, setShowAddWindowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [windowTypes, setWindowTypes] = useState([]);
  const [window, setWindow] = useState({
    windowId: null,
    windowType: "",
  });

  // Fetch window types when component mounts
  useEffect(() => {
    const fetchWindowTypes = async () => {
      try {
        const response = await axios.get("/windows");
        setWindowTypes(response.data);
      } catch (err) {
        console.error("Error fetching window types:", err.message);
      }
    };
    fetchWindowTypes();
  }, []);

  // Check if a window type exists
  const checkIfWindowExists = async (windowId) => {
    try {
      const response = await axios.get(`/windows/${windowId}`);
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 404) {
        return null;
      } else {
        console.error("Error checking if window exists:", err.message);
        return null;
      }
    }
  };

  // Handle change in selected window type
  const handleWindowTypeChange = async (e) => {
    const selectedWindowType = e.target.value;
    setIdWindow(selectedWindowType);
    setWindow({ ...window, windowType: selectedWindowType });
    setErrors({ ...errors, windowType: undefined });

    if (selectedWindowType) {
      if (selectedWindowType === "other") {
        // Show modal to add a new window type
        setWindow({ windowId: null, windowType: "" });
        setIdWindow("");
        setWindowExists(false);
        setSuccessMessage("");
        setShowAddWindowModal(true);
      } else {
        // Check if the selected window type exists
        const existingWindow = windowTypes.find(win => win.windowType === selectedWindowType);
        if (existingWindow) {
          setWindow(existingWindow);
          setWindowExists(true);
          setSuccessMessage("סוג חלון קיים נטען בהצלחה");
          setIdWindow(existingWindow.idWindow);
          setShowAddWindowModal(false);
        } else {
          setWindow({ windowId: null, windowType: selectedWindowType });
          setIdWindow(selectedWindowType);
          setWindowExists(false);
          setSuccessMessage("סוג חלון אינו קיים, בבקשה להוסיף אותו");
          setShowAddWindowModal(true);
        }
      }
    } else {
      setWindow({ ...window, windowType: "" });
      setShowAddWindowModal(false);
      setWindowExists(false);
      setSuccessMessage("");
    }
  };

  // Handle change in new window type input
  const handleNewWindowChange = (event) => {
    const { name, value } = event.target;
    setWindow(prevWindow => ({ ...prevWindow, [name]: value }));
  };

  // Handle adding or updating a window type
  const handleAddWindow = async () => {
    const validationErrors = Validation(window);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const { windowType, windowId } = window;
      if (windowType.length > 0) {
        if (windowExists && windowId) {
          await axios.put(`/windows/${windowId}`, window); // Update existing
          setSuccessMessage("סוג חלון נשמר בהצלחה");
        } else {
          const response = await axios.post("/windows", window); // Add new
          setSuccessMessage("סוג חלון נוצר בהצלחה");
          setWindowTypes(prevWindowTypes => [...prevWindowTypes, { ...window, windowId: response.data.windowId }]);
          setWindowExists(true);
        }
        setShowAddWindowModal(false);
      } else {
        setErrors({ ...errors, windowType: "סוג חלון חייב להיות שם" });
      }
    } catch (err) {
      console.error("Error saving or fetching window:", err.response?.data?.error || err.message);
      setErrors({ ...errors, server: "Error saving window type" });
    }
  };

  return (
    <div>
      <label htmlFor="windowType" style={{ fontWeight: "bolder" }}>
        הכנס סוג חלון
      </label>
      <select
        id="windowType"
        name="windowType"
        value={window.windowType}
        onChange={handleWindowTypeChange}
        style={styles.inputField}
      >
        <option value="">בחר סוג חלון</option>
        {windowTypes.map(type => (
          <option key={type.windowType} value={type.windowType}>
            {type.windowType}
          </option>
        ))}
        <option value="other">אחר (הוסף סוג חלון חדש)</option>
      </select>

      {errors.windowType && <p style={styles.errorText}>{errors.windowType}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      {showAddWindowModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={{ textAlign: "center" }}>
              {windowExists ? "ערוך סוג חלון קיים:" : " :הוסף סוג חלון חדש "}
            </h3>
            <label htmlFor="windowType" style={{ fontWeight: "bolder" }}>
              הכנס סוג חלון
            </label>
            <input
              type="text"
              name="windowType"
              id="windowType"
              placeholder="סוג חלון"
              value={window.windowType}
              onChange={handleNewWindowChange}
              style={styles.inputField}
            />
            <button onClick={handleAddWindow} style={styles.button}>
              {windowExists ? "שמור סוג חלון" : "הוסף סוג חלון"}
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

export default WindowComponent;
