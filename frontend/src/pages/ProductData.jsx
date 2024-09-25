import React from "react";
import Product from "../js/product/ProductData";
import Footer from "../components/footer/Footer.jsx";

function ProductData() {
  return (
    <div>
      {/* product component */}
      <Product />
      {/* Footer component with factory name */}
      <Footer name="הר-אל" />
    </div>
  );
}

export default ProductData;
