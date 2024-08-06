 import React from 'react'
 
 export default function HeaderOrders({handlePrint,handleSave,handleSend}) {
   return (
      <header className="invoice-header">
        <div className="header-title">
          <h2>הזמנת חומרים</h2>
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
 