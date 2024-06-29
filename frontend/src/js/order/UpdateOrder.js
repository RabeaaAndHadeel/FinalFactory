import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Validation from "../validations/OrderValidation"; // Import the validation function
function UpdateOrder() {
  const [number] = useState(""); // State for glass type
  const [type, setType] = useState(""); // State for type
  const [count, setCount] = useState(""); // State for amount op products in the order
  const { orderNumber } = useParams(); // Getting ordernumber parameter from URL
  const [errors, setErrors] = useState({}); // State for validation errors

  const navigate = useNavigate(); // Using useNavigate hook to navigate between routes

  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    // Validate form values
    const formValues = { orderNumber, type, count };
    const validationErrors = Validation(formValues);
    setErrors(validationErrors); // Set validation errors

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      return; // Stop submission if there are errors
    }
    // Making a PUT request to update profile item
    axios
      .put("/updateOrder/" + orderNumber, {
        // Endpoint for updating with id parameter
        number,
        type, // Sending updated type
        count, // Sending updated count
      })
      .then((res) => {
        console.log(res); // Logging response data to console
        navigate("/order"); // Navigating to the "order" page after successful update
      })
      .catch((err) => console.log(err)); // Logging error to console if any
  }

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          {" "}
          {/* Form submission handler */}
          <h2 className="text-center">עדכון הזמנה</h2>
          <div className="mb-2">
            <label htmlFor="">מספר הזמנה:</label>
            <input
              type="number"
              placeholder="הכנס מספר הזמנה"
              className="form-control"
              value={orderNumber} // Displaying ID from URL parameter
              disabled // Disabling input field (readonly)
            />
            {errors.orderNumber && (
              <span className="text-danger">{errors.orderNumber}</span>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="">סוג מוצר:</label>
            <input
              type="text"
              placeholder="הכנס סוג מוצר"
              className="form-control"
              onChange={(e) => setType(e.target.value)} // Handling type change
            />
            {errors.type && <span className="text-danger">{errors.type}</span>}
          </div>
          <div className="mb-2">
            <label htmlFor="">כמות:</label>
            <input
              type="number"
              placeholder="הכנס כמות"
              className="form-control"
              onChange={(e) => setCount(e.target.value)} // Handling count change
            />
            {errors.count && (
              <span className="text-danger">{errors.count}</span>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="btn btn-success ">עדכן הזמנה </button>
          </div>
          {/* Submit button */}
        </form>
      </div>
    </div>
  );
}

export default UpdateOrder; // Exporting the UpdateOrder component
