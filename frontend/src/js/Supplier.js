import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./searchBar/SearchBar";
import editIcon from "../img/icon/edit.png";
import saveIcon from "../img/icon/save.png";
import closeIcon from "../img/icon/close.png";
import addIcon from "../img/icon/add.png";
import classes from "../css/table.module.css";
import Validation from "../js/validations/SuppliersValidation";

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    address: "",
    contact: "",
    email: "",
    phoneNumber: "",
    name: "",
    id: "", // Ensure id field is initialized
  });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("/supplier");
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleEdit = (index, data) => {
    setEditingIndex(index);
    setFormData({ ...data });
    setErrors({});
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setFormData({
      address: "",
      contact: "",
      email: "",
      phoneNumber: "",
      name: "",
      id: "", // Ensure id field is reset
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
      let updatedSuppliers;

      if (editingIndex !== null && editingIndex < suppliers.length) {
        // Update existing supplier
        endpoint = `/updateSupplier/${formData.id}`;
        await axios.put(endpoint, formData);
        updatedSuppliers = suppliers.map((item, index) =>
          index === editingIndex ? formData : item
        );
      } else {
        // Add new supplier
        const res = await axios.post("/createSupplier", formData);
        updatedSuppliers = [...suppliers, res.data.data];
      }

      setSuppliers(updatedSuppliers);
      handleCancel();
    } catch (err) {
      console.error("Error saving supplier:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const filteredSuppliers = suppliers.filter((supplier) => {
    return supplier && supplier.id
      ? supplier.id.toString().includes(search)
      : false;
  });
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredSuppliers.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddSupplier = () => {
    setEditingIndex(suppliers.length); // Set index to the end to add a new supplier
    setFormData({
      address: "",
      contact: "",
      email: "",
      phoneNumber: "",
      name: "",
      id: "", // Ensure id field is initialized
    });
    setErrors({});
  };

  return (
    <div className={classes.container}>
      <div className={classes.tablef}>
        <h2 className="w-100 d-flex justify-content-center p-3">ספקים</h2>
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-primary" onClick={handleAddSupplier}>
            <img src={addIcon} alt="Add" className={classes.icon} /> הוספת ספק
            חדש
          </button>
          <SearchBar searchVal={search} setSearchVal={setSearch} />
        </div>
        <table className={`table ${classes.table}`}>
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
            {currentRows.map((supplier, index) => (
              <tr key={index}>
                <td>
                  {editingIndex === index ? (
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
                      onClick={() => handleEdit(index, supplier)}
                    />
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
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
                    supplier.address
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <>
                      <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder="איש קשר"
                        className={`form-control ${
                          errors.contact ? "is-invalid" : ""
                        }`}
                      />
                      {errors.contact && (
                        <div className="invalid-feedback">{errors.contact}</div>
                      )}
                    </>
                  ) : (
                    supplier.contact
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <>
                      <input
                        type="email"
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
                    supplier.email
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <>
                      <input
                        type="tel"
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
                    supplier.phoneNumber
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="שם מפעל"
                        className={`form-control ${
                          errors.name ? "is-invalid" : ""
                        }`}
                      />
                      {errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )}
                    </>
                  ) : (
                    supplier.name
                  )}
                </td>
                <td>{supplier.id}</td>
              </tr>
            ))}
            {editingIndex === suppliers.length && (
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
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="איש קשר"
                    className={`form-control ${
                      errors.contact ? "is-invalid" : ""
                    }`}
                  />
                  {errors.contact && (
                    <div className="invalid-feedback">{errors.contact}</div>
                  )}
                </td>
                <td>
                  <input
                    type="email"
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
                    type="tel"
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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="שם מפעל"
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
            ...Array(Math.ceil(filteredSuppliers.length / rowsPerPage)).keys(),
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

export default Supplier;
