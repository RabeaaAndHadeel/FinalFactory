import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./searchBar/SearchBar";
import editIcon from "../img/icon/edit.png";
import saveIcon from "../img/icon/save.png";
import closeIcon from "../img/icon/close.png";
import addIcon from "../img/icon/add.png";
import classes from "../css/table.module.css";
import OrderValidation from "../js/validations/OrderValidation"; // Import the validation function

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    count: "",
    profileType: "",
    customersId: "",
    supplierId: "",
    orderNumber: "",
    status: 1, // Initialize status
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [displayActiveOnly, setDisplayActiveOnly] = useState(true);
  const [message, setMessage] = useState(""); // Added for activation messages
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
    setFormData({
      count: "",
      profileType: "",
      customersId: "",
      supplierId: "",
      orderNumber: "",
      status: 1, // Reset status on cancel
    });
    setErrors({});
  };

  const handleSave = async () => {
    const validationErrors = OrderValidation(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post("/createOrder", formData);
      setOrders([...orders, res.data]);
      handleCancel();
    } catch (err) {
      console.error("Error saving order:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleActivateOrder = async (orderNumber) => {
    try {
      const response = await axios.put(`/order/${orderNumber}`, {
        status: 1, // Assuming 1 means active
      });
      console.log("Order status updated:", response.data);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleChangeDisplay = (event) => {
    const option = event.target.value;
    if (option === "active") {
      setDisplayActiveOnly(true);
    } else if (option === "inactive") {
      setDisplayActiveOnly(false);
    } else {
      setDisplayActiveOnly(null);
    }
  };

  const filteredOrders = orders
    .filter((order) =>
      (order.orderNumber || order.customersId || order.supplierId)
        .toString()
        .includes(search)
    )
    .filter((order) => {
      if (displayActiveOnly === null) return true;
      return displayActiveOnly ? order.status === 1 : order.status === 0;
    });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredOrders.slice(indexOfFirstRow, indexOfLastRow);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddOrder = () => {
    setEditingIndex(orders.length); // Start editing new row
    setFormData({
      count: "",
      profileType: "",
      customersId: "",
      supplierId: "",
      orderNumber: "",
      status: 1, // Initialize status
    });
    setErrors({});
  };

  return (
    <div className={classes.container}>
      <div className={classes.tablef}>
        <h2 className="w-100 d-flex justify-content-center p-3">הזמנה</h2>
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-primary" onClick={handleAddOrder}>
            <img src={addIcon} alt="Add" className={classes.icon} /> הוספת הזמנה
          </button>
          <div>
            <select onChange={handleChangeDisplay} className="form-select">
              <option value="">הכל</option>
              <option value="active">פעילות</option>
              <option value="inactive">לא פעילות</option>
            </select>
          </div>
          <SearchBar searchVal={search} setSearchVal={setSearch} />
        </div>
        {message.text && (
          <div
            className={`alert ${
              message.msgClass === "success" ? "alert-success" : "alert-danger"
            }`}
          >
            {message.text}
          </div>
        )}
        <table className={`table ${classes.table}`}>
          <thead>
            <tr>
              <th>פעולות</th>
              <th>סטטוס</th>
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
                <td>
                  <div>
                    <img
                      src={editIcon}
                      alt="Edit"
                      className={classes.icon}
                      onClick={() => setEditingIndex(index)}
                    />
                    <button
                      className="btn btn-link p-0"
                      onClick={() => handleActivateOrder(order)}
                    >
                      שנה סטטוס
                    </button>
                  </div>
                </td>
                <td>{order.status === 1 ? "פעיל" : "לא פעיל"}</td>
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
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={`form-control ${
                      errors.status ? "is-invalid" : ""
                    }`}
                  >
                    <option value={1}>פעיל</option>
                    <option value={0}>לא פעיל</option>
                  </select>
                  {errors.status && (
                    <div className="invalid-feedback">{errors.status}</div>
                  )}
                </td>
                <td>
                  <img
                    src={saveIcon}
                    alt="Save"
                    className={classes.icon}
                    onClick={handleSave}
                  />
                  <img
                    src={closeIcon}
                    alt="Cancel"
                    className={classes.icon}
                    onClick={handleCancel}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="count"
                    value={formData.count}
                    onChange={handleChange}
                    placeholder="כמות"
                    className={`form-control ${
                      errors.count ? "is-invalid" : ""
                    }`}
                  />
                  {errors.count && (
                    <div className="invalid-feedback">{errors.count}</div>
                  )}
                </td>
                <td>
                  <input
                    type="text"
                    name="profileType"
                    value={formData.profileType}
                    onChange={handleChange}
                    placeholder="סוג מוצר"
                    className={`form-control ${
                      errors.profileType ? "is-invalid" : ""
                    }`}
                  />
                  {errors.profileType && (
                    <div className="invalid-feedback">{errors.profileType}</div>
                  )}
                </td>
                <td>
                  <input
                    type="text"
                    name="supplierId"
                    value={formData.supplierId}
                    onChange={handleChange}
                    placeholder="ח'פ ספק"
                    className={`form-control ${
                      errors.supplierId ? "is-invalid" : ""
                    }`}
                  />
                  {errors.supplierId && (
                    <div className="invalid-feedback">{errors.supplierId}</div>
                  )}
                </td>
                <td>
                  <input
                    type="text"
                    name="customersId"
                    value={formData.customersId}
                    onChange={handleChange}
                    placeholder="ת.ז לקוח"
                    className={`form-control ${
                      errors.customersId ? "is-invalid" : ""
                    }`}
                  />
                  {errors.customersId && (
                    <div className="invalid-feedback">{errors.customersId}</div>
                  )}
                </td>
                <td>
                  <input
                    type="text"
                    name="orderNumber"
                    value={formData.orderNumber}
                    onChange={handleChange}
                    placeholder="מספר הזמנה"
                    className={`form-control ${
                      errors.orderNumber ? "is-invalid" : ""
                    }`}
                  />
                  {errors.orderNumber && (
                    <div className="invalid-feedback">{errors.orderNumber}</div>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="pagination">
          {[
            ...Array(Math.ceil(filteredOrders.length / rowsPerPage)).keys(),
          ].map((number) => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className="page-link"
            >
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
