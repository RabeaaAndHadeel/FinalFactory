import React from "react";
import Footer from "../components/footer/Footer";
import Data from "../js/Data";
import SideBar from "../components/sideBar/SideBar";


function Contactus() {
  return (
    <div>
      <SideBar/>
      {/* Data component */}
      <Data />
      {/* footer component */}
      <Footer />
    </div>
  );
}

export default Contactus;
