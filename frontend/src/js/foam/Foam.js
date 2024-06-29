import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar"; // Adjust the import path as necessary

const Foam = () => {
  // State to store foam data
  const [foam, setFoam] = useState([]);
  const [search, setSearch] = useState("");
  // Function to fetch all foams when component mounts
  useEffect(() => {
    const fetchAllFoams = async () => {
      try {
        // Making GET request to server to fetch foam data
        const res = await axios.get("/foam");
        setFoam(res.data); // Updating state with fetched profile data
      } catch (err) {
        console.log(err); // Logging error to console if any
      }
    };
    fetchAllFoams(); // Calling the fetchAllFoams function
  }, []);

  // Function to handle deletion of a foam
  const handleDelete = async (id) => {
    try {
      // Making DELETE request to server to delete a foam
      await axios.delete("/foam/" + id);
      window.location.reload(); // Reloading the page after successful deletion
    } catch (err) {
      console.log(err); // Logging error to console if any exist
    }
  };
  // Filter foams based on search value
  const filteredFoams = foam.filter((data) =>
    data.foamId.toString().includes(search)
  );
  return (
    <div>
      <div className="container">
        <h2 className="w-100 d-flex justify-content-center p-3">פרזול</h2>
        <SearchBar searchVal={search} setSearchVal={setSearch} />
        <div className="row">
          <div className="col-md-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>פעולות</th>
                  <th>סוג </th>
                  <th>מק"ט</th>
                </tr>
              </thead>
              <tbody>
                {filteredFoams.map((data, i) => (
                  <tr key={i}>
                    <td>
                      {/* Link to update foam */}
                      <Link
                        to={`/updateFoam/${data.foamId}`}
                        className="btn btn-primary"
                      >
                        עדכון
                      </Link>
                      {/* Button to delete foam */}
                      <button
                        className="btn btn-danger ms-2"
                        onClick={(e) => handleDelete(data.foamId)}
                      >
                        מחיקה
                      </button>
                    </td>
                    <td>{data.foamType}</td>
                    <td>{data.foamId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Link to add new foam */}
            <p style={{ display: "flex", justifyContent: "flex-end" }}>
              <Link to="/addFoam" className="btn btn-success">
                הוספת סוג חדש
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Foam;
