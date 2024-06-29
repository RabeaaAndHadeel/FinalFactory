import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Validation from "../validations/SuppliersValidation"; // Import the validation function
function UpdateSupplier() {
  const [type] = useState(""); // State for glass type (not used)
  const [name, setName] = useState(""); // State for name
  const [address, setAddress] = useState(""); // State for address
  const [contact, setContact] = useState(""); // State for contact
  const [mail, setMail] = useState(""); // State for mail
  const [phone, setPhone] = useState(""); // State for phone number
  const [errors, setErrors] = useState({}); // State for validation errors
  const { id } = useParams(); // Getting supplier id parameter from URL
  const navigate = useNavigate(); // Using useNavigate hook to navigate between routes

  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    // // Validate form values
    const formValues = { name, id, address, contact, mail, phone };
    const validationErrors = Validation(formValues);
    setErrors(validationErrors); // Set validation errors

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      return; // Stop submission if there are errors
    }
    // Making a PUT request to update supplier
    axios
      .put("/updateSupplier/" + id, {
        // Endpoint for updating with id parameter
        name, // Not used
        address, // Sending updated address
        contact, // Sending updated contact
        mail, // Sending updated mail
        phone, // Sending updated phone
      })
      .then((res) => {
        console.log(res); // Logging response data to console
        navigate("/supplier"); // Navigating to the "supplier" page after successful update
      })
      .catch((err) => console.log(err)); // Logging error to console if any
  }

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          {" "}
          {/* Form submission handler */}
          <h2 className="text-center">עדכון ספק</h2>
          <div className="mb-2">
            <label htmlFor=""> ת.ז:</label>
            <input
              type="number"
              placeholder="הכנס ת.ז"
              className="form-control"
              value={id} // Displaying ID from URL parameter
              disabled // Disabling input field (readonly)
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">שם מפעל:</label>
            <input
              type="text"
              placeholder="הכנס שם מפעל"
              className="form-control"
              onChange={(e) => setName(e.target.value)} // Handling  factory name change
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
          <div className="mb-2">
            <label htmlFor="">כתובת:</label>
            <input
              type="text"
              placeholder="הכנס כתובת"
              className="form-control"
              onChange={(e) => setAddress(e.target.value)} // Handling address change
            />
            {errors.address && (
              <span className="text-danger">{errors.address}</span>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="">איש קשר:</label>
            <input
              type="text"
              placeholder="הכנס שם מנהל"
              className="form-control"
              onChange={(e) => setContact(e.target.value)} // Handling contact change
            />
            {errors.contact && (
              <span className="text-danger">{errors.contact}</span>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="">מייל:</label>
            <input
              type="email"
              placeholder="הכנס מייל"
              className="form-control"
              onChange={(e) => setMail(e.target.value)} // Handling mail change
            />
            {errors.mail && <span className="text-danger">{errors.mail}</span>}
          </div>
          <div className="mb-2">
            <label htmlFor="">מספר טלפון:</label>
            <input
              type="number"
              placeholder="הכנס מספר טלפון"
              className="form-control"
              onChange={(e) => setPhone(e.target.value)} // Handling phone change
            />
            {errors.phone && (
              <span className="text-danger">{errors.phone}</span>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="btn btn-success ">עדכן ספק</button>
          </div>
          {/* Submit button */}
        </form>
      </div>
    </div>
  );
}

export default UpdateSupplier; // Exporting the Updatesupplier component
