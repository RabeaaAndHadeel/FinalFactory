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
  });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  useEffect(() => {
    const fetchAllCustomers = async () => {
      try {
        const res = await axios.get("/customer");
        setCustomers(res.data);
      } catch (err) {
        console.error("Error fetching customers:", err);
      }
    };
    fetchAllCustomers();
  }, []);

  const handleEdit = (index, data) => {
    setEditingIndex(index);
    setFormData({ ...data });
    setErrors({});
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
    });
    setErrors({});
  };

  const handleSave = async () => {
    const validationErrors = Validation(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
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
    } catch (err) {
      console.error("Error saving customer:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for the field being edited
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const filteredCustomers = customers.filter((data) => {
    return data?.id?.toString().includes(search);
  });

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
    });
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
                    <>
                      <img
                        src={editIcon}
                        alt="Edit"
                        className={classes.icon}
                        onClick={() => handleEdit(i, data)}
                      />
                    </>
                  )}
                </td>
                <td>
                  {editingIndex === i ? (
                    <>
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
                    </>
                  ) : (
                    data.address
                  )}
                </td>
                <td>
                  {editingIndex === i ? (
                    <>
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
                    </>
                  ) : (
                    data.email
                  )}
                </td>
                <td>
                  {editingIndex === i ? (
                    <>
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
                        <div className="invalid-feedback">
                          {errors.phoneNumber}
                        </div>
                      )}
                    </>
                  ) : (
                    data.phoneNumber
                  )}
                </td>
                <td>
                  {editingIndex === i ? (
                    <>
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
                    </>
                  ) : (
                    data.family
                  )}
                </td>
                <td>
                  {editingIndex === i ? (
                    <>
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
                    </>
                  ) : (
                    data.name
                  )}
                </td>
                <td>
                  {editingIndex === i ? (
                    <>
                      <input
                        type="text"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        placeholder="ת.ז"
                        className={`form-control ${
                          errors.id ? "is-invalid" : ""
                        }`}
                        disabled={formData.id !== ""}
                      />
                      {errors.id && (
                        <div className="invalid-feedback">{errors.id}</div>
                      )}
                    </>
                  ) : (
                    data.id
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
              className="page-link"
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
