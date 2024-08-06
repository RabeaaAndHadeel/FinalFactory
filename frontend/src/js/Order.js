import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./searchBar/SearchBar";
import editIcon from "../img/icon/edit.png";
import saveIcon from "../img/icon/save.png";
import closeIcon from "../img/icon/close.png";
import addIcon from "../img/icon/add.png";
import classes from "../css/table.module.css";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [displayActiveOnly, setDisplayActiveOnly] = useState(true);
  const [message, setMessage] = useState(""); // Added for activation messages
  const [supplierOrders, setSupplierOrders] = useState({}); // State to hold supplier order counts
  const rowsPerPage = 7;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/order");
        setOrders(response.data);

        const supplierOrdersResponse = await axios.get("/supplier/orders");
        setSupplierOrders(supplierOrdersResponse.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        if (error.response) {
          console.error("Server responded with status:", error.response.status);
          console.error("Response data:", error.response.data);
          // Handle specific errors or show appropriate message to users
        } else if (error.request) {
          console.error("No response received:", error.request);
          // Handle if no response received from server
        } else {
          console.error("Error setting up the request:", error.message);
          // Handle other errors in setting up the request
        }
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
      const res = await axios.post("/createOrder", formData);
      setOrders([...orders, res.data]);
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
      const response = await axios.put(`/order/${order.orderNumber}`, {
        status: order.status === 1 ? 0 : 1, // Toggle status
      });
      setOrders(
        orders.map((o) =>
          o.orderNumber === order.orderNumber
            ? { ...o, status: response.data.status }
            : o
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
    setEditingIndex(orders.length); // Start editing new row
    setFormData({
      count: "",
      profileType: "",
      customersId: "",
      supplierId: "",
      orderNumber: "",
      status: 1, // Initialize status
    });
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
          <SearchBar onChange={(e) => setSearch(e.target.value)} />
        </div>
        <table className="table table-striped table-hover" dir="rtl">
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
                  {order.status === 1 ? (
                    <button
                      className="btn btn-success"
                      onClick={() => handleActivateOrder(order)}
                    >
                      פעיל
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleActivateOrder(order)}
                    >
                      לא פעיל
                    </button>
                  )}
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
                    <button
                      className="btn btn-primary"
                      onClick={() => setEditingIndex(index)}
                    >
                      <img src={editIcon} alt="Edit" className={classes.icon} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
