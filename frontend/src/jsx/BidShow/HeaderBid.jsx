 import React from 'react'
 import styles from './bidInfo.module.css';

 export default function HeaderBid({idQuotation,handlePrint,handleSave,handleSend}) {
   return (
      <header className={styles.invoiceHeader}>
        <div className={styles.headerTitle}>
          <h2>  הצעת מחיר מספר {idQuotation}  למוצרי אלומיניום</h2>
        </div>
        <div className={styles.headerButtons}>
          <button onClick={handleSave}>שמירה</button>
          <button onClick={handleSend}>שליחה</button>
          <button onClick={handlePrint}>הדפסה</button>
        </div>
      </header>
   )
 }
 