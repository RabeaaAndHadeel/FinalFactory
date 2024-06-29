import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomerValidation from "../validations/CustomerValidation"; // Import the validation function

function UpdateCustomer() {
  const [customer, setCustomer] = useState({
    name: "",
    family: "",
    address: "",
    mail: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});
  const { id } = useParams(); // Getting customer id parameter from URL
  const navigate = useNavigate(); // Using useNavigate hook to navigate between routes

  useEffect(() => {
    // Fetch customer details using id and populate the state (optional)
    axios
      .get("/getCustomer/" + id)
      .then((res) => {
        setCustomer(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate form values
    const validationErrors = CustomerValidation({ ...customer, id });
    setErrors(validationErrors); // Set validation errors

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      return; // Stop submission if there are errors
    }

    // Making a PUT request to update customer
    axios
      .put("/updateCustomer/" + id, customer)
      .then((res) => {
        console.log(res); // Logging response data to console
        navigate("/customer"); // Navigating to the "customer" page after successful update
      })
      .catch((err) => console.log(err)); // Logging error to console if any
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center">עדכון לקוח</h2>
          <div className="mb-2">
            <label>ת.ז:</label>
            <input
              type="text"
              placeholder="הכנס ת.ז"
              className="form-control"
              value={id} // Displaying ID from URL parameter
              disabled // Disabling input field (readonly)
            />
            {errors.id && <span className="text-danger">{errors.id}</span>}
          </div>
          <div className="mb-2">
            <label>שם:</label>
            <input
              type="text"
              placeholder="הכנס שם"
              className="form-control"
              name="name"
              value={customer.name}
              onChange={handleChange}
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
          <div className="mb-2">
            <label>שם משפחה:</label>
            <input
              type="text"
              placeholder="הכנס שם משפחה"
              className="form-control"
              name="family"
              value={customer.family}
              onChange={handleChange}
            />
            {errors.family && (
              <span className="text-danger">{errors.family}</span>
            )}
          </div>
          <div className="mb-2">
            <label>מספר טלפון:</label>
            <input
              type="text"
              placeholder="הכנס מספר טלפון"
              className="form-control"
              name="phoneNumber"
              value={customer.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && (
              <span className="text-danger">{errors.phoneNumber}</span>
            )}
          </div>
          <div className="mb-2">
            <label>מייל:</label>
            <input
              type="email"
              placeholder="הכנס מייל"
              className="form-control"
              name="mail"
              value={customer.mail}
              onChange={handleChange}
            />
            {errors.mail && <span className="text-danger">{errors.mail}</span>}
          </div>
          <div className="mb-2">
            <label>כתובת:</label>
            <input
              type="text"
              placeholder="הכנס כתובת"
              className="form-control"
              name="address"
              value={customer.address}
              onChange={handleChange}
            />
            {errors.address && (
              <span className="text-danger">{errors.address}</span>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="btn btn-success">עדכן לקוח</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateCustomer; // Exporting the UpdateCustomer component
