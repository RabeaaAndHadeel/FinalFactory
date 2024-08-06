import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/table.module.css";
import FactoryData from "./factory/factoryData";

const ProductQuote = () => {
  const [products, setProducts] = useState([]);
  const [quoteDetails, setQuoteDetails] = useState({
    date: "23/04/2017",
    productNum: "354",
    customersId: "אבשלום אלקלעי"
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const addNewRow = () => {
    setProducts([
      ...products,
      { type: "", Remarks: "", price: "", count: "", length: "", width: "" }
    ]);
  };

  const totalCost = products.reduce((sum, product) => 
    sum + (parseFloat(product.price) * parseFloat(product.count) || 0), 
    0
  );

  return (
    <div className="container">
      <FactoryData />
      <section className="quote-info">
        <p>תאריך: {quoteDetails.date}</p>
        <p>מספר הצעת מחיר: {quoteDetails.productNum}</p>
        <p>לכבוד: {quoteDetails.customersId}</p>
      </section>
      <section className="table-container">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>סה"כ</th>
              <th>מחיר יחידה</th>
              <th>כמות</th>
              <th>גובה</th>
              <th>רוחב</th>
              <th>תיאור פריט</th>
              <th>מוצר</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{(parseFloat(product.price) * parseFloat(product.count) || 0).toFixed(2)}</td>
                <td>{product.price}</td>
                <td>{product.count}</td>
                <td>{product.length}</td>
                <td>{product.width}</td>
                <td>{product.Remarks}</td>
                <td>{product.type}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2">{totalCost.toFixed(2)}</td>
              <td colSpan="5">סה"כ</td>
            </tr>
          </tfoot>
        </table>
        <button onClick={addNewRow} className="btn btn-success">
          הוסף שורה חדשה
        </button>
      </section>
    </div>
  );
};

export default ProductQuote;
