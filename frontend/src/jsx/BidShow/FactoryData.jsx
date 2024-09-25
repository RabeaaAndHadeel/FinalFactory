import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './bidInfo.module.css';

export default function FactoryData() {
  const [factory, setFactory] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchAllFactories = async () => {
      try {
        const res = await axios.get("/factory");
        setFactory(res.data);
      } catch (err) {
        setErrors({ fetch: "Failed to fetch factory data." });
      }
    };
    fetchAllFactories();
  }, []);
  const factoryData = factory.map((el) => (
    <div key={el.id}>
      <footer className={styles.invoiceFooter}>
        <h1>{el.factoryName}</h1>
        <p>ייצור אלומיניום, מסגרות, שערים ומעקות, תריסים, רשתות, ויטרינות</p>
        <div >
          <p> {el.email}: מייל</p>
          <p>איש קשר: {el.contact}</p>
          <p>נייד: {el.phoneNumber}</p>
          <p>כתובת: {el.address}</p>
        </div>
      </footer>
    </div>
  ));
  return   <div>{factoryData}</div>;
}
