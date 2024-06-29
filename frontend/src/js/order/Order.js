import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
const Order = () => {
  const [order, setOrder] = useState([]); // Initializing state for storing order data
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Function to fetch all orders items when component mounts
    const fetchAllOrders = async () => {
      try {
        // Making GET request to server to fetch order
        const res = await axios.get("/order");
        console.log(res.data);
        setOrder(res.data); // Updating state with fetched order data
      } catch (err) {
        console.log(err); // Logging error to console if there is any
      }
    };
    fetchAllOrders(); // Calling the fetchAllOrders function
  }, []);

  // Function to handle deletion of an order
  const handleDelete = async (id) => {
    try {
      await axios.delete("/order/" + id); // Making DELETE request to server to delete an order
      window.location.reload(); // Reloading the page after successful deletion
    } catch (err) {
      console.log(err); // Logging error to console if there is any
    }
  };
  // Filter orders based on search value
  const filteredOrders = order.filter((data) =>
    data.orderNumber.toString().includes(search)
  );
  return (
    <div className="container">
      <h2 className="w-100 d-flex justify-content-center p-3">הזמנה</h2>
      <SearchBar searchVal={search} setSearchVal={setSearch} />
      <div className="row">
        <div className="col-md-12">
          <table className="table table-bordered ">
            <thead>
              <tr>
                <th>פעולות</th>
                <th>כמות</th>
                <th>סוג מוצר</th>
                <th>מספר הזמנה</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((data, i) => (
                <tr key={i}>
                  <td>
                    <Link
                      to={`/updateOrder/${data.orderNumber}`}
                      className="btn btn-primary"
                    >
                      עדכון
                    </Link>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={(e) => handleDelete(data.orderNumber)}
                    >
                      מחיקה
                    </button>
                  </td>
                  <td>{data.count}</td>
                  <td>{data.type}</td>
                  <td>{data.orderNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link to="/addOrder" className="btn btn-success">
              הוספת הזמנה חדשה
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Order;
