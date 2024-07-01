import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "./searchBar/SearchBar";
import editIcon from '../img/icon/edit.png';
import saveIcon from '../img/icon/save.png';
import closeIcon from '../img/icon/close.png';
import addIcon from '../img/icon/add.png';
import classes from '../css/table.module.css';

const Foam = () => {
  const [foam, setFoam] = useState([]);
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ foamType: "", foamId: "" });
  const [currentPage, setCurrentPage] = useState(1);
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
    setFormData({ foamType: "", foamId: "" });
  };

  const handleSave = async () => {
    if (!formData.foamType) {
      alert("Foam Type is required.");
      return;
    }

    try {
      let endpoint = `/updateFoam/${formData.foamId}`;

      if (editingIndex !== null && editingIndex < foam.length) {
        await axios.put(endpoint, { foamType: formData.foamType });
        const updatedFoam = foam.map((item, index) =>
          index === editingIndex ? { ...item, foamType: formData.foamType } : item
        );
        setFoam(updatedFoam);
      } else {
        const res = await axios.post("/createFoam", formData);
        setFoam([...foam, res.data]);
      }
      handleCancel();
    } catch (err) {
      console.error('Error saving foam:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const filteredFoams = foam.filter((data) =>
    (data.foamType || "").toString().includes(search)
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredFoams.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddFoam = () => {
    setEditingIndex(foam.length);
    setFormData({ foamType: "", foamId: "" });
  };

  return (
    <div className={classes.container}>
      <div className={classes.tablef}>
        <h2 className="w-100 d-flex justify-content-center p-3">פרזול</h2>
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-primary" onClick={handleAddFoam}>
            <img src={addIcon} alt="Add" className={classes.icon} /> הוספת פרזול חדש
          </button>
          <SearchBar searchVal={search} setSearchVal={setSearch} />
        </div>
        <table className={`table ${classes.table}`}>
          <thead>
            <tr>
              <th>פעולות</th>
              <th>סוג פרזול</th>
              <th>מ'קט</th>
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
                      name="foamType"
                      value={formData.foamType}
                      onChange={handleChange}
                      placeholder="סוג פרזול"
                      className="form-control"
                    />
                  ) : (
                    data.foamType
                  )}
                </td>
                <td>{data.foamId}</td>
              </tr>
            ))}
            {editingIndex === foam.length && (
              <tr>
                <td>
                  <img src={saveIcon} alt="Save" className={classes.icon} onClick={handleSave} />
                  <img src={closeIcon} alt="Cancel" className={classes.icon} onClick={handleCancel} />
                </td>
                <td>
                  <input
                    type="text"
                    name="foamType"
                    value={formData.foamType}
                    onChange={handleChange}
                    placeholder="סוג פרזול"
                    className="form-control"
                  />
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
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="pagination">
          {[...Array(Math.ceil(filteredFoams.length / rowsPerPage)).keys()].map(number => (
            <button key={number + 1} onClick={() => paginate(number + 1)} className="page-link">
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Foam;
