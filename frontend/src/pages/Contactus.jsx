import React from "react";
import Footer from "../components/footer/Footer.jsx";
import Data from "../jsx/Tables/Data";
import SideBar from "../components/sideBar/SideBar.jsx";
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
