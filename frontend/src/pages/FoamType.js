import React from "react";
import SideBar from "../components/sideBar/SideBar";
import Foam from "../js/Foam";
import Footer from "../components/footer/Footer";

function FoamType() {
  return (
    <div>
      <SideBar/>
      {/* Profile component */}
      <Foam />
      {/* Footer component with names */}
      <Footer name="הר-אל" />
    </div>
  );
}

export default FoamType;
