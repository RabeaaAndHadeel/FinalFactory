import axios from 'axios';
import { useState } from 'react';
import Validation from '../../../js/validations/CustomerValidation';

const Client = ({ formData, setFormData }) => {
  const [customerExists, setCustomerExists] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);

  const checkIfCustomerExists = async (id) => {
    try {
      const response = await axios.get(`/customer/${id}`);
      console.log("Customer data received:", response.data); // Debugging line
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 404) {
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

    if (id.length === 9) {
      const existingCustomer = await checkIfCustomerExists(id);
      if (existingCustomer) {
        setFormData(existingCustomer);
        console.log("Form data updated with existing customer:", existingCustomer); // Debugging line
        setCustomerExists(true);
        setSuccessMessage('לקוח קיים נטען בהצלחה');
        setShowAddCustomerModal(true); // Open the modal with existing customer data
      } else {
        setFormData({
          id,
          name: '',
          family: '',
          address: '',
          phoneNumber: '',
          email: '',
        }); // Clear fields for new customer
        setCustomerExists(false);
        setSuccessMessage('לקוח אינו קיים בבקשה להוסיף אותו');
        setShowAddCustomerModal(true);
      }
    } else {
      setShowAddCustomerModal(false);
      setCustomerExists(false);
      setSuccessMessage('');
    }
  };

  const handleNewCustomerChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddCustomer = async () => {
    const validationErrors = Validation(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const { id } = formData;
      if (id.length === 9) {
        const existingCustomer = await checkIfCustomerExists(id);

        if (existingCustomer) {
          await axios.put(`/customer/${id}`, formData);
          setSuccessMessage('לקוח נשמר בהצלחה');
        } else {
          await axios.post("/createCustomer", formData);
          setSuccessMessage('לקוח נוצר בהצלחה');
          setCustomerExists(true);
        }
        setShowAddCustomerModal(false);
      } else {
        setErrors({ ...errors, id: 'ID must be 9 characters long' });
      }
    } catch (err) {
      console.error("Error saving or fetching customer:", err.response?.data?.error || err.message);
    }
  };

  return (
    <div>
      <label htmlFor="id" style={{ fontWeight: "bolder" }}>
        ת.ז לקוח
      </label>
      <input
        type="text"
        placeholder="הכנס ת.ז"
        onChange={handleIdChange}
        maxLength={9}
        value={formData.id}
        style={{
          width: "97%",
          padding: "10px",
          marginBottom: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxSizing: "border-box",
          fontSize: "16px",
          color: "#333",
          backgroundColor: "#fff",
          outline: "none",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#66afe9";
          e.target.style.boxShadow = "0 0 8px rgba(102, 175, 233, 0.6)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#ccc";
          e.target.style.boxShadow = "none";
        }}
      />
      {errors.id && <p style={{ color: "red" }}>{errors.id}</p>}
      {successMessage && (
        <p style={{ color: customerExists ? "green" : "orange" }}>
          {successMessage}
        </p>
      )}

      {showAddCustomerModal && (
        <div style={style.modalOverlay}>
          <div style={style.modal}>
            <h3 style={{ textAlign: "center" }}>
              {customerExists ? "שמור פרטי לקוח" : "הוספת לקוח חדש"}
            </h3>
            <label htmlFor="name" style={{ fontWeight: "bolder" }}>
              שם לקוח:
            </label>
            <input
              type="text"
              name="name"
              placeholder="שם לקוח"
              value={formData.name}
              onChange={handleNewCustomerChange}
              style={style.input}
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            <label htmlFor="family" style={{ fontWeight: "bolder" }}>
              שם משפחה:
            </label>
            <input
              type="text"
              name="family"
              placeholder="שם משפחה"
              value={formData.family}
              onChange={handleNewCustomerChange}
              style={style.input}
            />
            {errors.family && <p style={{ color: "red" }}>{errors.family}</p>}
            <label htmlFor="address" style={{ fontWeight: "bolder" }}>
              כתובת:
            </label>
            <input
              type="text"
              name="address"
              placeholder="כתובת"
              value={formData.address}
              onChange={handleNewCustomerChange}
              style={style.input}
            />
            {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}
            <label htmlFor="phoneNumber" style={{ fontWeight: "bolder" }}>
              מספר טלפון:
            </label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="מספר טלפון"
              value={formData.phoneNumber}
              onChange={handleNewCustomerChange}
              style={style.input}
            />
            {errors.phoneNumber && (
              <p style={{ color: "red" }}>{errors.phoneNumber}</p>
            )}
            <label htmlFor="email" style={{ fontWeight: "bolder" }}>
              מייל:
            </label>
            <input
              type="text"
              name="email"
              placeholder="מייל"
              value={formData.email}
              onChange={handleNewCustomerChange}
              style={style.input}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            <button onClick={handleAddCustomer} style={style.button}>
              {customerExists ? "שמור לקוח" : "הוסף לקוח"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const style = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "30%",
    height: "80%",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
};

export default Client;




