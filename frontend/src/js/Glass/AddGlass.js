import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../validations/GlassValidation"; // Import the validation function

const AddGlass = () => {
  const [glass, setGlass] = useState({
    // Initializing state for form data
    glassType: "",
    thickness: "",
  });
  const [errors, setErrors] = useState({}); // State for validation errors
  const navigate = useNavigate(); // Initializing navigate function from useNavigate hook

  // Function to handle input change
  const handleChange = (e) => {
    setGlass((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Preventing default form submission
    // Validate form values
    const validationErrors = Validation(glass);
    setErrors(validationErrors); // Set validation errors

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      return; // Stop submission if there are errors
    }
    try {
      // Making POST request to server to add new glass item
      const res = await axios.post("/create", glass);
      console.log(res.data);
      navigate("/glass"); // Navigating to the "glass" page after successful addition
    } catch (err) {
      console.log(err); // Logging error to console if there is any
    }
  };

  return (
    <div className="container vh-100  d-flex justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <div className="col-md-12">
          <h2 className=" text-center ">הוספת סוג זכוכית חדש</h2>
          <form onSubmit={handleSubmit}>
            {/* Form submission handler */}
            <div className="mb-3 mt-3">
              <label className="form-label"> סוג זכוכית:</label>
              <input
                type="text"
                className="form-control"
                id="glassType"
                placeholder="הכנס סוג זכוכית"
                name="glassType"
                onChange={handleChange}
              />
              {errors.glassType && (
                <span className="form-error">{errors.glassType}</span>
              )}
            </div>

            <div className="mb-3 mt-3">
              <label className="form-label">עובי:</label>
              <input
                type="number"
                className="form-control"
                id="Thickness"
                placeholder="הכנס עובי"
                name="thickness"
                onChange={handleChange}
              />
              {errors.Thickness && (
                <span className="form-error">{errors.Thickness}</span>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              הוסף זכוכית
            </button>

            {/* Link to navigate back to the glass page */}
            <Link
              to="/glass"
              style={{
                textAlign: "center",
                display: "block",
                width: "100%",
              }}
            >
              חזור לרשימת זכוכית
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddGlass;
