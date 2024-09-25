 import React from 'react'
 import styles from './bidInfo.module.css';

 export default function Notes({notes}) {
   return (
          <section className={styles.invoiceNotes}>
            {notes ?  <p> הערות ללקוח: {notes}</p> :""}
          </section>
   )
 }
 