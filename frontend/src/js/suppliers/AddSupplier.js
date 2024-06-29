import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../validations/SuppliersValidation"; // Import the validation function
const AddSupplier = () => {
  const [supplier, setSupplier] = useState({
    name: "", //state for factory name
    id: "", // State for Id
    address: "", //state for address
    contact: "", // State for contact
    mail: "", // State for mail
    phone: "", //state for phone
  });

  const navigate = useNavigate(); // Hook for navigation
  const [errors, setErrors] = useState({}); // State for validation errors
  // Function to handle changes in form fields
  const handleChange = (e) => {
    setSupplier((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // // Validate form values
    const validationErrors = Validation(supplier);
    setErrors(validationErrors); // Set validation errors

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      return; // Stop submission if there are errors
    }
    try {
      // Sending a POST request to add new supplier
      const res = await axios.post("/createSupplier", supplier);
      console.log(res.data); // Logging response data
      navigate("/supplier"); // Redirecting to the supplier page after successful addition
    } catch (err) {
      console.log(err); // Logging errors, if any exist
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <div className="col-md-12">
          <h2 className="text-center">הוספת ספק חדש</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 mt-3">
              <label className="form-label">שם מפעל:</label>
              <input
                type="text"
                className="form-control"
                id="Name"
                placeholder="הכנס שם מפעל"
                name="name"
                onChange={handleChange}
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div className="mb-3 mt-3">
              <label className="form-label">ת.ז:</label>
              <input
                type="number"
                className="form-control"
                id="Id"
                placeholder="הכנס ת.ז"
                name="id"
                onChange={handleChange}
              />
              {errors.id && <span className="form-error">{errors.id}</span>}
            </div>

            <div className="mb-3 mt-3">
              <label className="form-label">כתובת:</label>
              <input
                type="text"
                className="form-control"
                id="Address"
                placeholder="הכנס כתובת"
                name="address"
                onChange={handleChange}
              />
              {errors.address && (
                <span className="form-error">{errors.address}</span>
              )}
            </div>

            <div className="mb-3 mt-3">
              <label className="form-label">איש קשר:</label>
              <input
                type="text"
                className="form-control"
                id="Contact"
                placeholder="הכנס איש קשר"
                name="contact"
                onChange={handleChange}
              />
              {errors.contact && (
                <span className="form-error">{errors.contact}</span>
              )}
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">מייל:</label>
              <input
                type="email"
                className="form-control"
                id="Mail"
                placeholder="הכנס מייל"
                name="mail"
                onChange={handleChange}
              />
              {errors.mail && <span className="form-error">{errors.mail}</span>}
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">מספר טלפון:</label>
              <input
                type="number"
                className="form-control"
                id="Phone"
                placeholder="הכנס מספר טלפון"
                name="phone"
                onChange={handleChange}
              />
              {errors.phone && (
                <span className="form-error">{errors.phone}</span>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              הוסף ספק חדש
            </button>
            <Link
              to="/supplier"
              style={{
                textAlign: "center",
                display: "block",
                width: "100%",
              }}
            >
              חזור לרשימת ספקים
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSupplier;
