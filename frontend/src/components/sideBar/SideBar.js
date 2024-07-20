import React, { useState } from "react";
import { Link } from "react-router-dom";
import factory from "../../img/icon/factory.png";
import profile from "../../img/profile.png";
import glass from "../../img/windows.png";
import foam from "../../img/hinge.png";
import customer from "../../img/customer.png";
import supplier from "../../img/manufacture.png";
import product from "../../img/product.png";
import order from "../../img/Order.png";
import logout from "../../img/logout.png";
import bid from "../../img/icon/bid.png";
import material from "../../img/icon/list.png";
import settingsIcon from "../../img/icon/settings.png";
import factoryData from "../../img/icon/factoryData.png";
import arrow from "../../img/icon/arrow.png";
import classes from "../../components/sideBar/sideBar.module.css";

function SideBar() {
  const [isMaterialsOpen, setIsMaterialsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const toggleMaterials = () => {
    setIsMaterialsOpen(!isMaterialsOpen);
  };
  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };
  return (
    <div
      className={`d-flex flex-column justify-content-between bg-white text-black p-4 ${classes.sidebarRight}`}
    >
      <div>
        <Link to="/dashboard" className="d-flex align-items-center mb-4">
          <img src={factory} alt="factory" className={classes.icon} />
          <span className="fs-4 text-dark fw-bold">הר-אל</span>
        </Link>
        <hr className="text-secondary me-2" />
        <ul className="nav nav-pills flex-column p-0 m-0">
          <li className="nav-item p-1">
            <div
              className={`d-flex align-items-center nav-link text-dark ${classes.navLink}`}
              onClick={toggleMaterials}
              style={{ cursor: "pointer" }}
            >
              <img src={material} alt="material" className={classes.icon} />
              <span className="fs-5 fw-bold">חומרים</span>
              <img
                src={arrow}
                alt="arrow"
                className={`ms-auto ${classes.arrowIcon}`}
              />
            </div>
            {isMaterialsOpen && (
              <ul className="nav nav-pills flex-column p-0 m-0 ms-4">
                <li className="nav-item p-1">
                  <Link
                    to="/profile"
                    className={`d-flex align-items-center nav-link text-dark ${classes.navLink}`}
                  >
                    <img src={profile} alt="profile" className={classes.icon} />
                    <span className="fs-5 fw-bold">פרופיל </span>
                  </Link>
                </li>
                <li className="nav-item p-1">
                  <Link
                    to="/glass"
                    className={`d-flex align-items-center nav-link text-dark ${classes.navLink}`}
                  >
                    <img src={glass} alt="product" className={classes.icon} />
                    <span className="fs-5 fw-bold">זכוכית </span>
                  </Link>
                </li>
                <li className="nav-item p-1">
                  <Link
                    to="/foam"
                    className={`d-flex align-items-center nav-link text-dark ${classes.navLink}`}
                  >
                    <img src={foam} alt="foam" className={classes.icon} />
                    <span className="fs-5 fw-bold">פרזול </span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="nav-item p-1">
            <Link
              to="/product"
              className={`d-flex align-items-center nav-link text-dark ${classes.navLink}`}
            >
              <img src={product} alt="product" className={classes.icon} />
              <span className="fs-5 fw-bold">מוצרים </span>
            </Link>
          </li>
          <li className="nav-item p-1">
            <Link
              to="/bid"
              className={`d-flex align-items-center nav-link text-dark ${classes.navLink}`}
            >
              <img src={bid} alt="bid" className={classes.icon} />
              <span className="fs-5 fw-bold">הצעות מחיר </span>
            </Link>
          </li>
          <li className="nav-item p-1">
            <Link
              to="/order"
              className={`d-flex align-items-center nav-link text-dark ${classes.navLink}`}
            >
              <img src={order} alt="order" className={classes.icon} />
              <span className="fs-5 fw-bold">הזמנות </span>
            </Link>
          </li>
          <li className="nav-item p-1">
            <div
              className={`d-flex align-items-center nav-link text-dark ${classes.navLink}`}
              onClick={toggleSettings}
              style={{ cursor: "pointer" }}
            >
              <img src={settingsIcon} alt="settings" className={classes.icon} />
              <span className="fs-5 fw-bold">הגדרות</span>
              <img
                src={arrow}
                alt="arrow"
                className={`ms-auto ${classes.arrowIcon}`}
              />
            </div>
            {isSettingsOpen && (
              <ul className="nav nav-pills flex-column p-0 m-0 ms-4">
                <li className="nav-item p-1">
                  <Link
                    to="/factory"
                    className={`d-flex align-items-center nav-link text-dark ${classes.navLink}`}
                  >
                    <img
                      src={factoryData}
                      alt="factoryData"
                      className={classes.icon}
                    />
                    <span className="fs-6 fw-bold">הגדרות מפעל</span>
                  </Link>
                </li>
                <li className="nav-item p-1">
                  <Link
                    to="/supplier"
                    className={`d-flex align-items-center nav-link text-dark ${classes.navLink}`}
                  >
                    <img
                      src={supplier}
                      alt="supplier"
                      className={classes.icon}
                    />
                    <span className="fs-6 fw-bold">ספקים</span>
                  </Link>
                </li>
                <li className="nav-item p-1">
                  <Link
                    to="/customer"
                    className={`d-flex align-items-center nav-link text-dark ${classes.navLink}`}
                  >
                    <img
                      src={customer}
                      alt="customer"
                      className={classes.icon}
                    />
                    <span className="fs-6 fw-bold">מידע לקוחות</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
      <hr className="text-secondary" />
      <div>
        <Link
          to="/"
          className={`d-flex align-items-center nav-link text-dark ${classes.navLink}`}
        >
          <img src={logout} alt="logout" className={classes.icon} />
          <span className="fs-5 fw-bold">יציאה</span>
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
