import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "./searchBar/SearchBar";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/products/${id}`);
      window.location.reload(); // Refresh the page after successful deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.customersId.toString().includes(search)
  );

  return (
    <div className="container">
      <h2 className="w-100 d-flex justify-content-center p-3">מוצרים</h2>
      <SearchBar searchVal={search} setSearchVal={setSearch} />
      <div className="row">
        <div className="col-md-12">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>פעולות</th>
                <th>תאריך</th>
                <th>מחיר</th>
                <th>כמות</th>
                <th>גובה</th>
                <th>רוחב</th>
                <th>הערות</th>
                <th>סוג פרופיל</th>
                <th>סוג</th>
                <th>ת.ז לקוח</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={index}>
                  <td>
                    <Link
                      to={`/updateProduct/${product.customersId}`}
                      className="btn btn-primary"
                    >
                      עדכון
                    </Link>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => handleDelete(product.customersId)}
                    >
                      מחיקה
                    </button>
                  </td>
                  <td>{product.date}</td>
                  <td>{product.price}</td>
                  <td>{product.count}</td>
                  <td>{product.length}</td>
                  <td>{product.width}</td>
                  <td>{product.Remarks}</td>
                  <td>{product.profileType}</td>
                  <td>{product.type}</td>
                  <td>{product.customersId}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link to="/addProduct" className="btn btn-success">
              הוספת מוצר חדש
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
