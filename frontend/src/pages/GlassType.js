import React from "react";
import SideBar from "../components/sideBar/SideBar";
import Glass from "../js/Glass";
import Footer from "../components/footer/Footer";

function GlassType() {
  return (
    <div>
      {/* SideBar component */}
      <SideBar />
      {/* Glass component */}
      <Glass />
      {/* Footer component with names */}
      <Footer />
    </div>
  );
}

export default GlassType;
