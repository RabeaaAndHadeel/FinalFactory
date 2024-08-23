
import axios from 'axios';
import { useEffect, useState } from 'react';
import Validation from '../validations/CustomerValidation';

export default function Client({ formData, setFormData ,handleSave }) { 
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const checkIfCustomerExists = async (id) => {
    try {
      const response = await axios.get(`/customer1/${id}`);
      console.log('Customer exists, data:', response.data); // Debugging log
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log('Customer does not exist.'); // Debugging log
        return null;
      } else {
        console.error("Error checking if customer exists:", err.message);
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
        const existingCustomer = await checkIfCustomerExists(id);
        if (existingCustomer) {
          console.log('Existing customer data:', existingCustomer); // Debugging log
          setFormData(existingCustomer);
          setSuccessMessage('לקוח קיים נטען בהצלחה');
        } else {
          setSuccessMessage('לקוח אינו קיים בבקשה להוסיף אותו');
        }
      } catch (err) {
        console.error('Error loading customer data:', err.message);
      } finally {
        setLoading(false);
      }
    }
  };

   handleSave = async () => {
    const validationErrors = Validation(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const { id } = formData;
      if (id.length === 9) {
        const existingCustomer = await checkIfCustomerExists(id);

        if (existingCustomer) {
          const res = await axios.put(`/customer/${id}`, formData); // Update existing customer
          setSuccessMessage('לקוח עודכן בהצלחה');
        } else {
          const res = await axios.post("/createCustomer", formData); // Create new customer
          setSuccessMessage('לקוח נוצר בהצלחה');
        }
      } else {
        setErrors({ ...errors, id: 'ID must be 9 characters long' });
      }
    } catch (err) {
      console.error("Error saving or fetching customer:", err.response?.data?.error || err.message);
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
        <label htmlFor="id">ת.ז לקוח:</label>
        <input
          type="text"
          id="id"
          name="id"
          placeholder="הכנס ת.ז"
          value={formData.id}
          onChange={handleIdChange}
        />
        {errors.id && <span className="error">{errors.id}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="name">שם לקוח:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="הכנס שם"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="family">שם משפחה:</label>
        <input
          type="text"
          id="family"
          name="family"
          placeholder="הכנס שם משפחה"
          value={formData.family}
          onChange={handleChange}
        />
        {errors.family && <span className="error">{errors.family}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="address">כתובת:</label>
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
        <label htmlFor="phoneNumber">מספר טלפון:</label>
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
        <label htmlFor="email">מייל:</label>
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
