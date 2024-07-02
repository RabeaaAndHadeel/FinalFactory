// Hadeel and Rabeaa
import React from "react";
import LoginData from "./pages/LoginData";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupData from "./pages/SignupData";
import Home from "./pages/Home";
import GlassType from "./pages/GlassType";
import ProfileType from "./pages/ProfileType";
import FoamType from "./pages/FoamType";
import SupplierData from "./pages/SupplierData";
import Contactus from "./pages/Contactus";
import OrderData from "./pages/OrderData";
import CustomersData from "./pages/CustomersData";
import ProductData from "./pages/ProductData";
import Factory from "./pages/FactoryData";
import Bid from "./pages/BidData";
import Dashboard from "./pages/DashBoardData";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/login" element={<LoginData />}></Route>
        {/* Route for login page */}
        <Route path="/signup" element={<SignupData />}></Route>
        {/* Route for signup page */}
        <Route path="/" element={<Home />}></Route>
        {/* Route for home page */}
        <Route path="/glass" element={<GlassType />}></Route>
        {/* Route for GlassType page */}
        <Route path="/profile" element={<ProfileType />}></Route>
        {/* Route for Profile Type page */}
        <Route path="/foam" element={<FoamType />}></Route>
        {/* Route for foam Type page */}
        <Route path="/supplier" element={<SupplierData />}></Route>
        {/* Route for suppliers page */}
        <Route path="/order" element={<OrderData />}></Route>
        {/* Route for order page */}
        <Route path="/customer" element={<CustomersData />}></Route>
        {/* Route for customer  page */}
        <Route path="/product" element={<ProductData />}></Route>
        {/* Route for customer  page */}
        <Route path="/contactus" element={<Contactus />}></Route>
        {/* Route for  contactus page */}
        <Route path="/factory" element={<Factory />}></Route>
        {/* Route for  contactus page */}
        <Route path="/bid" element={<Bid />}></Route>
        {/* Route for  contactus page */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
