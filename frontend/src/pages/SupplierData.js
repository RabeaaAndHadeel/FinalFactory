import React from "react";
import SideBar from "../components/sideBar/SideBar";
import Supplier from "../js/Supplier";
import Footer from "../components/footer/Footer";
function SupplierData() {
  return (
    <div>
      <SideBar/>
      {/* Profile component */}
      <Supplier />
      {/* Footer component with names */}
      <Footer name="הר-אל" />
    </div>
  );
}

export default SupplierData;
