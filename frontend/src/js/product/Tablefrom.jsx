import React, { useEffect,useState } from 'react';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import './TableFrom.css';
import './TableProduct.css';
import editIcon from "../../img/icon/edit.png";
import saveIcon from "../../img/icon/save.png";
import closeIcon from "../../img/icon/close.png";
export default function TableFrom({
  item, setItem,
  length, setLength,
  width, setWidth,
  quantity, setQuantity,
  price, setPrice,
  list, setList
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const[product,setProduct]=useState();
  const [editingIndex, setEditingIndex] = useState(null);

  const calculateTotal = () => quantity * price;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      const updatedList = list.map((listItem) =>
        listItem.id === editId
          ? { ...listItem, item, length, width, quantity, price, total: calculateTotal() }
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
        total: calculateTotal()
      };
      setList([...list, newItem]);
    }

    setItem('');
    setLength('');
    setWidth('');
    setPrice('');
    setQuantity('');
  };
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
  const handleEdit = (id,index) => {
    setEditingIndex(index);
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
    setEditingIndex(null);
    setProduct({ weight: "", item: "", length: "", quantity: "",price:""}); 
  };
  const handleDelete = (id) => {
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
              placeholder="Item description" 
              autoComplete="off" 
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-item half-width">
            <label htmlFor="length">גובה:</label>
            <input 
              type="number" 
              id="length" 
              placeholder="Length" 
              autoComplete="off" 
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
          <div className="form-item half-width">
            <label htmlFor="width">רוחב:</label>
            <input 
              type="number" 
              id="width" 
              placeholder="Width" 
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
              placeholder="Price" 
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
              placeholder="Quantity" 
              autoComplete="off" 
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="form-item third-width">
            <p>סה"כ: {calculateTotal()}</p>
          </div>
        </div>
        <button className="add-row-button" type="submit">
          {isEditing ? 'שמור עריכה' : 'הוסף שורה'}
        </button>
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
                <button className="edit-button" onClick={() => handleEdit(id)}>ערוך</button>
              </td>
              <td className="table-cell">
                <button className="delete-button" onClick={() => handleDelete(id)}>מחק</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
