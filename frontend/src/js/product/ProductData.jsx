import React, { useEffect, useState } from 'react';
import axios from "axios";
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
import Profile1 from './Profile1.jsx';

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
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    family: "",
    phone: "",
    email: "",
    address: ""
  });
  const [errors, setErrors] = useState({}); // הוספת מצב לאחסון הודעות שגיאה
  const [errorMessage,setErrorMessage] = useState('')
  const isFormValid = () => {
    const newErrors = {};

    if (profile === '') newErrors.profile = 'מק"ט פרופיל נדרש';
    if (type === '') newErrors.type = 'סוג נדרש';
    if (bidNumber === '') newErrors.bidNumber = 'מספר הצעת מחיר נדרש';
    if (bidDate === '') newErrors.bidDate = 'תאריך נדרש';
    if (formData.name === '') newErrors.name = 'שם נדרש';
    if (formData.family === '') newErrors.family = 'שם משפחה נדרש';
    if (formData.phone === '') newErrors.phone = 'טלפון נדרש';
    if (formData.email === '') newErrors.email = 'אימייל נדרש';
    if (formData.address === '') newErrors.address = 'כתובת נדרשת';
    if (list.length === 0) newErrors.list = 'לפחות פריט אחד נדרש ברשימה';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSend = () => {
    // פעולה לשליחת הצעת מחיר
  };

  useEffect(() => {
    // אם יש שגיאות, התמקדות בשדה הראשון עם שגיאה
    const firstErrorField = Object.keys(errors)[0];
    if (firstErrorField) {
      document.getElementById(firstErrorField)?.focus();
    }
  }, [errors]);

  return (
    <main className="invoice-container">
      {showBid ? (
        <div>
          <HeaderProduct
            handlePrint={handlePrint}
            handleSave={handleSave}
            handleSend={handleSend}
          />
          <ClientDatails
            name={formData.name}
            family={formData.family}
            address={formData.address}
          />
          <DatesProduct date={bidDate} num={bidNumber} />
          <DetailsProduct p={profile} t={type} />
          <TableProduct list={list} handleSave={handleSave} />
          <Notes notes={notes} />
          <FactoryData />
          <button onClick={() => setShowBid(false)}>עדכון</button>
        </div>
      ) : (
        <div className="form-container">
          <Client
            formData={formData}
            setFormData={setFormData}
            handleSave={handleSave}
          />
          <Profile1 profile={profile} setProfile={setProfile} />
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
            {errors.type && <span className="error">{errors.type}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="bidNumber"> מספר הצעת מחיר:</label>
            <input
              type="number"
              id="bidNumber"
              placeholder="הכנס מספר הצעת מחיר"
              autoComplete="off"
              value={bidNumber}
              onChange={(e) => setBidNumber(e.target.value)}
            />
            {errors.bidNumber && <span className="error">{errors.bidNumber}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="bidDate"> תאריך:</label>
            <input
              type="date"
              id="bidDate"
              placeholder="הכנס תאריך"
              autoComplete="off"
              value={bidDate}
              onChange={(e) => setBidDate(e.target.value)}
            />
            {errors.bidDate && <span className="error">{errors.bidDate}</span>}
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
          {errors.list && <span className="error">{errors.list}</span>}
          <div className="form-group notes-group">
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
          <button
            onClick={() => {
              if (isFormValid()) {
                setShowBid(true);
                setErrors({}); // איפוס הודעות השגיאה במקרה של הצלחה
              } else {
                setErrorMessage("אנא מלא את כל השדות החיוניים לפני בניית הצעת המחיר.");
              }
            }}
          >
            בנית הצעת מחיר
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>} {/* הצגת הודעת שגיאה כללית */}
        </div>
      )}
    </main>
  );
}
