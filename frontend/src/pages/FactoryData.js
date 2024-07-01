import React from "react";
import SideBar from "../components/sideBar/SideBar";
import Factory from '../js/Factory';
import Footer from "../components/footer/Footer";
function FactoryData(){
  return (
    <div   >
      <SideBar/>
      <Factory />
      <Footer/>
    </div>
  );
}
export default FactoryData;