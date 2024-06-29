import React from "react";
import Header from "../components/header/Header";
import Supplier from "../js/suppliers/Supplier";
import Footer from "../components/footer/Footer";
function SupplierData() {
  return (
    <div>
      {/* Header component */}
      <Header />
      {/* Profile component */}
      <Supplier />
      {/* Footer component with names */}
      <Footer name="הר-אל" />
    </div>
  );
}

export default SupplierData;
