import React from "react";
import Header from "../components/header/Header";
import Glass from "../js/Glass/Glass";
import Footer from "../components/footer/Footer";

function GlassType() {
  return (
    <div>
      {/* Header component */}
      <Header />
      {/* Glass component */}
      <Glass />
      {/* Footer component with names */}
      <Footer name="הר-אל" />
    </div>
  );
}

export default GlassType;
