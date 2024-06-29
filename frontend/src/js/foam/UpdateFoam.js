import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Validation from "../validations/FoamValidation"; // Import the validation function

function UpdateFoam() {
  const [foamType, setfoamType] = useState(""); // State for type
  const [errors, setErrors] = useState({}); // State for validation errors
  const { foamId } = useParams(); // Getting foam id parameter from URL
  const navigate = useNavigate(); // Using useNavigate hook to navigate between routes

  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    // Validate form values
    const formValues = { foamId, foamType };
    const validationErrors = Validation(formValues);
    setErrors(validationErrors); // Set validation errors

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      return; // Stop submission if there are errors
    }
    // Making a PUT request to update profile item
    axios
      .put("/updateFoam/" + foamId, {
        // Endpoint for updating with id parameter
        foamType, // type of foam
      })
      .then((res) => {
        console.log(res); // Logging response data to console
        navigate("/foam"); // Navigating to the "profile" page after successful update
      })
      .catch((err) => console.log(err)); // Logging error to console if any
  }

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          {" "}
          {/* Form submission handler */}
          <h2 className="text-center">עדכון פרזול</h2>
          <div className="mb-2">
            <label htmlFor="">מק"ט:</label>
            <input
              type="text"
              placeholder="הכנס מקט"
              className="form-control"
              value={foamId} // Displaying ID from URL parameter
              disabled // Disabling input field (readonly)
            />
            {errors.foamId && (
              <span className="text-danger">{errors.foamId}</span>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="">סוג:</label>
            <input
              type="text"
              placeholder="הכנס סוג פרזול"
              className="form-control"
              onChange={(e) => setfoamType(e.target.value)} // Handling foam type change
            />
            {errors.foamType && (
              <span className="text-danger">{errors.foamType}</span>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="btn btn-success ">עדכן סוג פרזול</button>
          </div>
          {/* Submit button */}
        </form>
      </div>
    </div>
  );
}

export default UpdateFoam; // Exporting the UpdateProfile component
