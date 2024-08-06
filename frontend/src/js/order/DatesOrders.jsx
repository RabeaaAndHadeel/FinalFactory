 import React from 'react'
 
 export default function DatesOrders({date,num}) {
   return (
      <article className="invoice-details">
        <ul>
          <li><span className="font-bold"> תאריך: {date}</span></li>
          <li><span className="font-bold">  מספר הזמנה : {num}</span></li>
        </ul>
      </article>
   )
 }
 