import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomerValidation from "../validations/CustomerValidation"; // Import the validation function

const AddCustomer = () => {
  const [customer, setCustomer] = useState({
    id: "",
    name: "",
    family: "",
    phoneNumber: "",
    mail: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const validationErrors = CustomerValidation(customer);
    setErrors(validationErrors); // Set validation errors

    if (Object.keys(validationErrors).length > 0) {
      return; // Stop submission if there are errors
    }

    try {
      const res = await axios.post("/createCustomer", customer);
      console.log(res.data); // Logging response data
      navigate("/customer"); // Redirecting to the customers page after successful addition
    } catch (err) {
      console.log(err); // Logging errors, if any exist
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <div className="col-md-12">
          <h2 className="text-center">הוספת לקוח חדש</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 mt-3">
              <label className="form-label">ת.ז:</label>
              <input
                type="text"
                className="form-control"
                id="Id"
                placeholder="הכנס ת.ז"
                name="id"
                onChange={handleChange}
              />
              {errors.id && (
                <span className="form-error text-danger">{errors.id}</span>
              )}
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">שם:</label>
              <input
                type="text"
                className="form-control"
                id="Name"
                placeholder="הכנס שם"
                name="name"
                onChange={handleChange}
              />
              {errors.name && (
                <span className="form-error text-danger">{errors.name}</span>
              )}
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">שם משפחה:</label>
              <input
                type="text"
                className="form-control"
                id="Family"
                placeholder="הכנס שם משפחה"
                name="family"
                onChange={handleChange}
              />
              {errors.family && (
                <span className="form-error text-danger">{errors.family}</span>
              )}
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">מספר טלפון:</label>
              <input
                type="text"
                className="form-control"
                id="PhoneNumber"
                placeholder="הכנס מספר טלפון"
                name="phoneNumber"
                onChange={handleChange}
              />
              {errors.phoneNumber && (
                <span className="form-error text-danger">
                  {errors.phoneNumber}
                </span>
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
              {errors.mail && (
                <span className="form-error text-danger">{errors.mail}</span>
              )}
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
                <span className="form-error text-danger">{errors.address}</span>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              הוסף לקוח חדש
            </button>
            <Link
              to="/customer"
              style={{
                textAlign: "center",
                display: "block",
                width: "100%",
                marginTop: "10px",
              }}
            >
              חזור לרשימת לקוחות
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
