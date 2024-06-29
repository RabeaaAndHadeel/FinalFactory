import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Validation from "../validations/GlassValidation"; // Import the validation function
function UpdateGlass() {
  const [type] = useState(""); // State for glass type
  const [Thickness, setThickness] = useState(""); // State for thickness
  const [errors, setErrors] = useState({}); // State for validation errors
  const { glassType } = useParams(); // Getting glassType parameter from URL
  const navigate = useNavigate(); // Using useNavigate hook to navigate between routes

  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    // Validate form values
    const formValues = { glassType, Thickness };
    const validationErrors = Validation(formValues);
    setErrors(validationErrors); // Set validation errors

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      return; // Stop submission if there are errors
    }
    // Making a PUT request to update glass item
    axios
      .put("/update/" + glassType, {
        // Endpoint for updating with glassType parameter
        type,
        Thickness, // Sending updated thickness
      })
      .then((res) => {
        console.log(res); // Logging response data to console
        navigate("/glass"); // Navigating to the "glass" page after successful update
      })
      .catch((err) => console.log(err)); // Logging error to console if any
  }

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          {/* Form submission handler */}
          <h2 className="text-center">עדכון זכוכית</h2>
          <div className="mb-2">
            <label htmlFor="">סוג זכוכית:</label>
            <input
              type="text"
              placeholder="הכנס סוג זכוכית"
              className="form-control"
              value={glassType} // Displaying glass type from URL parameter
              disabled // Disabling input field (readonly)
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">עובי:</label>
            <input
              type="number"
              placeholder="הכנס עובי"
              className="form-control"
              onChange={(e) => setThickness(e.target.value)} // Handling thickness change
            />
            {errors.Thickness && (
              <span className="text-danger">{errors.Thickness}</span>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="submit" className="btn btn-success ">
              {" "}
              עדכן סוג זכוכית
            </button>{" "}
          </div>
          {/* Submit button */}
        </form>
      </div>
    </div>
  );
}

export default UpdateGlass; // Exporting the UpdateGlass component
