import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../searchBar/SearchBar.jsx";
import editIcon from "../../img/icon/edit.png";
import saveIcon from "../../img/icon/save.png";
import closeIcon from "../../img/icon/close.png";
import addIcon from "../../img/icon/add.png";
import classes from "../../css/table.module.css";
import Validation from "../../js/validations/FoamValidation";

const Foam = () => {
  const [foam, setFoam] = useState([]);
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    foamType: "",
    foamId: "",
    status: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [displayActiveOnly, setDisplayActiveOnly] = useState(1);
  const [message, setMessage] = useState({});
  const rowsPerPage = 7;

  useEffect(() => {
    const fetchAllFoams = async () => {
      try {
        const res = await axios.get("/foam");
        setFoam(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllFoams();
  }, []);

  const handleEdit = (index, data) => {
    setEditingIndex(index);
    setFormData({ ...data });
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setFormData({ foamType: "", foamId: "", status: 1 });
    setErrors({});
  };

  const handleSave = async () => {
    try {
      const validationErrors = Validation(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      let updatedFoam;
      if (formData.foamId && editingIndex !== foam.length) {
        await axios.put(`/updateFoam/${formData.foamId}`, formData);
        const updatedFoams = [...foam];
        updatedFoams[editingIndex] = formData;
        setFoam(updatedFoams);
        updatedFoam = formData;
      } else {
        const res = await axios.post("/createFoam", formData);
        setFoam([...foam, res.data]);
        updatedFoam = res.data;
        window.location.reload();
      }

      handleCancel();
    } catch (err) {
      console.error("Error saving foam:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleActivateFoam = async (item) => {
    try {
      const newStatus = item.status === 1 ? 0 : 1;
      const res = await axios.put(`/updateFoam/${item.foamId}`, {
        ...item,
        status: newStatus,
      });
      if (res.status === 200) {
        const updatedFoam = foam.map((f) =>
          f.foamId === item.foamId ? { ...f, status: newStatus } : f
        );
        setFoam(updatedFoam);
        setMessage({
          msgClass: "success",
          text:
            newStatus === 1
              ? "Foam activated successfully!"
              : "Foam deactivated successfully!",
        });
        setTimeout(() => setMessage({}), 2000);
      } else {
        setMessage({ msgClass: "error", text: "Failed to update foam status" });
      }
    } catch (err) {
      console.error("Error updating foam status:", err);
      setMessage({ msgClass: "error", text: "Failed to update foam status" });
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

  const filteredFoams = foam
    .filter((data) => (data.foamId || "").toString().includes(search))
    .filter((item) =>
      displayActiveOnly === null ? true : item.status === displayActiveOnly
    );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredFoams.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddFoam = () => {
    setEditingIndex(foam.length);
    setFormData({ foamType: "", foamId: "", status: 1 });
  };

  return (
    <div className={classes.container}>
      <div className={classes.tablef}>
        <h2 className="w-100 d-flex justify-content-center p-3">פרזול</h2>
        <div className={classes.controls}>
          <button className="btn btn-primary" onClick={handleAddFoam}>
            <img src={addIcon} alt="Add" className={classes.icon} /> הוספת פרזול
            חדש
          </button>
          <div>
            <select onChange={handleChangeDisplay} className="form-select">
              <option value="active">פעילות</option>
              <option value="inactive">לא פעילות</option>
              <option value="">הכל</option>
            </select>
          </div>
          <SearchBar searchVal={search} setSearchVal={setSearch} className="search-bar" />
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
              <th>סוג פרזול</th>
              <th>מ'קט</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((data, index) => (
              <tr key={data.foamId || `newFoam-${index}`}>
                <td>
                  {editingIndex === index ? (
                    <div>
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
                    </div>
                  ) : (
                    <div>
                      <img
                        src={editIcon}
                        alt="Edit"
                        className={classes.icon}
                        onClick={() => handleEdit(index, data)}
                      />
                      <button
                        className="btn btn-link p-0"
                        onClick={() => handleActivateFoam(data)}
                      >
                        שנה סטטוס
                      </button>
                    </div>
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
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
                  {editingIndex === index ? (
                    <div>
                      <input
                        type="text"
                        name="foamType"
                        value={formData.foamType}
                        onChange={handleChange}
                        placeholder="סוג פרזול"
                        className="form-control"
                      />
                      {errors.foamType && (
                        <div className="text-danger">{errors.foamType}</div>
                      )}
                    </div>
                  ) : (
                    <div>{data.foamType}</div>
                  )}
                </td>
                <td>{data.foamId}</td>
              </tr>
            ))}
            {editingIndex === foam.length && (
              <tr key={`newFoam-${foam.length}`}>
                <td>
                  <div>
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
                  </div>
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
                  <div>
                    <input
                      type="text"
                      name="foamType"
                      value={formData.foamType}
                      onChange={handleChange}
                      placeholder="סוג פרזול"
                      className="form-control"
                    />
                    {errors.foamType && (
                      <div className="text-danger">{errors.foamType}</div>
                    )}
                  </div>
                </td>
                <td>
                  <input
                    type="text"
                    name="foamId"
                    value={formData.foamId}
                    onChange={handleChange}
                    placeholder="מ'קט"
                    className="form-control"
                  />
                  {errors.foamId && (
                    <div className="text-danger">{errors.foamId}</div>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <nav>
          <ul className="pagination justify-content-center">
            {Array.from({
              length: Math.ceil(filteredFoams.length / rowsPerPage),
            }).map((_, index) => (
              <li key={index + 1} className="page-item">
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

export default Foam;
