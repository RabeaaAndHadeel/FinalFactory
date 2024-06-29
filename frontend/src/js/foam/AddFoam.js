import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validation from "../validations/FoamValidation"; // Import the validation function
const AddFoam = () => {
  const [foam, setFoam] = useState({
    foamId: "", // State for Id
    foamType: "", // State for foam type
  });

  const navigate = useNavigate(); // Hook for navigation
  const [errors, setErrors] = useState({}); // State for validation errors

  // Function to handle changes in form fields
  const handleChange = (e) => {
    setFoam((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Validate form values
    const validationErrors = validation(foam);
    setErrors(validationErrors); // Set validation errors

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      return; // Stop submission if there are errors
    }
    try {
      // Sending a POST request to add new foam
      const res = await axios.post("/createFoam", foam);
      console.log(res.data); // Logging response data
      navigate("/foam"); // Redirecting to the profile page after successful addition
    } catch (err) {
      console.log(err); // Logging errors, if any exist
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <div className="col-md-12">
          <h2 className="text-center">הוספת סוג פרזול חדש</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 mt-3">
              <label className="form-label">מק"ט:</label>
              <input
                type="text"
                className="form-control"
                id="Id"
                placeholder="הכנס מקט"
                name="foamId"
                onChange={handleChange}
              />
              {errors.foamId && (
                <span className="form-error">{errors.foamId}</span>
              )}
            </div>

            <div className="mb-3 mt-3">
              <label className="form-label">סוג:</label>
              <input
                type="text"
                className="form-control"
                id="foamType"
                placeholder="הכנס סוג"
                name="foamType"
                onChange={handleChange}
              />
              {errors.foamType && (
                <span className="form-error">{errors.foamType}</span>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              הוסף סוג פרזול
            </button>
            <Link
              to="/foam"
              style={{
                textAlign: "center",
                display: "block",
                width: "100%",
              }}
            >
              חזור לרשימת פרזול
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFoam;
