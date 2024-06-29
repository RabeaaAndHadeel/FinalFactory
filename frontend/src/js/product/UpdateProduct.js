import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Validation from "../validations/ProductValidation"; // Import the validation function
function UpdateProduct() {
  const [type, setType] = useState(""); // State for product type
  const [profileType, setProfileType] = useState(""); // State for profile type
  const [Remarks, setRemarks] = useState(""); // State for remarks
  const [width, setWidth] = useState(""); // State for width
  const [length, setLength] = useState(""); // State for length
  const [count, setCount] = useState(""); // State for count
  const [price, setPrice] = useState(""); // State for price
  const [date, setDate] = useState(""); // State for date
  const [errors, setErrors] = useState({});
  const { customersId } = useParams(); // Getting id parameter from URL
  const navigate = useNavigate(); // Using useNavigate hook to navigate between routes

  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    // Validate form values
    const formValues = {
      type,
      profileType,
      Remarks,
      width,
      length,
      count,
      price,
      date,
    };
    const validationErrors = Validation(formValues);
    setErrors(validationErrors); // Set validation errors

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      return; // Stop submission if there are errors
    }
    // Making a PUT request to update product item
    axios
      .put("/updateProduct/" + customersId, {
        // Endpoint for updating with id parameter
        type, //Sending updated type
        profileType, //Sending updated  profile type
        Remarks, //Sending updated remarks
        width, //Sending updated width
        length, // Sending updated length
        count, // Sending updated count
        price, // Sending updated price
        date, //sending updated date
      })
      .then((res) => {
        console.log(res); // Logging response data to console
        navigate("/product"); // Navigating to the "product" page after successful update
      })
      .catch((err) => console.log(err)); // Logging error to console if any
  }

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          {" "}
          {/* Form submission handler */}
          <h2 className="text-center">עדכון מוצר</h2>
          <div className="mb-2">
            <label htmlFor="">ת.ז לקוח:</label>
            <input
              type="number"
              placeholder="הכנס מקט"
              className="form-control"
              value={customersId} // Displaying ID from URL parameter
              disabled // Disabling input field (readonly)
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">סוג מוצר:</label>
            <input
              type="text"
              placeholder="הכנס סוג מוצר"
              className="form-control"
              onChange={(e) => setType(e.target.value)} // Handling type change
            />
            {errors.type && <span className="form-error">{errors.type}</span>}
          </div>
          <div className="mb-2">
            <label htmlFor="">סוג פרופיל:</label>
            <input
              type="text"
              placeholder="הכנס סוג פרופיל"
              className="form-control"
              onChange={(e) => setProfileType(e.target.value)} // Handling [Profile type] change
            />
            {errors.profileType && (
              <span className="form-error">{errors.profileType}</span>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor=""> הערות:</label>
            <input
              type="text"
              placeholder="הכנס הערות"
              className="form-control"
              onChange={(e) => setRemarks(e.target.value)} // Handling [REMARKS] change
            />
            {errors.Remarks && (
              <span className="form-error">{errors.Remarks}</span>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor=""> רוחב:</label>
            <input
              type="number"
              placeholder="הכנס רוחב"
              className="form-control"
              onChange={(e) => setWidth(e.target.value)} // Handling [Width] change
            />
            {errors.width && <span className="form-error">{errors.width}</span>}
          </div>
          <div className="mb-2">
            <label htmlFor=""> אורך:</label>
            <input
              type="number"
              placeholder="הכנס אורך"
              className="form-control"
              onChange={(e) => setLength(e.target.value)} // Handling [Length] change
            />
            {errors.length && (
              <span className="form-error">{errors.length}</span>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor=""> כמות:</label>
            <input
              type="number"
              placeholder="הכנס כמות"
              className="form-control"
              onChange={(e) => setCount(e.target.value)} // Handling [Count] change
            />
            {errors.count && <span className="form-error">{errors.count}</span>}
          </div>
          <div className="mb-2">
            <label htmlFor=""> מחיר:</label>
            <input
              type="number"
              placeholder="הכנס מחיר"
              className="form-control"
              onChange={(e) => setPrice(e.target.value)} // Handling [Count] change
            />
            {errors.price && <span className="form-error">{errors.price}</span>}
          </div>
          <div className="mb-2">
            <label htmlFor=""> תאריך:</label>
            <input
              type="date"
              placeholder="הכנס תאריך"
              className="form-control"
              onChange={(e) => setDate(e.target.value.split("T")[0])} // Handling [Date] change
            />
            {errors.date && <span className="form-error">{errors.date}</span>}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="btn btn-success ">עדכן סוג מוצר</button>
          </div>
          {/* Submit button */}
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct; // Exporting the UpdateProduct component
