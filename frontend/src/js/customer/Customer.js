import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
const Customer = () => {
  // State to store Customer data
  const [customer, setCustomer] = useState([]);
  const [search, setSearch] = useState("");

  // Function to fetch all Customer when component mounts
  useEffect(() => {
    const fetchAllCustomers = async () => {
      try {
        // Making GET request to server to fetch supplier data
        const res = await axios.get("/customer");
        console.log(res.data);

        setCustomer(res.data); // Updating state with fetched customer data
      } catch (err) {
        console.log(err); // Logging error to console if any
      }
    };
    fetchAllCustomers(); // Calling the fetchAllCustomers function
  }, []);

  // Function to handle deletion of a supplier
  const handleDelete = async (id) => {
    try {
      // Making DELETE request to server to delete a customer
      await axios.delete("/customer/" + id);
      window.location.reload(); // Reloading the page after successful deletion
    } catch (err) {
      console.log(err); // Logging error to console if any exist
    }
  };
  // Filter customers based on search value
  const filteredCustomers = customer.filter((data) =>
    data.id.toString().includes(search)
  );
  return (
    <div>
      <div className="container">
        <h2 className="w-100 d-flex justify-content-center p-3">לקוחות</h2>
        <SearchBar searchVal={search} setSearchVal={setSearch} />
        <div className="row">
          <div className="col-md-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>פעולות</th>
                  <th>כתובת</th>
                  <th>מייל</th>
                  <th>טלפון</th>
                  <th> שם משפחה </th>
                  <th>שם </th>
                  <th>ת.ז</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((data, i) => (
                  <tr key={i}>
                    <td>
                      {/* Link to update supplier */}
                      <Link
                        to={`/updateCustomer/${data.id}`}
                        className="btn btn-primary"
                      >
                        עדכון
                      </Link>
                      {/* Button to delete supplier */}
                      <button
                        className="btn btn-danger ms-2"
                        onClick={(e) => handleDelete(data.id)}
                      >
                        מחיקה
                      </button>
                    </td>
                    <td>{data.address}</td>
                    <td>{data.mail}</td>
                    <td>{data.phoneNumber}</td>
                    <td>{data.family}</td>
                    <td>{data.name}</td>
                    <td>{data.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Link to add new customer */}
            <p style={{ display: "flex", justifyContent: "flex-end" }}>
              <Link to="/addCustomer" className="btn btn-success">
                הוספת לקוח חדש
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
