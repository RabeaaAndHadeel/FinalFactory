import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./searchBar/SearchBar";
import editIcon from "../img/icon/edit.png";
import saveIcon from "../img/icon/save.png";
import closeIcon from "../img/icon/close.png";
import addIcon from "../img/icon/add.png";
import classes from "../css/table.module.css";
import { useNavigate } from "react-router-dom"; 

const Order = () => {   
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    count: "",
    profileType: "",
    customersId: "",
    supplierId: "",
    orderNumber: "",
    status: 1,
  });
  const navigate = useNavigate();
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
  };

  const handleSave = async () => {
    try {
      if (editingIndex !== null) {
        const updatedOrder = { ...formData };
        await axios.put(`/order/${formData.orderNumber}`, updatedOrder);
        const updatedOrders = orders.map((order, index) =>
          index === editingIndex ? updatedOrder : order
        );
        setOrders(updatedOrders);
      } else {
        const res = await axios.post("/createOrder", formData);
        setOrders([...orders, res.data]);
      }
      handleCancel();
    } catch (err) {
      console.error("Error saving order:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleActivateOrder = async (order) => {
    try {
      const updatedStatus = order.status === 1 ? 0 : 1;
      const response = await axios.put(`/order/${order.orderNumber}`, {
        ...order,
        status: updatedStatus,
      });
      setOrders(
        orders.map((o) =>
          o.orderNumber === order.orderNumber ? { ...o, status: updatedStatus } : o
        )
      );
      setMessage("Order status updated successfully!");
    } catch (error) {
      console.error("Error updating order status:", error);
      setMessage("Failed to update order status");
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
      [order.orderNumber, order.customersId, order.supplierId]
        .filter(Boolean)
        .some((prop) => prop.toString().includes(search))
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
    setEditingIndex(orders.length); // Prepare to add a new order
    setFormData({
      count: "",
      profileType: "",
      customersId: "",
      supplierId: "",
      orderNumber: "",
      status: 1,
    });
    navigate("/orderinfo");
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
              <option value="active">פעיל</option>
              <option value="inactive">לא פעיל</option>
              <option value="all">הכל</option>
            </select>
          </div>
          <SearchBar searchVal={search} setSearchVal={setSearch} />
        </div>
        {message && (
          <div className={`alert alert-${message.includes('success') ? 'success' : 'danger'}`}>
            {message}
          </div>
        )}
        <table className={`table ${classes.table}`} dir="rtl">
          <thead>
            <tr>
              <th>מספר הזמנה</th>
              <th>סוג פרופיל</th>
              <th>מספר לקוח</th>
              <th>ספק</th>
              <th>כמות</th>
              <th>סטטוס</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((order, index) => (
              <tr key={index}>
                <td>{order.orderNumber}</td>
                <td>{order.profileType}</td>
                <td>{order.customersId}</td>
                <td>{order.supplierId}</td>
                <td>{order.count}</td>
                <td>
                  {order.status === 1 ? "פעיל" : "לא פעיל"}
                </td>
                <td>
                  {editingIndex === index ? (
                    <>
                      <button className="btn btn-success" onClick={handleSave}>
                        <img
                          src={saveIcon}
                          alt="Save"
                          className={classes.icon}
                        />
                      </button>
                      <button className="btn btn-danger" onClick={handleCancel}>
                        <img
                          src={closeIcon}
                          alt="Cancel"
                          className={classes.icon}
                        />
                      </button>
                    </>
                  ) : (
                    <div>
                      <img
                        src={editIcon}
                        alt="Edit"
                        className={classes.icon}
                        onClick={() => {
                          setEditingIndex(index);
                          setFormData(order); // Load selected order into form
                        }}
                      />
                      <button
                        className="btn btn-link p-0"
                        onClick={() => handleActivateOrder(order)}
                      >
                        שנה סטטוס
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav>
          <ul className="pagination justify-content-center">
            {Array.from({
              length: Math.ceil(filteredOrders.length / rowsPerPage),
            }).map((_, index) => (
              <li key={index} className="page-item">
                <button
                  onClick={() => paginate(index + 1)}
                  className="page-link"
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Order;
