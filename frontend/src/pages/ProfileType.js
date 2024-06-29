import React from "react";
import Header from "../components/header/Header";
import Profile from "../js/Profile/Profile";
import Footer from "../components/footer/Footer";
import SearchBar from "../js/searchBar/SearchBar";

function ProfileType() {
  return (
    <div>
      {/* Header component */}
      <Header />
      {/* Profile component */}
      <Profile />
      {/* Footer component with names */}
      <Footer name="הר-אל" />
    </div>
  );
}

export default ProfileType;
