import React from 'react'

export default function DetailsProduct({p,t}) {
  return (
      <section className="invoice-section">
        <div className="section-right">
          <h3> פרופיל: {p}</h3>
          <p> סוג: {t} </p>
        </div>
      </section>
  )
}
