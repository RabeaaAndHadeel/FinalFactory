import React from "react";
import factory from "../../img/icon/factory.png";
import profile from "../../img/profile.png";
import glass from "../../img/windows.png";
import foam from "../../img/hinge.png";
import customer from "../../img/customer.png";
import supplier from "../../img/manufacture.png";
import product from "../../img/product.png";
import order from "../../img/Order.png";
import logout from "../../img/logout.png";
import classes from "../../components/sideBar/sideBar.module.css";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div className={`d-flex flex-column justify-content-between bg-white text-black p-4 ${classes.sidebarRight}`}>
      <div>
        <Link to="/" className="d-flex align-items-center mb-4">
          <img src={factory} alt="factory" className={classes.icon} />
          <span className="fs-4 text-dark">הר-אל</span>
        </Link>
        <hr className="text-secondary me-2" />
        <ul className="nav nav-pills flex-column p-0 m-0">
          <li className="nav-item p-1">
            <Link
              to="/profile"
              className="d-flex align-items-center nav-link text-dark"
            >
              <img src={profile} alt="profile" className={classes.icon} />
              <span className="fs-5">פרופיל</span>
            </Link>
          </li>
          <li className="nav-item p-1">
            <Link
              to="/glass"
              className="d-flex align-items-center nav-link text-dark"
            >
              <img src={glass} alt="glass" className={classes.icon} />
              <span className="fs-5">זכוכית</span>
            </Link>
          </li>
          <li className="nav-item p-1">
            <Link
              to="/foam"
              className="d-flex align-items-center nav-link text-dark"
            >
              <img src={foam} alt="foam" className={classes.icon} />
              <span className="fs-5">פרזול</span>
            </Link>
          </li>
          <li className="nav-item p-1">
            <Link
              to="/customer"
              className="d-flex align-items-center nav-link text-dark"
            >
              <img src={customer} alt="customer" className={classes.icon} />
              <span className="fs-5">מידע לקוחות</span>
            </Link>
          </li>
          <li className="nav-item p-1">
            <Link
              to="/product"
              className="d-flex align-items-center nav-link text-dark"
            >
              <img src={product} alt="product" className={classes.icon} />
              <span className="fs-5">מוצרים</span>
            </Link>
          </li>
          <li className="nav-item p-1">
            <Link
              to="/order"
              className="d-flex align-items-center nav-link text-dark"
            >
              <img src={order} alt="order" className={classes.icon} />
              <span className="fs-5">הזמנה</span>
            </Link>
          </li>
          <li className="nav-item p-1">
            <Link
              to="/supplier"
              className="d-flex align-items-center nav-link text-dark"
            >
              <img src={supplier} alt="supplier" className={classes.icon} />
              <span className="fs-5">ספקים</span>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <hr className="text-secondary" />
        <Link
          to="/login"
          className="d-flex align-items-center nav-link text-dark"
        >
          <img src={logout} alt="logout" className={classes.icon} />
          <span className="fs-5">יציאה</span>
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
