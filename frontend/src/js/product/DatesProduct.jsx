 import React from 'react'
 
 export default function DatesProduct({date,num}) {
   return (
      <article className="invoice-details">
        <ul>
          <li><span className="font-bold">  מספר הצעה מחיר: {num}</span></li>
          <li><span className="font-bold"> תאריך: {date}</span></li>
        </ul>
      </article>
   )
 }
 