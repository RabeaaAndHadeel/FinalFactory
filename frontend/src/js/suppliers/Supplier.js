import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";

const Supplier = () => {
  // State to store supplier data
  const [supplier, setSupplier] = useState([]);
  const [search, setSearch] = useState("");

  // Function to fetch all suppliers when component mounts
  useEffect(() => {
    const fetchAllSuppliers = async () => {
      try {
        // Making GET request to server to fetch supplier data
        const res = await axios.get("/supplier");
        console.log(res.data);

        setSupplier(res.data); // Updating state with fetched supplier data
      } catch (err) {
        console.log(err); // Logging error to console if any
      }
    };
    fetchAllSuppliers(); // Calling the fetchAllsuppliers function
  }, []);

  // Function to handle deletion of a supplier
  const handleDelete = async (id) => {
    try {
      // Making DELETE request to server to delete a supplier
      await axios.delete("/supplier/" + id);
      window.location.reload(); // Reloading the page after successful deletion
    } catch (err) {
      console.log(err); // Logging error to console if any exist
    }
  };
  // Filter suppliers based on search value
  const filteredSuppliers = supplier.filter((data) =>
    data.id.toString().includes(search)
  );
  return (
    <div>
      <div className="container">
        <h2 className="w-100 d-flex justify-content-center p-3">ספקים</h2>
        <SearchBar searchVal={search} setSearchVal={setSearch} />
        <div className="row">
          <div className="col-md-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>פעולות</th>
                  <th>כתובת</th>
                  <th>איש קשר</th>
                  <th>מייל</th>
                  <th>טלפון</th>
                  <th>שם מפעל</th>
                  <th>ת.ז</th>
                </tr>
              </thead>
              <tbody>
                {filteredSuppliers.map((data, i) => (
                  <tr key={i}>
                    <td>
                      {/* Link to update supplier */}
                      <Link
                        to={`/updateSupplier/${data.id}`}
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
                    <td>{data.contact}</td>
                    <td>{data.mail}</td>
                    <td>{data.phone}</td>
                    <td>{data.name}</td>
                    <td>{data.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Link to add new supplier */}
            <p style={{ display: "flex", justifyContent: "flex-end" }}>
              <Link to="/addSupplier" className="btn btn-success">
                הוספת ספק חדש
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Supplier;
