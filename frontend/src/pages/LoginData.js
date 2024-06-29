import React from "react";
import Login from "../js/Login";
import Header from "../components/header/HeaderHome";
import Footer from "../components/footer/Footer";
import "../css/signup.css";
function LoginData() {
  return (
    <div>
      <div className="head">
        {" "}
        <Header />
      </div>
      <Login />
      <div className="foot">
        {" "}
        <Footer />
      </div>{" "}
    </div>
  );
}

export default LoginData;
