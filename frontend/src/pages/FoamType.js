import React from "react";
import Header from "../components/header/Header";
import Foam from "../js/foam/Foam";
import Footer from "../components/footer/Footer";

function FoamType() {
  return (
    <div>
      {/* Header component */}
      <Header />
      {/* Profile component */}
      <Foam />
      {/* Footer component with names */}
      <Footer name="הר-אל" />
    </div>
  );
}

export default FoamType;
