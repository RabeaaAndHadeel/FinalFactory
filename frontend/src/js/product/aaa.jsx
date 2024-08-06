import React, { useState } from 'react';
import axios from 'axios';
import TableProduct from './TableProduct.jsx';
import Tablefrom from './Tablefrom.jsx';
import HeaderProduct from './HeaderBid.jsx';
import DetailsProduct from './DetailsProduct.jsx';
import ClientDatails from './ClientDatails.jsx';
import DatesProduct from './DatesProduct.jsx';
import Client from './Client.jsx';
import Notes from './Notes.jsx';
import FactoryData from './FactoryData.jsx';
import './ProductData.css';

export default function ProductData() {
  const [showBid, setShowBid] = useState(false);
  const [type, setType] = useState('');
  const [profile, setProfile] = useState('');
  const [bidNumber, setBidNumber] = useState('');
  const [bidDate, setBidDate] = useState('');
  const [notes, setNotes] = useState('');
  const [item, setItem] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [list, setList] = useState([]);
  const [bid,setBid]=useState({
    type:"",
    profile:"",
    bidNumber:"",
    bidDate:"",
    notes:"",
    item:"",
    width:"",
    length:"",
    quantity:"",
    price:"",
  })
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    family: "",
    phone: "",
    email: "",
    address: ""
  });

  const handleSave = async () => {
    
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSend = () => {
    // Add your send logic here
  };

  return (
    <main className="invoice-container">
      {showBid ? (
        <div>
          <HeaderProduct handlePrint={handlePrint} handleSave={handleSave} handleSend={handleSend} />
          <ClientDatails name={formData.name} family={formData.family} address={formData.address} />
          <DatesProduct date={bidDate} num={bidNumber} />
          <DetailsProduct p={profile} t={type} />
          <TableProduct list={list} />
          <Notes notes={notes} />
          <FactoryData />
          <button onClick={() => setShowBid(false)}>עדכון</button>
        </div>
      ) : (
        <div className="form-container">
          <Client formData={formData} setFormData={setFormData} />
          <div className="form-group">
            <label htmlFor='profile'> מק"ט פרופיל:</label>
            <input 
              type="text" 
              id="profile" 
              placeholder="הכנס מקט" autoComplete="off" 
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor='type'> סוג:</label>
            <input 
              type="text" 
              id="type" 
              placeholder="הכנס סוג" autoComplete="off" 
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor='bidNumber'> מספר הצעת מחיר:</label>
            <input 
              type="number" 
              id="bidNumber" 
              placeholder="הכנס מספר הצעת מחיר" autoComplete="off" 
              value={bidNumber}
              onChange={(e) => setBidNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor='bidDate'> תאריך:</label>
            <input 
              type="date" 
              id="bidDate" 
              placeholder="הכנס תאריך" autoComplete="off" 
              value={bidDate}
              onChange={(e) => setBidDate(e.target.value)}
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
            price={price} 
            setPrice={setPrice} 
            list={list} 
            setList={setList}
          />
          <div className="form-group">
            <label htmlFor='notes'> הערות:</label>
            <input 
              type="text" 
              id="notes" 
              placeholder="הכנס הערות" autoComplete="off" 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <button onClick={() => { 
            handleSave(); 
            setShowBid(true); 
          }}>preview bid</button>
        </div>
      )}
    </main>
  );
}
