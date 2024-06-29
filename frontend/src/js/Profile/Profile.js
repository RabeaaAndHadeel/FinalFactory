import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../searchBar/SearchBar";
import editIcon from '../../img/icon/edit.png';
import saveIcon from '../../img/icon/save.png';
import closeIcon from '../../img/icon/close.png';
import addIcon from '../../img/icon/add.png';
import classes from '../../css/profile.module.css'; 

const Profile = () => {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ weight: "", perimeter: "", id: "" });

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
    setFormData(data);
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

  const filteredProfiles = profiles.filter((data) =>
    data.id.toString().includes(search)
  );

  return (
    <div>
      <div className="container">
        <h2 className="w-100 d-flex justify-content-center p-3">פרופיל</h2>
        <SearchBar searchVal={search} setSearchVal={setSearch} />
        <div className="row">
          <div className="col-md-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>פעולות</th>
                  <th>משקל</th>
                  <th>היקף</th>
                  <th>מק"ט</th>
                </tr>
              </thead>
              <tbody>
                {filteredProfiles.map((data, i) => (
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
                          name="weight"
                          value={formData.weight}
                          onChange={handleChange}
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
                        />
                      ) : (
                        data.id
                      )}
                    </td>
                  </tr>
                ))}
                {editingIndex === null && (
                  <tr>
                    <td>
                      <img src={addIcon} alt="Add" className={classes.icon} onClick={() => handleEdit(profiles.length, { weight: "", perimeter: "", id: "" })} />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="perimeter"
                        value={formData.perimeter}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
