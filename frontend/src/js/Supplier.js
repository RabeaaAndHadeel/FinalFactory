import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./searchBar/SearchBar";
import editIcon from '../img/icon/edit.png';
import saveIcon from '../img/icon/save.png';
import closeIcon from '../img/icon/close.png';
import addIcon from '../img/icon/add.png';
import classes from '../css/table.module.css';

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ address: "", contact: "", email: "", phone: "", name: "", id: "" });
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
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setFormData({ address: "", contact: "", email: "", phone: "", name: "", id: "" });
  };

  const handleSave = async () => {
    if (!formData.address || !formData.contact || !formData.email || !formData.phone || !formData.name || !formData.id) {
      alert("All fields are required.");
      return;
    }

    try {
      let endpoint = `/updateSupplier/${formData.id}`;
      console.log('PUT request to:', endpoint);
      if (editingIndex !== null && editingIndex < suppliers.length) {
        // Update existing supplier
        await axios.put(endpoint, formData);
        const updatedSuppliers = suppliers.map((item, index) =>
          index === editingIndex ? formData : item
        );
        setSuppliers(updatedSuppliers);
      } else {
        // Add new supplier
        const res = await axios.post("/createSupplier", formData);
        setSuppliers([...suppliers, res.data.data]);
      }
      handleCancel();
    } catch (err) {
      console.error('Error saving supplier:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.id.toString().includes(search)
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredSuppliers.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddSupplier = () => {
    setEditingIndex(suppliers.length); // Set index to the end to add a new supplier
    setFormData({ address: "", contact: "", email: "", phone: "", name: "", id: "" });
  };

  return (
    <div className={classes.container}>
      <div className={classes.tablef}>
        <h2 className="w-100 d-flex justify-content-center p-3">ספקים</h2>
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-primary" onClick={handleAddSupplier}>
            <img src={addIcon} alt="Add" className={classes.icon} /> הוספת ספק חדש
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
                      <img src={saveIcon} alt="Save" className={classes.icon} onClick={handleSave} />
                      <img src={closeIcon} alt="Cancel" className={classes.icon} onClick={handleCancel} />
                    </>
                  ) : (
                    <>
                      <img
                        src={editIcon}
                        alt="Edit"
                        className={classes.icon}
                        onClick={() => handleEdit(index, supplier)}
                      />
                    </>
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="כתובת"
                      className="form-control"
                    />
                  ) : (
                    supplier.address
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder="איש קשר"
                      className="form-control"
                    />
                  ) : (
                    supplier.contact
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="מייל"
                      className="form-control"
                    />
                  ) : (
                    supplier.email
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="טלפון"
                      className="form-control"
                    />
                  ) : (
                    supplier.phone
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="שם מפעל"
                      className="form-control"
                    />
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
                  <img src={saveIcon} alt="Save" className={classes.icon} onClick={handleSave} />
                  <img src={closeIcon} alt="Cancel" className={classes.icon} onClick={handleCancel} />
                </td>
                <td>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="כתובת"
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="איש קשר"
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="מייל"
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="טלפון"
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="שם מפעל"
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="ת.ז"
                    className="form-control"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="pagination">
          {[...Array(Math.ceil(filteredSuppliers.length / rowsPerPage)).keys()].map((number) => (
            <button key={number + 1} onClick={() => paginate(number + 1)} className="page-link">
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Supplier;
