import React from "react";
import SideBar from "../components/sideBar/SideBar";
import Order from "../js/Order";
import Footer from "../components/footer/Footer";
function OrderData() {
  return (
    <div>
      <SideBar/>
      {/* order component */}
      <Order />
      {/* Footer component with factory name */}
      <Footer name="הר-אל" />
    </div>
  );
}

export default OrderData;
