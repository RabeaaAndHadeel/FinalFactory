import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../validations/OrderValidation"; // Import the validation function
const AddOrder = () => {
  const [order, setOrder] = useState({
    orderNumber: "", // State for order number
    type: "", // State for type
    count: "", // State for amount
  });

  const navigate = useNavigate(); // Hook for navigation
  const [errors, setErrors] = useState({}); // State for validation errors

  // Function to handle changes in form fields
  const handleChange = (e) => {
    setOrder((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Validate form values
    const validationErrors = Validation(order);
    setErrors(validationErrors); // Set validation errors

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      return; // Stop submission if there are errors
    }
    try {
      // Sending a POST request to add new order
      const res = await axios.post("/createOrder", order);
      console.log(res.data); // Logging response data
      navigate("/order"); // Redirecting to the oredr page after successful addition
    } catch (err) {
      console.log(err); // Logging errors, if any exist
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <div className="col-md-12">
          <h2 className="text-center">הוספת הזמנה חדשה</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 mt-3">
              <label className="form-label">מספר הזמנה:</label>
              <input
                type="number"
                className="form-control"
                id="OrderNumber"
                placeholder="הכנס מספר הזמנה"
                name="orderNumber"
                onChange={handleChange}
              />
              {errors.orderNumber && (
                <span className="form-error">{errors.orderNumber}</span>
              )}
            </div>

            <div className="mb-3 mt-3">
              <label className="form-label">סוג המוצר:</label>
              <input
                type="text"
                className="form-control"
                id="Type"
                placeholder="הכנס סוג מוצר"
                name="type"
                onChange={handleChange}
              />
              {errors.type && <span className="form-error">{errors.type}</span>}
            </div>

            <div className="mb-3 mt-3">
              <label className="form-label">כמות:</label>
              <input
                type="number"
                className="form-control"
                id="Count"
                placeholder="הכנס כמות"
                name="count"
                onChange={handleChange}
              />
              {errors.count && (
                <span className="form-error">{errors.count}</span>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              הוסף הזמנה
            </button>
            <Link
              to="/order"
              style={{
                textAlign: "center",
                display: "block",
                width: "100%",
              }}
            >
              חזור לרשימת הזמנות
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddOrder;
