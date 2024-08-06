import React from 'react';
import './TableProduct.css';

export default function TableProduct({ list }) {
  return (
    <div className="invoice-table">
      <div className="table-header">
        <div className="table-row">
          <div className="table-cell">תיאור פריט</div>
          <div className="table-cell">רוחב</div>
          <div className="table-cell">גובה</div>
          <div className="table-cell">כמות</div>
          <div className="table-cell">מחיר יחידה</div>
          <div className="table-cell">סה"כ</div>
        </div>
      </div>
      <div className="table-body">
        {list.map(({ id, item, width, length, quantity, price, total }) => (
          <div className="table-row" key={id}>
            <div className="table-cell">{item}</div>
            <div className="table-cell">{width}</div>
            <div className="table-cell">{length}</div>
            <div className="table-cell">{quantity}</div>
            <div className="table-cell">{price}</div>
            <div className="table-cell">{total}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
