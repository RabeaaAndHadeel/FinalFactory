import React from "react";
import Dashboard from "../js/dashborad/DashBoard";
import SideBar from "../components/sideBar/SideBar";
import Footer from "../components/footer/Footer";
function DashBoardData() {
  return (
    <div>
      <SideBar />
      <Dashboard />
      <Footer />
    </div>
  );
}

export default DashBoardData;
