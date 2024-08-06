import React from 'react'

export default function ClientDatails({factoryName,address}) {
  return (
    <section className="invoice-section">
        <div className="section-left">
          <h3>שם מפעל: {factoryName}</h3>
          <p> כתובת : {address}</p>
        </div>
    </section>
  )
}
