import React, { useState } from "react";
import SearchBar from "./searchBar/SearchBar";

const Product = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([
    { price: "", quantity: "", height: "", width: "" },
  ]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newProducts = [...products];
    newProducts[index][name] = value;
    setProducts(newProducts);
  };

  const addNewRow = () => {
    setProducts([
      ...products,
      { price: "", quantity: "", height: "", width: "" },
    ]);
  };

  return (
    <div className="container">
      <h2 className="w-100 d-flex justify-content-center p-3">הצעת מחיר</h2>
      <div>
        <select>
          <label>סוג</label>
          <option value="active">חלון</option>
          <option value="inactive">דלת</option>
        </select>
        <select>
                    <label>טריס</label>

          <option value="active">כולל טריס</option>
          <option value="inactive">לא כולל טריס</option>
        </select>
        <select>
                    <label>רשת</label>
          <option value="active">כולל רשת</option>
          <option value="inactive">לא כולל רשת</option>
        </select>
        <select>
                    <label>התקנה</label>
          <option value="active">כולל התקנה</option>
          <option value="inactive">לא כולל התקנה</option>
        </select>
      </div>
      <div className="row">
        <div className="col-md-12">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>מחיר</th>
                <th>כמות</th>
                <th>גובה</th>
                <th>רוחב</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      name="price"
                      value={product.price}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="quantity"
                      value={product.quantity}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="height"
                      value={product.height}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="width"
                      value={product.width}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={addNewRow}>הוסף שורה חדשה</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
