import React, { useState, useEffect } from "react";
import TableOrders from "./TableOrders.jsx";
import Tablefrom from "../product/Tablefrom.jsx";
import HeaderOrders from "./HeaderOrders.jsx";
import DetailsOrder from "../product/DatesProduct.jsx";
import SupplierDatails from "./SupplierDetails.jsx";
import DatesProduct from "./DatesOrders.jsx";
import Notes from "../product/Notes.jsx";
import FactoryData from "../product/FactoryData.jsx";
import "../product/ProductData.css";
import axios from "axios";
import Suppler from "./Suppler.jsx"

export default function OrdersData() {
  const [showOrder, setShowOrder] = useState(false);
  const [type, setType] = useState("");
  const [profile, setProfile] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [notes, setNotes] = useState("");
  const [item, setItem] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [quantity, setQuantity] = useState("");
  const [list, setList] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    contact: "",
    phoneNumber: "",
    email: "",
    address: ""
  });
 

  const handleSave =  () => {
    
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSend = () => {
   
  };

  return (
    <main className="invoice-container">
      {showOrder ? (
        <div>
          <HeaderOrders
            handlePrint={handlePrint}
            handleSave={handleSave}
            handleSend={handleSend}
          />
          <SupplierDatails factoryName={formData.name} address={formData.address} />
          <DatesProduct date={orderDate} num={orderNumber} />
          <DetailsOrder p={profile} t={type} />
          <TableOrders list={list} />
          <Notes notes={notes} />
          <FactoryData />
          <button onClick={() => setShowOrder(false)}> עדכון</button>
        </div>
      ) : (
        <div className="form-container">
          <Suppler 
          formData={formData}
          setFormData={setFormData} 
          />
          <div className="form-group">
            <label htmlFor="profile"> מק"ט פרופיל:</label>
            <input
              type="text"
              id="profile"
              placeholder="הכנס מקט פרופיל"
              autoComplete="off"
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="type"> סוג:</label>
            <input
              type="text"
              id="type"
              placeholder="הכנס סוג"
              autoComplete="off"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="orderNumber"> מספר הזמנה :</label>
            <input
              type="number"
              id="orderNumber"
              placeholder="הכנס מספר הזמנה"
              autoComplete="off"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="orderDate"> תאריך:</label>
            <input
              type="date"
              id="orderDate"
              placeholder="הכנס תאריך"
              autoComplete="off"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
            />
          </div>
          <Tablefrom
            item={item}
            setItem={setItem}
            length={length}
            setLength={setLength}
            width={width}
            setWidth={setWidth}
            quantity={quantity}
            setQuantity={setQuantity}
            list={list}
            setList={setList}
          />
          <div className="form-group">
            <label htmlFor="notes"> הערות:</label>
            <input
              type="text"
              id="notes"
              placeholder="הכנס הערות"
              autoComplete="off"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <button onClick={() => setShowOrder(true)}>הצג הזמנה</button>
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </main>
  );
}


