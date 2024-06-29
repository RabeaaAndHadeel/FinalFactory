import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Validation from "../validations/ProfileValidation"; // Import the validation function

function UpdateProfile() {
  const [perimeter, setPerimeter] = useState(""); // State for perimeter
  const [weight, setWeight] = useState(""); // State for weight
  const [errors, setErrors] = useState({}); // State for validation errors
  const { id } = useParams(); // Getting id parameter from URL
  const navigate = useNavigate(); // Using useNavigate hook to navigate between routes

  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    // Validate form values
    const formValues = { id, perimeter, weight };
    const validationErrors = Validation(formValues);
    setErrors(validationErrors); // Set validation errors

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      return; // Stop submission if there are errors
    }

    // Making a PUT request to update profile item
    axios
      .put("/updateProfile/" + id, {
        perimeter, // Sending updated perimeter
        weight, // Sending updated weight
      })
      .then((res) => {
        console.log(res); // Logging response data to console
        navigate("/profile"); // Navigating to the "profile" page after successful update
      })
      .catch((err) => console.log(err)); // Logging error to console if any
  }

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center">עדכון פרופיל</h2>
          <div className="mb-2">
            <label htmlFor="id">מק"ט:</label>
            <input
              type="text"
              id="id"
              placeholder="הכנס מקט"
              className="form-control"
              value={id} // Displaying ID from URL parameter
              disabled // Disabling input field (readonly)
            />
            {errors.id && <span className="text-danger">{errors.id}</span>}
          </div>
          <div className="mb-2">
            <label htmlFor="perimeter">היקף:</label>
            <input
              type="number"
              id="perimeter"
              placeholder="הכנס היקף"
              className="form-control"
              value={perimeter}
              onChange={(e) => setPerimeter(e.target.value)} // Handling perimeter change
            />
            {errors.perimeter && (
              <span className="text-danger">{errors.perimeter}</span>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="weight">משקל:</label>
            <input
              type="number"
              id="weight"
              placeholder="הכנס משקל"
              className="form-control"
              value={weight}
              onChange={(e) => setWeight(e.target.value)} // Handling weight change
            />
            {errors.weight && (
              <span className="text-danger">{errors.weight}</span>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="submit" className="btn btn-success">
              עדכן סוג פרופיל
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile; // Exporting the UpdateProfile component
