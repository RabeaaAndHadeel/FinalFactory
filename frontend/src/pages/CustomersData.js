import React from "react";
import SideBar from "../components/sideBar/SideBar";
import Customer from "../js/Customer";
import Footer from "../components/footer/Footer";
function CustomersData() {
  return (
    <div>
      <SideBar/>
      {/* customer component */}
      <Customer />
      {/* Footer component with factory name */}
      <Footer  />
    </div>
  );
}

export default CustomersData;
