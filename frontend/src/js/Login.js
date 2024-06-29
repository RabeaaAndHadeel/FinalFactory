// Hadeel and Rabeaa
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./validations/LoginValidation";
import axios from "axios"; // Importing axios for making HTTP requests
import "../css/signup.css";
function Login() {
  //  Define state variables using useState
  const [values, setValues] = useState({
    id: "",
    password: "",
  });
  // Initializing navigate function for navigation
  const navigate = useNavigate();

  // State for storing validation errors
  const [errors, setErrors] = useState({});
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };
  //form submission handle
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(values));
    if (errors.id === "" && errors.password === "") {
      axios
        .post("/login", values)
        .then((res) => {
          console.log(res);
          if (res.data === "success") {
            //if login was successful redirect to home page
            navigate("/home");
          } else {
            alert("no such  user exists!");
          }
        })
        .catch((err) => console.log(err)); //if there was an error
    }
  };
  return (
    <div className="form-container">
      <div className="form-box">
        <h2 className="form-title">כניסה</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb">
            <label htmlFor="id" className="form-label" dir="ltr">
              <strong>:ת.ז או ח.פ</strong>
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
            <label htmlFor="password"  className="form-label" >
              <strong>:סיסמה</strong>
            </label>
            <input
              dir="ltr"
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
            <strong>כניסה</strong>
          </button>
          <h5 className="rg">תיכנס אם אתה מסכים על כל החוקים</h5>
          {/* Link to registration page */}
          <Link to="/signup" className="form-button">
              <strong>הרשמה</strong> 
          </Link>
        </form>
      </div>
    </div>
  );
}
export default Login;
