import React from "react";
import Footer from "../components/footer/Footer";
import Bid from "../js/Bid";
import SideBar from "../components/sideBar/SideBar";

function BidData() {
  return (
    <div>
      <SideBar />
      {/* Bid component */}
      <Bid />
      {/* footer component */}
      <Footer />
    </div>
  );
}

export default BidData;
