import React from "react";
import Profile from "../js/Profile";
import Footer from "../components/footer/Footer";
import SiderBar from "../components/sideBar/SideBar";
function ProfileType() {
  return (
    <div>
      {/* SiderBar component */}
      <SiderBar />
      {/* Profile component */}
      <Profile />
      {/* Footer component with names */}
      <Footer  />
 
    </div>
  );
}

export default ProfileType;
