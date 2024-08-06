import React from 'react'

export default function ClientDatails({name,family,address}) {
  return (
    <section className="invoice-section">
        <div className="section-left">
          <h3>שם לקוח: {name && family}</h3>
          <p> כתובת לקוח: {address}</p>
        </div>
    </section>
  )
}
