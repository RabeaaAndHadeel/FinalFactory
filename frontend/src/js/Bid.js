import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./searchBar/SearchBar";
import editIcon from '../img/icon/edit.png';
import saveIcon from '../img/icon/save.png';
import closeIcon from '../img/icon/close.png';
import addIcon from '../img/icon/add.png';
import classes from '../css/table.module.css';

const Bid = () => {
  const [bid, setBid] = useState([]);
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ 
    number: "", 
    customersId: "", 
    profileType: "", 
    VAT: "", 
    total: "", 
    date: "" 
  });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  useEffect(() => {
    fetchBid();
  }, []);

  const fetchBid = async () => {
    try {
      const response = await axios.get("/bid");
      setBid(response.data);
    } catch (error) {
      console.error("Error fetching price quotes:", error);
    }
  };

  const handleEdit = (index, data) => {
    setEditingIndex(index);
    setFormData({ ...data });
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setFormData({ 
      number: "", 
      customersId: "", 
      profileType: "", 
      VAT: "", 
      total: "", 
      date: "" 
    });
  };

  const handleSave = async () => {
    if (!formData.number || !formData.customersId || !formData.profileType || !formData.VAT || !formData.total || !formData.date) {
      alert("All fields are required.");
      return;
    }

    try {
      let endpoint = `/updateBid/${formData.number}`;
      console.log('PUT request to:', endpoint);
      if (editingIndex !== null && editingIndex < bid.length) {
        // Update existing price quote
        await axios.put(endpoint, formData);
        const updatedBid = bid.map((item, index) =>
          index === editingIndex ? formData : item
        );
        setBid(updatedBid);
      } else {
        // Add new price quote
        const res = await axios.post("/createBid", formData);
        setBid([...bid, res.data.data]);
      }
      handleCancel();
    } catch (err) {
      console.error('Error saving price quote:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const filteredBid = bid.filter((quote) =>
    quote.number.toString().includes(search)
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredBid.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddBid = () => {
    setEditingIndex(bid.length); // Set index to the end to add a new price quote
    setFormData({ 
      number: "", 
      customersId: "", 
      profileType: "", 
      VAT: "", 
      total: "", 
      date: "" 
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.tablef}>
        <h2 className="w-100 d-flex justify-content-center p-3">הצעות מחיר</h2>
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-primary" onClick={handleAddBid}>
            <img src={addIcon} alt="Add" className={classes.icon} /> הוספת הצעת מחיר חדשה
          </button>
          <SearchBar searchVal={search} setSearchVal={setSearch} />
        </div>
        <table className={`table ${classes.table}`}>
          <thead>
            <tr>
              <th>פעולות</th>
              <th>תאריך</th>
              <th>סכום סופי</th>
              <th>מע"ם</th>
              <th>סוג פרופיל</th>
              <th>ת.ז לקוח</th>
              <th> מספר הצעה</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((quote, index) => (
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
                        onClick={() => handleEdit(index, quote)}
                      />
                    </>
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    new Date(quote.date).toLocaleDateString()
                  )}
                </td>
                   <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="total"
                      value={formData.total}
                      onChange={handleChange}
                      placeholder="סכום כולל"
                      className="form-control"
                    />
                  ) : (
                    quote.total
                  )}
                </td> 
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="VAT"
                      value={formData.VAT}
                      onChange={handleChange}
                      placeholder="מע'ם"
                      className="form-control"
                    />
                  ) : (
                    quote.VAT
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="profileType"
                      value={formData.profileType}
                      onChange={handleChange}
                      placeholder="סוג פרופיל"
                      className="form-control"
                    />
                  ) : (
                    quote.profileType
                  )}
                </td>
              <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="customersId"
                      value={formData.customersId}
                      onChange={handleChange}
                      placeholder="ת.ז לקוח"
                      className="form-control"
                    />
                  ) : (
                    quote.customersId
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                      placeholder=" מספר הצעה"
                      className="form-control"
                    />
                  ) : (
                    quote.number
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {[...Array(Math.ceil(filteredBid.length / rowsPerPage)).keys()].map((number) => (
            <button key={number + 1} onClick={() => paginate(number + 1)} className="page-link">
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bid;
