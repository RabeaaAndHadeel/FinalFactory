import React from "react";
import Header from "../components/header/Header";
import Order from "../js/order/Order";
import Footer from "../components/footer/Footer";
function OrderData() {
  return (
    <div>
      {/* Header component */}
      <Header />
      {/* order component */}
      <Order />
      {/* Footer component with factory name */}
      <Footer name="הר-אל" />
    </div>
  );
}

export default OrderData;
