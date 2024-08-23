import React from "react";
import "../product/TableProduct.css";

export default function TableOrders({ list }) {
  return (
    <div className="invoice-table">
      <div className="table-header">
        <div className="table-row">
          <div className="table-cell"> סוג פרזול</div>
          <div className="table-cell">כמות</div>
        </div>
      </div>
      <div className="table-body">
        {list.map(({ foamType, quantity }, i) => (
          <div className="table-row" key={i}>
            <div className="table-cell">{foamType}</div>
            <div className="table-cell">{quantity}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
