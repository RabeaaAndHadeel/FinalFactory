 import React from 'react'
 
 export default function HeaderBid({handlePrint,handleSave,handleSend}) {
   return (
      <header className="invoice-header">
        <div className="header-title">
          <h2>הצעת מחיר</h2>
          <p>הדפסה | שמירה | שליחה</p>
        </div>
        <div className="header-buttons">
          <button onClick={handleSave}>שמירה</button>
          <button onClick={handleSend}>שליחה</button>
          <button onClick={handlePrint}>הדפסה</button>
        </div>
      </header>
   )
 }
 