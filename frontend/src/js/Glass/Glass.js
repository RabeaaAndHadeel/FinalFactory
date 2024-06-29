import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchVal from "../searchBar/SearchVal";
const Glass = () => {
  const [glass, setGlass] = useState([]); // Initializing state for storing glass data
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Function to fetch all glass items when component mounts
    const fetchAllGlass = async () => {
      try {
        // Making GET request to server to fetch glass items
        const res = await axios.get("/glass");
        console.log(res.data);
        setGlass(res.data); // Updating state with fetched glass data
      } catch (err) {
        console.log(err); // Logging error to console if there is any
      }
    };
    fetchAllGlass(); // Calling the fetchAllGlass function
  }, []);

  // Function to handle deletion of a glass item
  const handleDelete = async (id) => {
    try {
      await axios.delete("/glass/" + id); // Making DELETE request to server to delete a glass item
      window.location.reload(); // Reloading the page after successful deletion
    } catch (err) {
      console.log(err); // Logging error to console if there is any
    }
  };
  // Filter glasses based on search value
  const filteredGlasses = glass.filter((data) =>
    data.glassType.toString().includes(search)
  );

  return (
    <div className="container">
      <h2 className="w-100 d-flex justify-content-center p-3">זכוכית</h2>
      <SearchVal searchVal={search} setSearchVal={setSearch} />
      <div className="row">
        <div className="col-md-12">
          <table className="table table-bordered ">
            <thead>
              <tr>
                <th>פעולות</th>
                <th>עובי</th>
                <th>סוג זכוכית</th>
              </tr>
            </thead>
            <tbody>
              {filteredGlasses.map((data, i) => (
                <tr key={i}>
                  <td>
                    <Link
                      to={`/update/${data.glassType}`}
                      className="btn btn-primary"
                    >
                      עדכון
                    </Link>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={(e) => handleDelete(data.glassType)}
                    >
                      מחיקה
                    </button>
                  </td>
                  <td>{data.Thickness}</td>
                  <td>{data.glassType}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link to="/add" className="btn btn-success">
              הוספת סוג חדש
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Glass;
