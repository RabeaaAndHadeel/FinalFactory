 import React from 'react'
 import styles from './bidInfo.module.css';

 export default function DatesProduct({date,num}) {
   return (
      <article className={styles.invoiceDetails}>
        <ul>
          <li><span className="font-bold"> תאריך: {date}</span></li>
        </ul>
      </article>
   )
 }
 