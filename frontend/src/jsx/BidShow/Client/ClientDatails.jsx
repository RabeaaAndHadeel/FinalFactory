import React from 'react'
import styles from '../bidInfo.module.css';

export default function ClientDatails({name,family,address}) {
  return (
    <section className={styles.invoiceSection}>
        <div className={styles.sectionLeft}>
          <h3>שם לקוח: {name} {family}</h3>
          <p> כתובת לקוח: {address}</p>
        </div>
    </section>
  )
}
