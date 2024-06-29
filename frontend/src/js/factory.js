import React, { useEffect, useState } from "react";
import axios from "axios";
import phone from '../img/icon/phone.png'; 
import email from '../img/icon/email.png'; 
import id from '../img/icon/id.png'; 
import name from '../img/icon/factory.png';
import contact from '../img/icon/contact.png'; 
import vat from '../img/icon/vat.png'; 
import address from '../img/icon/address.png';
import edit from '../img/icon/edit.png';
import save from '../img/icon/save.png';
import close from '../img/icon/close.png';
import classes from '../css/factory.module.css';

const Factory = () => {
  const [factory, setFactory] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchAllFactories = async () => {
      try {
        const res = await axios.get("/factory");
        setFactory(res.data); 
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllFactories(); 
  }, []);

  const handleEdit = (index, data) => {
    setEditingIndex(index);
    setFormData(data);
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setFormData({});
  };

  const handleSave = async () => {
    try {
      await axios.put(`/updateFactory/${formData.id}`, formData);
      const updatedFactories = [...factory];
      updatedFactories[editingIndex] = formData;
      setFactory(updatedFactories);
      setEditingIndex(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={classes.container}>
      {factory.map((data, i) => (
        <div key={i}>
          <h2> הגדרות</h2>
          <div className={classes.item}>
            <div className={classes.details}>
              {editingIndex === i ? (
                <input
                  type="text"
                  name="factoryName"
                  value={formData.factoryName}
                  onChange={handleChange}
                />
              ) : (
                <a>{data.factoryName}</a>
              )}
              <span>שם עסק</span>
            </div>
            <img src={name} alt="factory" className={classes.icon} />
          </div>
          <div className={classes.item}>
            <div className={classes.details}>
              <a>{data.id}</a>
              <span>ח"פ</span>
            </div>
            <img src={id} alt="id" className={classes.icon} />
          </div>
          <div className={classes.item}>
            <div className={classes.details}>
              {editingIndex === i ? (
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                />
              ) : (
                <a>{data.contact}</a>
              )}
              <span>איש קשר</span>
            </div>
            <img src={contact} alt="contact" className={classes.icon} />
          </div>
          <div className={classes.item}>
            <div className={classes.details}>
              {editingIndex === i ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              ) : (
                <a>{data.address}</a>
              )}
              <span>כתובת</span>
            </div>
            <img src={address} alt="address" className={classes.icon} />
          </div>
          <div className={classes.item}>
            <div className={classes.details}>
              {editingIndex === i ? (
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              ) : (
                <a>{data.phoneNumber}</a>
              )}
              <span>טלפון</span>
            </div>
            <img src={phone} alt="phone" className={classes.icon} />
          </div>
          <div className={classes.item}>
            <div className={classes.details}>
              {editingIndex === i ? (
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              ) : (
                <a>{data.email}</a>
              )}
              <span>מייל</span>
            </div>
            <img src={email} alt="Email" className={classes.icon} />
          </div>
          <div className={classes.item}>
            <div className={classes.details}>
              {editingIndex === i ? (
                <input
                  type="text"
                  name="vat"
                  value={formData.vat}
                  onChange={handleChange}
                />
              ) : (
                <a>{data.vat}</a>
              )}
              <span>מע"ם</span>
            </div>
            <img src={vat} alt="vat" className={classes.icon} />
          </div>
          <div className={classes.item}>
            {editingIndex === i ? (
              <>
                <img src={save} alt="save" className={classes.edit} onClick={handleSave} />
                <img src={close} alt="cancel" className={classes.edit} onClick={handleCancel} />
              </>
            ) : (
              <img src={edit} alt="edit" className={classes.edit} onClick={() => handleEdit(i, data)} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Factory;
