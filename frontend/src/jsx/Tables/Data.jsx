import React from "react";
import { Link } from "react-router-dom";
import classes from "../../css/data.module.css";
export default function Data() {
  return (
    <main className={classes.main}>
      <div className={classes.div}>
        <h2 className={classes.h2}>הר-אל</h2>
        <h1 className={classes.h1}>צור קשר איתנו</h1>
        <div className="info">
          <p className={classes.p}>:מייל</p>
          <h2 className={classes.h2}>hdel.zoabi.16@gmail.com</h2>
          <h2 className={classes.h2}> ri442000@gmail.com</h2>
          <p className={classes.p}>:טלפון</p>
          <h2 className={classes.h2}>הדיל:0585342002</h2>
          <h2 className={classes.h2}>רביעה:0587031084</h2>
          <p className={classes.p}>:עיר מגורים</p>
          <h2 className={classes.h2}>הדיל:נאעורה</h2>
          <h2 className={classes.h2}>רביעה:סאגור</h2>
        </div>
        <Link to="/" className="btn btn-success">
          חזרה לדף הראשי
        </Link>
      </div>
    </main>
  );
}
