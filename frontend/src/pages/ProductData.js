import React from "react";
import Header from "../components/header/Header";
import Product from "../js/product/Product";
import Footer from "../components/footer/Footer";

function ProductData() {
  return (
    <div>
      {/* Header component */}
      <Header />
      {/* order component */}
      <Product />
      {/* Footer component with factory name */}
      <Footer name="הר-אל" />
    </div>
  );
}

export default ProductData;
