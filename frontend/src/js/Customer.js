import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./searchBar/SearchBar";
import editIcon from '../img/icon/edit.png';
import saveIcon from '../img/icon/save.png';
import closeIcon from '../img/icon/close.png';
import addIcon from '../img/icon/add.png';
import classes from '../css/table.module.css';

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    family: "",
    phoneNumber: "",
    email: "",
    address: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  useEffect(() => {
    const fetchAllCustomers = async () => {
      try {
        const res = await axios.get("/customer");
        setCustomers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCustomers();
  }, []);

  const handleEdit = (index, data) => {
    setEditingIndex(index);
    setFormData({ ...data });
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setFormData({
      id: "",
      name: "",
      family: "",
      phoneNumber: "",
      email: "",
      address: ""
    });
  };

  const handleSave = async () => {
    if (!formData.id || !formData.name || !formData.family || !formData.phoneNumber || !formData.email || !formData.address) {
      alert("All fields are required.");
      return;
    }

    try {
      let endpoint = `/customer/${formData.id}`;
      console.log('Endpoint:', endpoint);
      console.log('Form data:', formData);

      if (editingIndex !== null && editingIndex < customers.length) {
        console.log('PUT request to:', endpoint);
        await axios.put(endpoint, formData);
        const updatedCustomers = customers.map((item, index) =>
          index === editingIndex ? formData : item
        );
        setCustomers(updatedCustomers);
      } else {
        console.log('Adding new customer', formData);
        const res = await axios.post("/createCustomer", formData);
        setCustomers([...customers, res.data]);
      }
      handleCancel();
    } catch (err) {
      console.error('Error saving customer:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const filteredCustomers = customers.filter((data) =>
    (data.id || "").toString().includes(search)
  );

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
      address: ""
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
                      <img src={saveIcon} alt="Save" className={classes.icon} onClick={handleSave} />
                      <img src={closeIcon} alt="Cancel" className={classes.icon} onClick={handleCancel} />
                    </>
                  ) : (
                    <>
                      <img src={editIcon} alt="Edit" className={classes.icon} onClick={() => handleEdit(i, data)} />
                    </>
                  )}
                </td>
                <td>
                  {editingIndex === i ? (
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="כתובת"
                      className="form-control"
                    />
                  ) : (
                    data.address
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
                      className="form-control"
                    />
                  ) : (
                    data.email
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
                      className="form-control"
                    />
                  ) : (
                    data.phoneNumber
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
                      className="form-control"
                    />
                  ) : (
                    data.family
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
                      className="form-control"
                    />
                  ) : (
                    data.name
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
                      className="form-control"
                      disabled={formData.id !== ""}
                    />
                  ) : (
                    data.id
                  )}
                </td>
              </tr>
            ))}
            {editingIndex === customers.length && (
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="מייל"
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="טלפון"
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="family"
                    value={formData.family}
                    onChange={handleChange}
                    placeholder="שם משפחה"
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="שם"
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
          {[...Array(Math.ceil(filteredCustomers.length / rowsPerPage)).keys()].map(number => (
            <button key={number + 1} onClick={() => paginate(number + 1)} className="page-link">
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Customer;
