import React from "react";
import Header from "../components/header/Header";
import Customer from "../js/customer/Customer";
import Footer from "../components/footer/Footer";
function CustomersData() {
  return (
    <div>
      {/* Header component */}
      <Header />
      {/* customer component */}
      <Customer />
      {/* Footer component with factory name */}
      <Footer name="הר-אל" />
    </div>
  );
}

export default CustomersData;
