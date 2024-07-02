import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "./searchBar/SearchBar";
import editIcon from '../img/icon/edit.png';
import saveIcon from '../img/icon/save.png';
import closeIcon from '../img/icon/close.png';
import addIcon from '../img/icon/add.png';
import classes from '../css/table.module.css';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ count: "", profileType: "", customersId: "", orderNumber: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/order");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleCancel = () => {
    setEditingIndex(null);
    setFormData({ count: "", profileType: "", customersId: "", orderNumber: "" });
  };

  const handleSave = async () => {
    if (!formData.count || !formData.profileType || !formData.customersId || !formData.orderNumber) {
      alert("All fields are required.");
      return;
    }

    try {
      console.log('Adding new order:', formData);
      const res = await axios.post("/createOrder", formData);
      setOrders([...orders, res.data]);
      handleCancel();
    } catch (err) {
      console.error('Error saving order:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const filteredOrders = orders.filter((order) =>
   (order.orderNumber || order.customersId ||order.supplierId ).toString().includes(search) 
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredOrders.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddOrder = () => {

  };

  return (
    <div className={classes.container}>
      <div className={classes.tablef}>
        <h2 className="w-100 d-flex justify-content-center p-3">הזמנה</h2>
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-primary" onClick={handleAddOrder}>
            <img src={addIcon} alt="Add" className={classes.icon} /> הוספת הזמנה
          </button>
          <SearchBar searchVal={search} setSearchVal={setSearch} />
        </div>
        <table className={`table ${classes.table}`}>
          <thead>
            <tr>
              <th>כמות</th>
              <th>סוג מוצר</th>
              <th> ח"פ ספק</th>
              <th>ת.ז לקוח</th>
              <th>מספר הזמנה</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((order, index) => (
              <tr key={index}>
                <td>{order.count}</td>
                <td>{order.profileType}</td>
                <td>{order.supplierId}</td>
                <td>{order.customersId}</td>
                <td>{order.orderNumber}</td>
              </tr>
            ))}
            {editingIndex === orders.length && (
              <tr>
                <td>
                  <img src={saveIcon} alt="Save" className={classes.icon} onClick={handleSave} />
                  <img src={closeIcon} alt="Cancel" className={classes.icon} onClick={handleCancel} />
                </td>
                <td>
                  <input
                    type="text"
                    name="count"
                    value={formData.count}
                    onChange={handleChange}
                    placeholder="כמות"
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="profileType"
                    value={formData.profileType}
                    onChange={handleChange}
                    placeholder="סוג מוצר"
                    className="form-control"
                  />
                </td>
                 <td>
                  <input
                    type="text"
                    name="supplierId"
                    value={formData.supplierId}
                    onChange={handleChange}
                    placeholder="ח'פ ספק"
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="customersId"
                    value={formData.customersId}
                    onChange={handleChange}
                    placeholder="ת.ז לקוח"
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="orderNumber"
                    value={formData.orderNumber}
                    onChange={handleChange}
                    placeholder="מספר הזמנה"
                    className="form-control"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="pagination">
          {[...Array(Math.ceil(filteredOrders.length / rowsPerPage)).keys()].map(number => (
            <button key={number + 1} onClick={() => paginate(number + 1)} className="page-link">
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
