import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validateInputs from "../validations/ProductValidation"; // Import the validation function

const AddProduct = () => {
  const [product, setProduct] = useState({
    type: "",
    profileType: "",
    customersId: "",
    Remarks: "",
    width: "",
    length: "",
    count: "",
    price: "",
    date: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "date") {
      const formattedDate = value; // No need to split here since it's already in the correct format
      setProduct((prev) => ({ ...prev, [name]: formattedDate }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateInputs(product);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const res = await axios.post("/createProduct", product);
      console.log(res.data);
      navigate("/product");
    } catch (err) {
      console.error("Error creating product:", err);
      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
        console.error("Response headers:", err.response.headers);
      } else if (err.request) {
        console.error("Request data:", err.request);
      } else {
        console.error("Error message:", err.message);
      }
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <div className="col-md-12">
          <h2 className="text-center">הוספת מוצר חדש</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 mt-3">
              <label className="form-label">ת.ז לקוח:</label>
              <input
                type="number"
                className="form-control"
                id="CustomersId"
                placeholder="הכנס ת.ז לקוח"
                name="customersId"
                onChange={handleChange}
                value={product.customersId}
              />
              {errors.customersId && (
                <span className="form-error text-danger">
                  {errors.customersId}
                </span>
              )}
            </div>

            <div className="mb-3 mt-3">
              <label className="form-label">סוג מוצר:</label>
              <input
                type="text"
                className="form-control"
                id="Type"
                placeholder="הכנס סוג מוצר"
                name="type"
                onChange={handleChange}
                value={product.type}
              />
              {errors.type && (
                <span className="form-error text-danger">{errors.type}</span>
              )}
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">סוג פרופיל:</label>
              <input
                type="text"
                className="form-control"
                id="ProfileType"
                placeholder="הכנס סוג פרופיל"
                name="profileType"
                onChange={handleChange}
                value={product.profileType}
              />
              {errors.profileType && (
                <span className="form-error text-danger">
                  {errors.profileType}
                </span>
              )}
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">הערות:</label>
              <input
                type="text"
                className="form-control"
                id="Remarks"
                placeholder="הכנס הערות"
                name="Remarks"
                onChange={handleChange}
                value={product.Remarks}
              />
              {errors.Remarks && (
                <span className="form-error text-danger">{errors.Remarks}</span>
              )}
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">רוחב:</label>
              <input
                type="number"
                className="form-control"
                id="Width"
                placeholder="הכנס רוחב"
                name="width"
                onChange={handleChange}
                value={product.width}
              />
              {errors.width && (
                <span className="form-error text-danger">{errors.width}</span>
              )}
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">אורך:</label>
              <input
                type="number"
                className="form-control"
                id="Length"
                placeholder="הכנס אורך"
                name="length"
                onChange={handleChange}
                value={product.length}
              />
              {errors.length && (
                <span className="form-error text-danger">{errors.length}</span>
              )}
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">כמות:</label>
              <input
                type="number"
                className="form-control"
                id="Count"
                placeholder="הכנס כמות"
                name="count"
                onChange={handleChange}
                value={product.count}
              />
              {errors.count && (
                <span className="form-error text-danger">{errors.count}</span>
              )}
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">מחיר:</label>
              <input
                type="number"
                className="form-control"
                id="Price"
                placeholder="הכנס מחיר"
                name="price"
                onChange={handleChange}
                value={product.price}
              />
              {errors.price && (
                <span className="form-error text-danger">{errors.price}</span>
              )}
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label">תאריך:</label>
              <input
                type="date"
                className="form-control"
                id="Date"
                placeholder="הכנס תאריך"
                name="date"
                onChange={handleChange}
                value={product.date}
                
              />
              {errors.date && (
                <span className="form-error text-danger">{errors.date}</span>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              הוסף מוצר
            </button>
            <Link
              to="/product"
              style={{
                textAlign: "center",
                display: "block",
                width: "100%",
              }}
            >
              חזור לרשימת מוצרים
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
