import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./searchBar/SearchBar";
import editIcon from '../img/icon/edit.png';
import saveIcon from '../img/icon/save.png';
import closeIcon from '../img/icon/close.png';
import addIcon from '../img/icon/add.png';
import classes from '../css/table.module.css';

const Glass = () => {
  const [glass, setGlass] = useState([]);
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ glassType: "", Thickness: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  useEffect(() => {
    const fetchAllGlass = async () => {
      try {
        const res = await axios.get("/glass");
        setGlass(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllGlass();
  }, []);

  const handleEdit = (index, data) => {
    setEditingIndex(index);
    setFormData({ ...data });
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setFormData({ glassType: "", Thickness: "" });
  };

  const handleSave = async () => {
    if (!formData.glassType || !formData.Thickness) {
      alert("Both fields are required.");
      return;
    }

    try {
      let endpoint = `/update/${formData.glassType}`;
      console.log('PUT request to:', endpoint);

      if (editingIndex !== null && editingIndex < glass.length) {
        // Update existing glass
        console.log('Updating glass:', formData);
        await axios.put(endpoint, formData);
        const updatedGlass = glass.map((item, index) =>
          index === editingIndex ? formData : item
        );
        setGlass(updatedGlass);
      } else {
        // Add new glass
        console.log('Adding new glass:', formData);
        const res = await axios.post("/create", formData);
        setGlass([...glass, res.data.data]);
      }
      handleCancel();
    } catch (err) {
      console.error('Error saving glass:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const filteredGlasses = glass.filter((data) =>
    (data.glassType || "").toString().includes(search)
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredGlasses.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddGlass = () => {
    setEditingIndex(glass.length);
    setFormData({ glassType: "", Thickness: "" });
  };

  return (
    <div className={classes.container}>
      <div className={classes.tablef}>
        <h2 className="w-100 d-flex justify-content-center p-3">זכוכית</h2>
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-primary" onClick={handleAddGlass}>
            <img src={addIcon} alt="Add" className={classes.icon} /> הוספת זכוכית
          </button>
          <SearchBar searchVal={search} setSearchVal={setSearch} />
        </div>
        <table className={`table ${classes.table}`}>
          <thead>
            <tr>
              <th>פעולות</th>
              <th>עובי</th>
              <th>סוג זכוכית</th>
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
                      name="Thickness"
                      value={formData.Thickness}
                      onChange={handleChange}
                      placeholder="עובי"
                      className="form-control"
                    />
                  ) : (
                    data.Thickness
                  )}
                </td>
                <td>
                  {editingIndex === i ? (
                    <input
                      type="text"
                      name="glassType"
                      value={formData.glassType}
                      onChange={handleChange}
                      placeholder="סוג זכוכית"
                      className="form-control"
                      disabled={formData.glassType !== ""}
                    />
                  ) : (
                    data.glassType
                  )}
                </td>
              </tr>
            ))}
            {editingIndex === glass.length && (
              <tr>
                <td>
                  <img src={saveIcon} alt="Save" className={classes.icon} onClick={handleSave} />
                  <img src={closeIcon} alt="Cancel" className={classes.icon} onClick={handleCancel} />
                </td>
                <td>
                  <input
                    type="text"
                    name="Thickness"
                    value={formData.Thickness}
                    onChange={handleChange}
                    placeholder="עובי"
                    className="form-control"
                  />
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
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="pagination">
          {[...Array(Math.ceil(filteredGlasses.length / rowsPerPage)).keys()].map(number => (
            <button key={number + 1} onClick={() => paginate(number + 1)} className="page-link">
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Glass;
