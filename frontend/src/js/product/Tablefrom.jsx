import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./TableFrom.css";
import "./TableProduct.css";
import Validation from "../validations/ProductValidation";

export default function TableFrom({
  item,
  setItem,
  length,
  setLength,
  width,
  setWidth,
  quantity,
  setQuantity,
  price,
  setPrice,
  list,
  setList,
}) {
  const [product, setProduct] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    type: "",
    profile: "",
    bidNumber: "",
    bidDate: "",
    notes: "",
    item: "",
    width: "",
    length: "",
    quantity: "",
    price: "",
  });

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("/product");
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProducts();
  }, []);

  const handleEdit = (id) => {
    const itemToEdit = list.find((listItem) => listItem.id === id);
    setItem(itemToEdit.item);
    setLength(itemToEdit.length);
    setWidth(itemToEdit.width);
    setQuantity(itemToEdit.quantity);
    setPrice(itemToEdit.price);
    setIsEditing(true);
    setEditId(id);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditId(null);
    setItem("");
    setLength("");
    setWidth("");
    setPrice("");
    setQuantity("");
    setErrorMessage("");
  };

  const handleSave = async () => {
    const validationErrors = Validation(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      let endpoint;
      let updatedProducts;

      if (isEditing && editId) {
        // Update existing product
        endpoint = `/product/${editId}`;
        await axios.put(endpoint, formData);
        updatedProducts = product.map((item) =>
          item.id === editId ? formData : item
        );
      } else {
        // Add new product
        const res = await axios.post("/createProduct", formData);
        updatedProducts = [...product, res.data];
      }

      setProduct(updatedProducts);
      handleCancel();
    } catch (err) {
      console.error(
        "Error saving product:",
        err.response?.data?.error || err.message
      );
    }
  };

  const calculateTotal = () => quantity * price;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      const updatedList = list.map((listItem) =>
        listItem.id === editId
          ? {
              ...listItem,
              item,
              length,
              width,
              quantity,
              price,
              total: calculateTotal(),
            }
          : listItem
      );
      setList(updatedList);
      setIsEditing(false);
      setEditId(null);
    } else {
      const newItem = {
        id: uuidv4(),
        item,
        length,
        width,
        quantity,
        price,
        total: calculateTotal(),
      };
      setList([...list, newItem]);
    }

    setItem("");
    setLength("");
    setWidth("");
    setPrice("");
    setQuantity("");
  };

  const handleDelete = async (id) => {
    const updatedList = list.filter((listItem) => listItem.id !== id);
    setList(updatedList);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-item full-width">
            <label htmlFor="item">תאור פריט:</label>
            <input
              type="text"
              id="item"
              placeholder="תאור פריט"
              autoComplete="off"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-item third-width">
            <label htmlFor="length">גובה:</label>
            <input
              type="number"
              id="length"
              placeholder="גובה"
              autoComplete="off"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
          <div className="form-item third-width">
            <label htmlFor="width">רוחב:</label>
            <input
              type="number"
              id="width"
              placeholder="רוחב"
              autoComplete="off"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-item third-width">
            <label htmlFor="price">מחיר:</label>
            <input
              type="number"
              id="price"
              placeholder="מחיר"
              autoComplete="off"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="form-item third-width">
            <label htmlFor="quantity">כמות:</label>
            <input
              type="number"
              id="quantity"
              placeholder="כמות"
              autoComplete="off"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-item full-width">
            <p>סה"כ: {calculateTotal()}</p>
          </div>
        </div>
        <button className="add-row-button" type="button" onClick={handleSubmit}>
          {isEditing ? "שמור עריכה" : "הוסף שורה"}
        </button>
        <button className="save-button" type="button" onClick={handleSave}>
          שמור לרשימת מוצרים
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      <table className="invoice-table">
        <thead className="table-header">
          <tr className="table-row">
            <th className="table-cell">תאור פריט</th>
            <th className="table-cell">גובה</th>
            <th className="table-cell">רוחב</th>
            <th className="table-cell">כמות</th>
            <th className="table-cell">מחיר</th>
            <th className="table-cell">סה"כ</th>
            <th className="table-cell">ערוך</th>
            <th className="table-cell">מחק</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {list.map(({ id, item, width, length, quantity, price, total }) => (
            <tr className="table-row" key={id}>
              <td className="table-cell">{item}</td>
              <td className="table-cell">{width}</td>
              <td className="table-cell">{length}</td>
              <td className="table-cell">{quantity}</td>
              <td className="table-cell">{price}</td>
              <td className="table-cell">{total}</td>
              <td className="table-cell">
                <button className="edit-button" onClick={() => handleEdit(id)}>
                  ערוך
                </button>
              </td>
              <td className="table-cell">
                <button
                  className="delete-button"
                  onClick={() => handleDelete(id)}
                >
                  מחק
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
