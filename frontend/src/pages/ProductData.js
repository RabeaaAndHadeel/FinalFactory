import React from "react";
import SideBar from "../components/sideBar/SideBar";
import Product from "../js/product/ProductData";
import Footer from "../components/footer/Footer";

function ProductData() {
  return (
    <div>
      {/* <SideBar/> */}
      {/* order component */}
      <Product />
      {/* Footer component with factory name */}
      {/* <Footer name="הר-אל" /> */}
    </div>
  );
}

export default ProductData;
