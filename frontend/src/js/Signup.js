//Hadeel and Rabeaa
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; //modules from react-router-dom library
import Validation from "./validations/SignupValidation";
import axios from "axios"; //axios for making HTTP requests
import "../css/signup.css";
function Signup() {
  // Define state variables using useState
  const [values, setValues] = useState({
    id: "",
    name: "",
    password: "",
  });
  // Initializing navigate function for navigation
  const navigate = useNavigate();
  // Define state variable to store validation errors
  const [errors, setErrors] = useState({});
  // Function to handle input changes
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };
  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (
      errors.name === "" &&
      errors.id === "" &&
      errors.name === "" &&
      errors.password === ""
    ) {
      // Check if there are no validation errors
      axios
        .post("/signup", values) // Make a POST request to the signup endpoint
        .then((res) => {
          navigate("/login"); //if the signup was successful redirect to login page
        })
        .catch((err) => console.log(err)); // Log any errors that occur during the request
    }
  };
  return (
    <div className="form-container">
      <div className="form-box">
        <h2 className="form-title">הרשמה</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb">
            <label htmlFor="id" className="form-label">
              <strong> :ת.ז או ח.פ </strong>
            </label>
            <input
              type="number"
              placeholder="הכנס ת.ז או ח.פ"
              name="id"
              onChange={handleInput}
              className="form-control "
            />
            {errors.id && <span className="form-error">{errors.id}</span>}
          </div>
          <div className="mb">
            <label htmlFor="name" className="form-label">
              <strong> :שם מפעל </strong>
            </label>
            <input
              type="text"
              name="name"
              onChange={handleInput}
              placeholder=" הכנס שם מפעל"
              className="form-control"
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>
          <div className="mb">
            <label htmlFor="password" className="form-label">
              <strong> :סיסמה </strong>
            </label>
            <input
              type="password"
              placeholder="הכנס סיסמה"
              name="password"
              onChange={handleInput}
              className="form-control"
            />
            {errors.password && (
              <span className="form-error">{errors.password}</span>
            )}
          </div>
          <button type="submit" className="form-button">
            <strong>הרשמה</strong>
          </button>
          <h5 className="rg">תיכנס אם אתה מסכים על כל החוקים</h5>
          <Link to="/login" className="form-button">
            <strong>כניסה</strong>
          </Link>
        </form>
      </div>
    </div>
  );
}
export default Signup;
