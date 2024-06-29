import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileValidation from "../validations/ProfileValidation"; // Import the validation function

const AddProfile = () => {
  const [profile, setProfile] = useState({
    id: "", // State for Id
    perimeter: "", // State for Perimeter
    weight: "", // State for Weight
  });

  const navigate = useNavigate(); // Hook for navigation
  const [errors, setErrors] = useState({}); // State for validation errors

  // Function to handle changes in form fields
  const handleChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate form values
    const validationErrors = ProfileValidation(profile);
    setErrors(validationErrors); // Set validation errors

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      return; // Stop submission if there are errors
    }

    try {
      // Sending a POST request to add new profile
      const res = await axios.post("/createProfile", profile);
      console.log(res.data); // Logging response data
      navigate("/profile"); // Redirecting to the profile page after successful addition
    } catch (err) {
      console.log(err); // Logging errors, if any exist
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <div className="col-md-12">
          <h2 className="text-center">הוספת פרופיל חדש</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 mt-3">
              <label className="form-label">מק"ט:</label>
              <input
                type="text"
                className="form-control"
                id="Id"
                placeholder="הכנס מקט"
                name="id"
                onChange={handleChange}
              />
              {errors.id && <span className="form-error">{errors.id}</span>}
            </div>

            <div className="mb-3 mt-3">
              <label className="form-label">היקף:</label>
              <input
                type="number"
                className="form-control"
                id="Perimeter"
                placeholder="הכנס היקף"
                name="perimeter"
                onChange={handleChange}
              />
              {errors.perimeter && (
                <span className="form-error">{errors.perimeter}</span>
              )}
            </div>

            <div className="mb-3 mt-3">
              <label className="form-label">משקל:</label>
              <input
                type="number"
                className="form-control"
                id="Weight"
                placeholder="הכנס משקל"
                name="weight"
                onChange={handleChange}
              />
              {errors.weight && (
                <span className="form-error">{errors.weight}</span>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              הוסף סוג פרופיל
            </button>
            <Link
              to="/profile"
              style={{
                textAlign: "center",
                display: "block",
                width: "100%",
                marginTop: "10px",
              }}
            >
              חזור לרשימת פרופילים
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProfile;
