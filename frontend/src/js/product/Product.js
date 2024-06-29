import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
const Product = () => {
  // State to store products data
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");

  // Function to fetch all products when component mounts
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        // Making GET request to server to fetch product data
        const res = await axios.get("/product");
        console.log(res.data);
        setProduct(res.data); // Updating state with fetched products data
      } catch (err) {
        console.log(err); // Logging error to console if any
      }
    };
    fetchAllProducts(); // Calling the fetchAllProducts function
  }, []);

  // Function to handle deletion of a product
  const handleDelete = async (id) => {
    try {
      // Making DELETE request to server to delete a product
      await axios.delete("/product/" + id);
      window.location.reload(); // Reloading the page after successful deletion
    } catch (err) {
      console.log(err); // Logging error to console if any exist
    }
  };
  // Filter products based on search value
  const filteredProducts = product.filter((data) =>
    data.customersId.toString().includes(search)
  );

  return (
    <div>
      <div className="container">
        <h2 className="w-100 d-flex justify-content-center p-3">מוצרים</h2>
        <SearchBar searchVal={search} setSearchVal={setSearch} />
        <div className="row">
          <div className="col-md-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>פעולות</th>
                  <th>תאריך </th>
                  <th>מחיר </th>
                  <th>כמות </th>
                  <th>גובה </th>
                  <th>רוחב </th>
                  <th>הערות </th>
                  <th>סוג פרופיל</th>
                  <th>סוג </th>
                  <th>ת.ז לקוח</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((data, i) => (
                  <tr key={i}>
                    <td>
                      {/* Link to update product */}
                      <Link
                        to={`/updateProduct/${data.customersId}`}
                        className="btn btn-primary"
                      >
                        עדכון
                      </Link>
                      {/* Button to delete product */}
                      <button
                        className="btn btn-danger ms-2"
                        onClick={(e) => handleDelete(data.customersId)}
                      >
                        מחיקה
                      </button>
                    </td>
                    <td>{data.date}</td>
                    <td>{data.price}</td>
                    <td>{data.count}</td>
                    <td>{data.length}</td>
                    <td>{data.width}</td>
                    <td>{data.Remarks}</td>
                    <td>{data.profileType}</td>
                    <td>{data.type}</td>
                    <td>{data.customersId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Link to add new product */}
            <p style={{ display: "flex", justifyContent: "flex-end" }}>
              <Link to="/addProduct" className="btn btn-success">
                הוספת מוצר חדש
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
