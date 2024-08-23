import React from 'react';
import './ProfileModal.module.css'; 

export default function ProfileModal({ newProfileData, setNewProfileData, handleSave, onClose }) {
  const handleChange = (e) => {
    setNewProfileData({
      ...newProfileData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>הוסף פרופיל חדש</h2>
        <div className="form-group">
          <label htmlFor="weight">משקל:</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={newProfileData.weight}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="perimeter">היקף:</label>
          <input
            type="number"
            id="perimeter"
            name="perimeter"
            value={newProfileData.perimeter}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSave}>שמור פרופיל</button>
      </div>
    </div>
  );
}
