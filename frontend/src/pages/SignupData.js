import React from "react";
import Signup from "../js/Signup";
import Header from "../components/header/HeaderHome";
import Footer from "../components/footer/Footer";
import "../css/signup.css";
function SignupData() {
  return (
    <div>
      <div className="head">
        {" "}
        <Header />
      </div>
      <Signup />
      <div className="foot">
        {" "}
        <Footer  />
      </div>
    </div>
  );
}

export default SignupData;
