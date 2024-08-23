
// export default Customer;
import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./searchBar/SearchBar";
import editIcon from "../img/icon/edit.png";
import saveIcon from "../img/icon/save.png";
import closeIcon from "../img/icon/close.png";
import addIcon from "../img/icon/add.png";
import classes from "../css/table.module.css";
import Validation from "../js/validations/CustomerValidation";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    family: "",
    phoneNumber: "",
    email: "",
    address: "",
    status: "", // Added status field
  });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const [customersResponse, bidsCountResponse] = await Promise.all([
        axios.get("/customers"),
        axios.get("/customer/bid"),
      ]);

      console.log("Customers Response:", customersResponse.data); // בדיקת נתונים
      console.log("Bids Count Response:", bidsCountResponse.data); // בדיקת נתונים

      const customersData = customersResponse.data.map((customer) => {
        const bidCount = bidsCountResponse.data.find(
          (bid) => bid.customersId === customer.id // Ensure property name matches backend
        );
        return {
          ...customer,
          bidCount: bidCount ? bidCount.bidCount : 0,
        };
      });

      setCustomers(customersData);
      console.log("Processed Customers Data:", customersData); // בדיקת נתונים מעובדים
    } catch (err) {
      console.error(
        "Error fetching customers:",
        err.response?.data?.error || err.message
      );
    }
  };

  const handleEdit = (index, data) => {
    setEditingIndex(index);
    setFormData({ ...data });
    setErrors({});
    console.log("Editing customer at index:", index); // בדיקת עריכה
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setFormData({
      id: "",
      name: "",
      family: "",
      phoneNumber: "",
      email: "",
      address: "",
      status: "", // Reset status field
    });
    setErrors({});
    console.log("Cancelled editing"); // בדיקת ביטול עריכה
  };

  const handleSave = async () => {
    const validationErrors = Validation(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      console.log("Validation Errors:", validationErrors); // בדיקת שגיאות
      return;
    }

    try {
      let endpoint;
      let updatedCustomers;

      if (editingIndex !== null && editingIndex < customers.length) {
        // Update existing customer
        endpoint = `/customer/${formData.id}`;
        await axios.put(endpoint, formData);
        updatedCustomers = customers.map((item, index) =>
          index === editingIndex ? formData : item
        );
      } else {
        // Add new customer
        const res = await axios.post("/createCustomer", formData);
        updatedCustomers = [...customers, res.data];
      }

      setCustomers(updatedCustomers);
      handleCancel();
      console.log("Customer saved successfully"); // בדיקת שמירה מוצלחת
    } catch (err) {
      console.error(
        "Error saving customer:",
        err.response?.data?.error || err.message
      );
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for the field being edited
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const filteredCustomers = customers.filter((data) =>
    data?.id?.toString().includes(search)
  );

  console.log("Filtered Customers:", filteredCustomers); // בדיקת תוצאות מסוננות

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredCustomers.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddCustomer = () => {
    setEditingIndex(customers.length);
    setFormData({
      id: "",
      name: "",
      family: "",
      phoneNumber: "",
      email: "",
      address: "",
      status: "", // Initialize status field for new customer
    });
    console.log("Adding new customer"); // בדיקת הוספת לקוח חדש
  };

  return (
    <div className={classes.container}>
      <div className={classes.tablef}>
        <h2 className="w-100 d-flex justify-content-center p-3">לקוחות</h2>
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-primary" onClick={handleAddCustomer}>
            <img src={addIcon} alt="Add" className={classes.icon} /> הוספת לקוח
          </button>
          <SearchBar searchVal={search} setSearchVal={setSearch} />
        </div>
        <table className={`table ${classes.table}`}>
          <thead>
            <tr>
              <th>פעולות</th>
              <th>מספר הצעות</th>
              <th>כתובת</th>
              <th>מייל</th>
              <th>טלפון</th>
              <th>שם משפחה</th>
              <th>שם</th>
              <th>ת.ז</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((data, i) => (
              <tr key={i}>
                <td>
                  {editingIndex === i ? (
                    <>
                      <img
                        src={saveIcon}
                        alt="Save"
                        className={classes.icon}
                        onClick={handleSave}
                      />
                      <img
                        src={closeIcon}
                        alt="Cancel"
                        className={classes.icon}
                        onClick={handleCancel}
                      />
                    </>
                  ) : (
                    <img
                      src={editIcon}
                      alt="Edit"
                      className={classes.icon}
                      onClick={() => handleEdit(i, data)}
                    />
                  )}
                </td>
                <td>{data.bidCount}</td>
                <td>
                  {editingIndex === i ? (
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="כתובת"
                      className={`form-control ${
                        errors.address ? "is-invalid" : ""
                      }`}
                    />
                  ) : (
                    data.address
                  )}
                  {errors.address && (
                    <div className="invalid-feedback">{errors.address}</div>
                  )}
                </td>
                <td>
                  {editingIndex === i ? (
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="מייל"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                    />
                  ) : (
                    data.email
                  )}
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </td>
                <td>
                  {editingIndex === i ? (
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="טלפון"
                      className={`form-control ${
                        errors.phoneNumber ? "is-invalid" : ""
                      }`}
                    />
                  ) : (
                    data.phoneNumber
                  )}
                  {errors.phoneNumber && (
                    <div className="invalid-feedback">{errors.phoneNumber}</div>
                  )}
                </td>
                <td>
                  {editingIndex === i ? (
                    <input
                      type="text"
                      name="family"
                      value={formData.family}
                      onChange={handleChange}
                      placeholder="שם משפחה"
                      className={`form-control ${
                        errors.family ? "is-invalid" : ""
                      }`}
                    />
                  ) : (
                    data.family
                  )}
                  {errors.family && (
                    <div className="invalid-feedback">{errors.family}</div>
                  )}
                </td>
                <td>
                  {editingIndex === i ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="שם"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                    />
                  ) : (
                    data.name
                  )}
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </td>
                <td>
                  {editingIndex === i ? (
                    <input
                      type="text"
                      name="id"
                      value={formData.id}
                      onChange={handleChange}
                      placeholder="ת.ז"
                      className={`form-control ${
                        errors.id ? "is-invalid" : ""
                      }`}
                      disabled={editingIndex === customers.length}
                    />
                  ) : (
                    data.id
                  )}
                  {errors.id && (
                    <div className="invalid-feedback">{errors.id}</div>
                  )}
                </td>
              </tr>
            ))}
            {editingIndex === customers.length && (
              <tr>
                <td>
                  <img
                    src={saveIcon}
                    alt="Save"
                    className={classes.icon}
                    onClick={handleSave}
                  />
                  <img
                    src={closeIcon}
                    alt="Cancel"
                    className={classes.icon}
                    onClick={handleCancel}
                  />
                </td>
                <td>{formData.bidCount || 0}</td>
                <td>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="כתובת"
                    className={`form-control ${
                      errors.address ? "is-invalid" : ""
                    }`}
                  />
                  {errors.address && (
                    <div className="invalid-feedback">{errors.address}</div>
                  )}
                </td>
                <td>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="מייל"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </td>
                <td>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="טלפון"
                    className={`form-control ${
                      errors.phoneNumber ? "is-invalid" : ""
                    }`}
                  />
                  {errors.phoneNumber && (
                    <div className="invalid-feedback">{errors.phoneNumber}</div>
                  )}
                </td>
                <td>
                  <input
                    type="text"
                    name="family"
                    value={formData.family}
                    onChange={handleChange}
                    placeholder="שם משפחה"
                    className={`form-control ${
                      errors.family ? "is-invalid" : ""
                    }`}
                  />
                  {errors.family && (
                    <div className="invalid-feedback">{errors.family}</div>
                  )}
                </td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="שם"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </td>
                <td>
                  <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="ת.ז"
                    className={`form-control ${errors.id ? "is-invalid" : ""}`}
                  />
                  {errors.id && (
                    <div className="invalid-feedback">{errors.id}</div>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="pagination">
          {[
            ...Array(Math.ceil(filteredCustomers.length / rowsPerPage)).keys(),
          ].map((number) => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={`page-link ${
                currentPage === number + 1 ? "active" : ""
              }`}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Customer;
