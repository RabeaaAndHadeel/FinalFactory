import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./searchBar/SearchBar";
import editIcon from '../img/icon/edit.png';
import saveIcon from '../img/icon/save.png';
import closeIcon from '../img/icon/close.png';
import addIcon from '../img/icon/add.png';
import Switch from "react-switch";
import classes from '../css/table.module.css';

const Profile = () => {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ weight: "", perimeter: "", id: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const rowsPerPage = 6;

  useEffect(() => {
    const fetchAllProfiles = async () => {
      try {
        const res = await axios.get("/profile");
        setProfiles(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProfiles();
  }, []);

  const handleEdit = (index, data) => {
    setEditingIndex(index);
    setFormData({ ...data });
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setFormData({ weight: "", perimeter: "", id: "" });
  };

  const handleSave = async () => {
    try {
      if (formData.id && editingIndex !== profiles.length) {
        await axios.put(`/profile/${formData.id}`, formData);
        const updatedProfiles = [...profiles];
        updatedProfiles[editingIndex] = formData;
        setProfiles(updatedProfiles);
      } else {
        const res = await axios.post("/profile", formData);
        setProfiles([...profiles, res.data]);
      }
      handleCancel();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAllRows = (checked) => {
    if (checked) {
      setSelectedRows(profiles.map(profile => profile.id));
    } else {
      setSelectedRows([]);
    }
  };

  const filteredProfiles = profiles.filter((data) =>
    data.id.toString().includes(search)
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredProfiles.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddProfile = () => {
    setEditingIndex(profiles.length);
    setFormData({ weight: "", perimeter: "", id: "" });
  };

  return (
  <div className={classes.container}>
    <div className={classes.tablef}>
      <h2 className="w-100 d-flex justify-content-center p-3">פרופיל</h2>
      <div className="d-flex justify-content-between mb3">
        <button className="btn btn-primary" onClick={handleAddProfile}>
          <img src={addIcon} alt="Add" className={classes.icon} /> הוספת פרופיל
        </button>
        <SearchBar searchVal={search} setSearchVal={setSearch} />
      </div>
      <table className={`table ${classes.table}`}>
        <thead>
          <tr>
            <th>
              <Switch
                onChange={handleSelectAllRows}
                checked={selectedRows.length === profiles.length}
                checkedIcon={false}
                uncheckedIcon={false}
                onColor="#FF0000"
                offColor="#059212"
              />
            </th>
            <th>פעולות</th>
            <th>משקל</th>
            <th>היקף</th>
            <th>מק"ט</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((data, i) => (
            <tr key={i}>
              <td>
                <Switch
                  onChange={() => handleSelectRow(data.id)}
                  checked={selectedRows.includes(data.id)}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  onColor="#FF0000"
                  offColor="#059212"
                />
              </td>
              <td>
                {editingIndex === i ? (
                  <>
                    <img src={saveIcon} alt="Save" className={classes.icon} onClick={handleSave} />
                    <img src={closeIcon} alt="Cancel" className={classes.icon} onClick={handleCancel} />
                  </>
                ) : (
                  <img src={editIcon} alt="Edit" className={classes.icon} onClick={() => handleEdit(i, data)} />
                )}
              </td>
              <td>
                {editingIndex === i ? (
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="משקל"
                    className="form-control"
                  />
                ) : (
                  data.weight
                )}
              </td>
              <td>
                {editingIndex === i ? (
                  <input
                    type="text"
                    name="perimeter"
                    value={formData.perimeter}
                    onChange={handleChange}
                    placeholder="היקף"
                    className="form-control"
                  />
                ) : (
                  data.perimeter
                )}
              </td>
              <td>
                {editingIndex === i ? (
                  <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="מק'ט"
                    className="form-control"
                    disabled={formData.id !== ""}
                  />
                ) : (
                  data.id
                )}
              </td>
            </tr>
          ))}
          {editingIndex === profiles.length && (
            <tr>
              <td>
                <img src={saveIcon} alt="Save" className={classes.icon} onClick={handleSave} />
                <img src={closeIcon} alt="Cancel" className={classes.icon} onClick={handleCancel} />
              </td>
              <td>
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="משקל"
                  className="form-control"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="perimeter"
                  value={formData.perimeter}
                  onChange={handleChange}
                  placeholder="היקף"
                  className="form-control"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  placeholder="מק'ט"
                  className="form-control"
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        {[...Array(Math.ceil(filteredProfiles.length / rowsPerPage)).keys()].map(number => (
          <button key={number + 1} onClick={() => paginate(number + 1)} className="page-link">
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  </div>
)

};

export default Profile;
