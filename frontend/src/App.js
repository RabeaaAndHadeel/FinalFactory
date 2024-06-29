// Hadeel and Rabeaa
import React from "react";
import LoginData from "./pages/LoginData";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupData from "./pages/SignupData";
import Home from "./pages/Home";
import AddGlass from "./js/Glass/AddGlass";
import UpdateGlass from "./js/Glass/UpdateGlass";
import AddProfile from "./js/Profile/AddProfile";
import UpdateProfile from "./js/Profile/UpdateProfile";
import GlassType from "./pages/GlassType";
import ProfileType from "./pages/ProfileType";
import FoamType from "./pages/FoamType";
import AddFoam from "./js/foam/AddFoam";
import UpdateFoam from "./js/foam/UpdateFoam";
import SupplierData from "./pages/SupplierData";
import AddSupplier from "./js/suppliers/AddSupplier";
import UpdateSupplier from "./js/suppliers/UpdateSupplier";
import Contactus from "./pages/Contactus";
import OrderData from "./pages/OrderData";
import AddOrder from "./js/order/AddOrder";
import UpdateOrder from "./js/order/UpdateOrder";
import CustomersData from "./pages/CustomersData";
import AddCustomer from "./js/customer/AddCustomer";
import UpdateCustomer from "./js/customer/UpdateCustomer";
import ProductData from "./pages/ProductData";
import AddProduct from "./js/product/AddProduct";
import UpdateProduct from "./js/product/UpdateProduct";
import Factory from "./pages/FactoryData";
import Bid from "./pages/BidData";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginData />}></Route>
        {/* Route for login page */}
        <Route path="/signup" element={<SignupData />}></Route>
        {/* Route for signup page */}
        <Route path="/" element={<Home />}></Route>
        {/* Route for home page */}
        <Route path="/glass" element={<GlassType />}></Route>
        {/* Route for GlassType page */}
        <Route path="/add" element={<AddGlass />}></Route>
        {/* Route for add Glass page */}
        <Route path="/update/:glassType" element={<UpdateGlass />}></Route>
        {/* Route for update Glass page */}
        <Route path="/profile" element={<ProfileType />}></Route>
        {/* Route for Profile Type page */}
        <Route path="/addProfile" element={<AddProfile />}></Route>
        {/* Route for add Profile page */}
        <Route path="/updateProfile/:id" element={<UpdateProfile />}></Route>
        {/* Route for update Profile page */}
        <Route path="/foam" element={<FoamType />}></Route>
        {/* Route for foam Type page */}
        <Route path="/addFoam" element={<AddFoam />}></Route>
        {/* Route for add foam page */}
        <Route path="/updateFoam/:foamId" element={<UpdateFoam />}></Route>
        {/* Route for update foam page */}
        <Route path="/supplier" element={<SupplierData />}></Route>
        {/* Route for suppliers page */}
        <Route path="/addSupplier" element={<AddSupplier />}></Route>
        {/* Route for add suppliers page */}
        <Route path="/updateSupplier/:id" element={<UpdateSupplier />}></Route>
        {/* Route for update suppliers page */}
        <Route path="/order" element={<OrderData />}></Route>
        {/* Route for order page */}
        <Route path="/addOrder" element={<AddOrder />}></Route>
        {/* Route for add order page */}
        <Route
          path="/updateOrder/:orderNumber"
          element={<UpdateOrder />}
        ></Route>
        {/* Route for update order page */}
        <Route path="/customer" element={<CustomersData />}></Route>
        {/* Route for customer  page */}
        <Route path="/addCustomer" element={<AddCustomer />}></Route>
        {/* Route for add customers page */}
        <Route path="/updateCustomer/:id" element={<UpdateCustomer />}></Route>
        {/* Route for update customers page */}

        <Route path="/product" element={<ProductData />}></Route>
        {/* Route for customer  page */}
        <Route path="/addProduct" element={<AddProduct />}></Route>
        {/* Route for add customers page */}
        <Route
          path="/updateProduct/:customersId"
          element={<UpdateProduct />}
        ></Route>
        {/* Route for update customers page */}
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
