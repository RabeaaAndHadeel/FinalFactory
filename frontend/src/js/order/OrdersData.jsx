
import React, { useState, useEffect } from 'react'; 
import TableOrders from './TableOrders.jsx';
import Tablefrom from '../product/Tablefrom.jsx';
import HeaderOrders from './HeaderOrders.jsx';
import DetailsOrder from '../product/DatesProduct.jsx';
import SupplierDatails from './SupplierDetails.jsx';
import DatesProduct from './DatesOrders.jsx';
import Notes from '../product/Notes.jsx';
import FactoryData from '../product/FactoryData.jsx';
import '../product/ProductData.css';
import axios from 'axios';

export default function OrdersData() {
  const [showOrder,setShowOrder]=useState(false);
  const [type,setType]= useState('');
  const [profile,setProfile]= useState('');
  const [orderNumber,setOrderNumber]= useState('');
  const [orderDate,setOrderDate]= useState('');
  const [notes,setNotes]= useState('');
  const [item ,setItem]=useState('');
  const [lenght ,setLenght]=useState('');
  const [width ,setWidth]=useState('');
  const [quantity ,setQuantity]=useState('');
  const [list ,setList]=useState([]);
  const [{id,setId,name,setName,contact,setContact,address,setAddress,phone,setPhone,email,setEmail}] = useState({
    id: "",
    name: "",
    contact: "",
    phoneNumber: "",
    email: "",
    address: ""
  });


  const handleSave = () => {
   
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
          <HeaderOrders handlePrint={handlePrint} handleSave={handleSave} handleSend={handleSend}/>
          <SupplierDatails factoryName={name}  address={address}/>
          <DatesProduct date={orderDate} num={orderNumber}/>
          <DetailsOrder p={profile} t={type}/>
          <TableOrders list={list} />
          <Notes notes={notes}/>
          <FactoryData/>
          <button onClick={() => setShowOrder(false)}> עדכון</button>
        </div>
      ) : (
        <div className="form-container">
          <div className="form-group">
            <label htmlFor='id'>  ח.פ  :</label>
            <input 
              type="text" 
              name="text" 
              id="id" 
              placeholder="הכנס ח.פ" autoComplete="off" 
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          {/* Fields for customer details */}
          <div className="form-group">
            <label htmlFor='name'>  שם מפעל: </label>
            <input 
              type="text" 
              name="text" 
              id="name" 
              placeholder="הכנס שם מפעל" autoComplete="off" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor='contact'>   איש קשר:</label>
            <input 
              type="text" 
              name="text" 
              id="contact" 
              placeholder="הכנס שם איש קשר" autoComplete="off" 
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor='address'>  כתובת:</label>
            <input 
              type="text" 
              name="text" 
              id="address" 
              placeholder="הכנס כתובת" autoComplete="off" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor='phone'>  מספר טלפון:</label>
            <input 
              type="text" 
              name="text" 
              id="phone" 
              placeholder="הכנס מספר טלפון" autoComplete="off" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor='email'>  מייל:</label>
            <input 
              type="text" 
              name="text" 
              id="email" 
              placeholder="הכנס מייל" autoComplete="off" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor='profile'>  מק"ט פרופיל:</label>
            <input 
              type="text" 
              name="text" 
              id="profile" 
              placeholder="הכנס מקט פרופיל" autoComplete="off" 
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor='type'>  סוג:</label>
            <input 
              type="text" 
              name="text" 
              id="type" 
              placeholder="הכנס סוג" autoComplete="off" 
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor='orderNumber'>  מספר הזמנה :</label>
            <input 
              type="number" 
              name="number" 
              id="orderNumber" 
              placeholder="הכנס מספר הזמנה" autoComplete="off" 
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor='orderDate'>  תאריך:</label>
            <input 
              type="date" 
              name="date" 
              id="orderDateהכנס תאריך" autoComplete="off" 
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
            />
          </div>
          <Tablefrom item={item} setItem={setItem} lenght={lenght} setLenght={setLenght} width={width} setWidth={setWidth} quantity={quantity} setQuantity={setQuantity}  list={list} setList={setList}/>
          <div className="form-group">
            <label htmlFor='notes'>  הערות:</label>
            <input 
              type="text" 
              name="text" 
              id="notes" 
              placeholder="הכנס הערות" autoComplete="off" 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <button onClick={() => setShowOrder(true)}>הצג הזמנה</button>
        </div>
      )}
    </main>
  );
}
