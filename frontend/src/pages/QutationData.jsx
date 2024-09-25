import React from "react";
import QutationData from "../jsx/BidShow/QutationData"
import Footer from "../components/footer/Footer.jsx";
import SideBar from "../components/sideBar/SideBar.jsx";

function ProductData() {
  return (
    <div>
      {/* sideBar component */}
      <SideBar />
      {/* order component */}
      <QutationData />
      {/* Footer component with factory name */}
      <Footer name="הר-אל" />
    </div>
  );
}

export default ProductData;