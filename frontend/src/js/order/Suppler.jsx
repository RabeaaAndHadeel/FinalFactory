
import axios from 'axios';
import { useEffect, useState } from 'react';
import Validation from '../validations/SuppliersValidation';

export default function Suppler({ formData, setFormData  }) { 
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const checkIfSupplerExists = async (id) => {
    try {
      const response = await axios.get(`/supplier/${id}`);
      console.log('Supplier exists, data:', response.data); // Debugging log
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log('Supplier does not exist.'); // Debugging log
        return null;
      } else {
        console.error("Error checking if Supplier exists:", err.message);
        return null;
      }
    }
  };

  const handleIdChange = async (e) => {
    const id = e.target.value;
    setFormData({ ...formData, id });
    setErrors({ ...errors, id: undefined });

    if (id.length === 9) { // Proceed only if ID is 9 characters
      setLoading(true);
      try {
        const existingSupplier = await checkIfSupplerExists(id);
        if (existingSupplier) {
          console.log('Existing Supplier data:', existingSupplier); // Debugging log
          setFormData(existingSupplier);
          setSuccessMessage('ספק קיים נטען בהצלחה');
        } else {
          setSuccessMessage('ספק אינו קיים בבקשה להוסיף אותו');
        }
      } catch (err) {
        console.error('Error loading Supplier data:', err.message);
      } finally {
        setLoading(false);
      }
    }
  };

   const handleSave = async () => {
    const validationErrors = Validation(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const { id } = formData;
      if (id.length === 9) {
        const existingSupplier = await checkIfSupplerExists(id);

        if (existingSupplier) {
          const res = await axios.put(`/supplier/${id}`, formData); // Update existing Suppler
          setSuccessMessage('ספק עודכן בהצלחה');
        } else {
          const res = await axios.post("/createSupplier", formData); // Create new Suppler
          setSuccessMessage('ספק נוסף בהצלחה');
        }
      } else {
        setErrors({ ...errors, id: 'ID must be 9 characters long' });
      }
    } catch (err) {
      console.error("Error saving or fetching supplier:", err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  return (
    <div className="form-container">
      {loading && <p>Loading...</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <div className="form-group">
       <label htmlFor="id"> ח.פ :</label>
            <input
              type="text"
              id="id"
              name="id"
              placeholder="הכנס ח.פ"
              value={formData.id}
              onChange={handleIdChange}
            />
        {errors.id && <span className="error">{errors.id}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="name"> שם מפעל: </label>
          <input
              type="text"
              id="name"
              name="name"
              placeholder="הכנס שם מפעל"
              value={formData.name}
              onChange={handleChange}
          />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="contact"> איש קשר:</label>
        <input
              type="text"
              id="contact"
              name="contact"
              placeholder="הכנס שם איש קשר"
              value={formData.contact}
              onChange={handleChange}
          />
        {errors.contact && <span className="error">{errors.contact}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="address"> כתובת:</label>
          <input
              type="text"
              id="address"
              name="address"
              placeholder="הכנס כתובת"
              value={formData.address}
              onChange={handleChange}
          />
        {errors.address && <span className="error">{errors.address}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber"> מספר טלפון:</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="הכנס מספר טלפון"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
        {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="email"> מייל:</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="הכנס מייל"
              value={formData.email}
              onChange={handleChange}
            />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
