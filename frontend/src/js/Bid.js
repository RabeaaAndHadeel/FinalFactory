import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./searchBar/SearchBar";
import editIcon from "../img/icon/edit.png";
import saveIcon from "../img/icon/save.png";
import closeIcon from "../img/icon/close.png";
import addIcon from "../img/icon/add.png";
import classes from "../css/table.module.css";
import BidValidation from "../js/validations/BidValidation";

const Bid = () => {
  const [bid, setBid] = useState([]);
  const [message, setMessage] = useState({});
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    number: "",
    customersId: "",
    profileType: "",
    VAT: "",
    total: "",
    date: "",
    status: 1, // Initialize status
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [displayActiveOnly, setDisplayActiveOnly] = useState(1); // Initialize to show active bids
  const rowsPerPage = 7;

  useEffect(() => {
    fetchBid();
  }, []);

  const fetchBid = async () => {
    try {
      const response = await axios.get("/bid");
      setBid(response.data);
    } catch (error) {
      console.error("Error fetching bids:", error);
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
      date: "",
      status: 0,
    });
    setErrors({});
  };

  const handleSave = async () => {
    try {
      const validationErrors = BidValidation(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      let endpoint = `/updateBid/${formData.number}`;
      console.log("PUT request to:", endpoint);
      if (editingIndex !== null && editingIndex < bid.length) {
        // Update existing bid
        await axios.put(endpoint, formData);
        const updatedBid = bid.map((item, index) =>
          index === editingIndex ? formData : item
        );
        setBid(updatedBid);
      } else {
        // Add new bid
        const res = await axios.post("/createBid", formData);
        setBid([...bid, res.data.data]);
      }
      handleCancel();
    } catch (err) {
      console.error("Error saving bid:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear validation error for the field being edited
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleActivateTable = async (table) => {
    try {
      const newStatus = table.status === 1 ? 0 : 1; // Toggle status between 0 and 1
      const res = await axios.put(`/bid/${table.number}`, {
        ...table,
        status: newStatus,
      });
      if (res.status === 200) {
        const updatedData = bid.map((item) =>
          item.number === table.number ? { ...item, status: newStatus } : item
        );
        setBid(updatedData);
        setMessage({
          msgClass: "success",
          text:
            newStatus === 1
              ? "Bid activated successfully!"
              : "Bid deactivated successfully!",
        });
        setTimeout(() => {
          setMessage({});
        }, 2000);
      } else {
        setMessage({
          msgClass: "error",
          text: "Failed to update bid status",
        });
      }
    } catch (error) {
      console.error("Error updating bid status:", error);
      setMessage({
        msgClass: "error",
        text: "Failed to update bid status",
      });
    }
  };

  const handleChangeDisplay = (event) => {
    const option = event.target.value;
    if (option === "active") {
      setDisplayActiveOnly(1);
    } else if (option === "inactive") {
      setDisplayActiveOnly(0);
    } else {
      setDisplayActiveOnly(null);
    }
  };

  const filteredBid = bid
    .filter((quote) => quote.number.toString().includes(search))
    .filter((bid) => {
      if (displayActiveOnly === null) return true;
      return displayActiveOnly ? bid.status === 1 : bid.status === 0;
    });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredBid.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddBid = () => {
    setEditingIndex(bid.length); // Set index to the end to add a new bid
    setFormData({
      number: "",
      customersId: "",
      profileType: "",
      VAT: "",
      total: "",
      date: "",
      status: 1,
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.tablef}>
        <h2 className="w-100 d-flex justify-content-center p-3">הצעות מחיר</h2>
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-primary" onClick={handleAddBid}>
            <img src={addIcon} alt="Add" className={classes.icon} /> הוספת הצעת
            מחיר חדשה
          </button>
          <div>
            <select onChange={handleChangeDisplay} className="form-select">
              <option value="">הכל</option>
              <option value="active">פעילות</option>
              <option value="inactive">לא פעילות</option>
            </select>
          </div>
          <SearchBar searchVal={search} setSearchVal={setSearch} />
        </div>
        {message.text && (
          <div
            className={`alert ${
              message.msgClass === "success" ? "alert-success" : "alert-danger"
            }`}
          >
            {message.text}
          </div>
        )}
        <table className={`table ${classes.table}`}>
          <thead>
            <tr>
              <th>פעולות</th>
              <th>סטטוס</th>
              <th>תאריך</th>
              <th>סכום סופי</th>
              <th>מע"ם</th>
              <th>סוג פרופיל</th>
              <th>ת.ז לקוח</th>
              <th>מספר הצעה</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((quote, index) => (
              <tr key={quote.number}>
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
                      onClick={() => handleEdit(index, quote)}
                    />
                  )}
                </td>
                <td>
                  <button
                    className={`btn ${
                      quote.status === 1 ? "btn-success" : "btn-danger"
                    }`}
                    onClick={() => handleActivateTable(quote)}
                  >
                    {quote.status === 1 ? "Active" : "Inactive"}
                  </button>
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={`form-control ${
                        errors.date ? "is-invalid" : ""
                      }`}
                    />
                  ) : (
                    new Date(quote.date).toLocaleDateString()
                  )}
                  {errors.date && (
                    <div className="invalid-feedback">{errors.date}</div>
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
                      className={`form-control ${
                        errors.total ? "is-invalid" : ""
                      }`}
                    />
                  ) : (
                    quote.total
                  )}
                  {errors.total && (
                    <div className="invalid-feedback">{errors.total}</div>
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
                      className={`form-control ${
                        errors.VAT ? "is-invalid" : ""
                      }`}
                    />
                  ) : (
                    quote.VAT
                  )}
                  {errors.VAT && (
                    <div className="invalid-feedback">{errors.VAT}</div>
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
                      className={`form-control ${
                        errors.profileType ? "is-invalid" : ""
                      }`}
                    />
                  ) : (
                    quote.profileType
                  )}
                  {errors.profileType && (
                    <div className="invalid-feedback">{errors.profileType}</div>
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
                      className={`form-control ${
                        errors.customersId ? "is-invalid" : ""
                      }`}
                    />
                  ) : (
                    quote.customersId
                  )}
                  {errors.customersId && (
                    <div className="invalid-feedback">{errors.customersId}</div>
                  )}
                </td>
                <td>{quote.number}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav>
          <ul className="pagination justify-content-center">
            {Array.from({
              length: Math.ceil(filteredBid.length / rowsPerPage),
            }).map((_, index) => (
              <li key={index} className="page-item">
                <button
                  onClick={() => paginate(index + 1)}
                  className="page-link"
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Bid;
