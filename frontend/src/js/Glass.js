import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./searchBar/SearchVal";
import editIcon from "../img/icon/edit.png";
import saveIcon from "../img/icon/save.png";
import closeIcon from "../img/icon/close.png";
import addIcon from "../img/icon/add.png";
import classes from "../css/table.module.css";
import GlassValidation from "../js/validations/GlassValidation";

const Glass = () => {
  const [glass, setGlass] = useState([]);
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    glassType: "",
    Thickness: "",
    status: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [displayActiveOnly, setDisplayActiveOnly] = useState(1);
  const [message, setMessage] = useState({});

  const rowsPerPage = 7;

  useEffect(() => {
    fetchAllGlass();
  }, []);

  const fetchAllGlass = async () => {
    try {
      const res = await axios.get("/glass");
      setGlass(res.data);
    } catch (err) {
      console.error("Error fetching glass:", err);
    }
  };

  const handleEdit = (index, data) => {
    setEditingIndex(index);
    setFormData({ ...data });
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setFormData({ glassType: "", Thickness: "", status: 1 });
    setErrors({});
  };

  const handleSave = async () => {
    try {
      const validationErrors = GlassValidation(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      if (editingIndex !== null && editingIndex !== glass.length) {
        await axios.put(`/update/${formData.glassType}`, formData);
        const updatedGlasses = [...glass];
        updatedGlasses[editingIndex] = formData;
        setGlass(updatedGlasses);
      } else {
        const res = await axios.post("/create", formData);
        setGlass([...glass, res.data.data]);
      }

      handleCancel();
    } catch (err) {
      console.error("Error saving glass:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleActivateTable = async (table) => {
    try {
      const newStatus = table.status === 1 ? 0 : 1;
      const res = await axios.put(`/update/${table.glassType}`, {
        ...table,
        status: newStatus,
      });
      if (res.status === 200) {
        const updatedData = glass.map((item) =>
          item.glassType === table.glassType
            ? { ...item, status: newStatus }
            : item
        );
        setGlass(updatedData);
        setMessage({
          msgClass: "success",
          text:
            newStatus === 1
              ? "Glass activated successfully!"
              : "Glass deactivated successfully!",
        });
        setTimeout(() => {
          setMessage({});
        }, 2000);
      } else {
        setMessage({
          msgClass: "error",
          text: "Failed to update glass status",
        });
      }
    } catch (error) {
      console.error("Error updating glass status:", error);
      setMessage({
        msgClass: "error",
        text: "Failed to update glass status",
      });
    }
  };

  const handleChangeDisplay = (event) => {
    const option = event.target.value;
    if (option === "active") {
      setDisplayActiveOnly(true);
    } else if (option === "inactive") {
      setDisplayActiveOnly(false);
    } else {
      setDisplayActiveOnly(null);
    }
  };

  const filteredGlasses = glass
    .filter((data) =>
      data.glassType.toLowerCase().includes(search.toLowerCase())
    )
    .filter((glassItem) => {
      if (displayActiveOnly === null) return true;
      return displayActiveOnly
        ? glassItem.status === 1
        : glassItem.status === 0;
    });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredGlasses.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddGlass = () => {
    setEditingIndex(glass.length);
    setFormData({ glassType: "", Thickness: "", status: 1 });
  };

  return (
    <div className={classes.container}>
      <div className={classes.tablef}>
        <h2 className="w-100 d-flex justify-content-center p-3">זכוכית</h2>
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-primary" onClick={handleAddGlass}>
            <img src={addIcon} alt="Add" className={classes.icon} /> הוספת
            זכוכית
          </button>
          <div>
            <select onChange={handleChangeDisplay} className="form-select">
              <option value="active">פעילות</option>
              <option value="inactive">לא פעילות</option>
              <option value="">הכל</option>
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
              <th>עובי ב מ"מ</th>
              <th>סוג זכוכית</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((data, i) => (
              <tr key={`${data.glassType}-${i}`}>
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
                    <div>
                      <img
                        src={editIcon}
                        alt="Edit"
                        className={classes.icon}
                        onClick={() => handleEdit(i, data)}
                      />
                      <button
                        className="btn btn-link p-0"
                        onClick={() => handleActivateTable(data)}
                      >
                        שנה סטטוס
                      </button>
                    </div>
                  )}
                </td>
                <td>
                  {editingIndex === i ? (
                    <input
                      type="text"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      placeholder="סטטוס"
                      className="form-control"
                      disabled
                    />
                  ) : data.status === 1 ? (
                    "פעיל"
                  ) : (
                    "לא פעיל"
                  )}
                </td>
                <td>
                  {editingIndex === i ? (
                    <>
                      <input
                        type="text"
                        name="Thickness"
                        value={formData.Thickness}
                        onChange={handleChange}
                        placeholder="עובי"
                        className="form-control"
                      />
                      {errors.Thickness && (
                        <div className="text-danger">{errors.Thickness}</div>
                      )}
                    </>
                  ) : (
                    data.Thickness
                  )}
                </td>
                <td>
                  {editingIndex === i ? (
                    <>
                      <input
                        type="text"
                        name="glassType"
                        value={formData.glassType}
                        onChange={handleChange}
                        placeholder="סוג זכוכית"
                        className="form-control"
                      />
                      {errors.glassType && (
                        <div className="text-danger">{errors.glassType}</div>
                      )}
                    </>
                  ) : (
                    data.glassType
                  )}
                </td>
              </tr>
            ))}
            {editingIndex === glass.length && (
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
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    placeholder="סטטוס"
                    className="form-control"
                    disabled
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="Thickness"
                    value={formData.Thickness}
                    onChange={handleChange}
                    placeholder="עובי"
                    className="form-control"
                  />
                  {errors.Thickness && (
                    <div className="text-danger">{errors.Thickness}</div>
                  )}
                </td>
                <td>
                  <input
                    type="text"
                    name="glassType"
                    value={formData.glassType}
                    onChange={handleChange}
                    placeholder="סוג זכוכית"
                    className="form-control"
                  />
                  {errors.glassType && (
                    <div className="text-danger">{errors.glassType}</div>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="pagination">
          {[
            ...Array(Math.ceil(filteredGlasses.length / rowsPerPage)).keys(),
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

export default Glass;
