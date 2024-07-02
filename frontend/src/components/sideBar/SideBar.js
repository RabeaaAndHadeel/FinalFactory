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
import dashboard from "../../img/icon/dashboard.png";
import arrow from "../../img/icon/arrow.png";
import activeIcon from "../../img/icon/check.png";
import nonActiveIcon from "../../img/icon/remove.png";
import classes from "../../components/sideBar/sideBar.module.css";

function SideBar() {
  const [isMaterialsOpen, setIsMaterialsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isActiveOrderOpen, setIsActiveOrderOpen] = useState(false);
  const [isGlassOpen, setIsGlassOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isFoamOpen, setIsFoamOpen] = useState(false);

  const toggleMaterials = () => {
    setIsMaterialsOpen(!isMaterialsOpen);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const toggleActiveOrder = () => {
    setIsActiveOrderOpen(!isActiveOrderOpen);
  };

  const toggleGlass = () => {
    setIsGlassOpen(!isGlassOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleFoam = () => {
    setIsFoamOpen(!isFoamOpen);
  };

  return (
    <div
      className={`d-flex flex-column justify-content-between bg-white text-black p-4 ${classes.sidebarRight}`}
    >
      <div>
        <Link to="/" className="d-flex align-items-center mb-4">
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
                  <div
                    className={`d-flex align-items-center nav-link text-dark ${classes.navLink}`}
                    onClick={toggleProfile}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={profile} alt="profile" className={classes.icon} />
                    <span className="fs-5 fw-bold">פרופיל</span>
                    <img
                      src={arrow}
                      alt="arrow"
                      className={`ms-auto ${classes.arrowIcon}`}
                    />
                  </div>
                  {isProfileOpen && (
                    <ul className="nav nav-pills flex-column p-0 m-0 ms-4">
                      <li className="nav-item p-1">
                        <Link
                          to="/profile"
                          className={`d-flex align-items-center nav-link text-dark ${classes.navLink}`}
                        >
                          <img
                            src={activeIcon}
                            alt="active"
                            className={classes.icon}
                          />
                          <span className="fs-6 fw-bold"> פרופיל פעיל </span>
                        </Link>
                      </li>
                      <li className="nav-item p-1">
                        <Link
                          to="/nonActiveProfile"
                          className={`d-flex align-items-center nav-link text-dark ${classes.navLink}`}
                        >
                          <img
                            src={nonActiveIcon}
                            alt="non-active"
                            className={classes.icon}
                          />
                          <span className="fs-6 fw-bold"> פרופיל לא פעיל </span>
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li className="nav-item p-1">
                  <div
                    className={`d-flex align-items-center nav-link text-dark ${classes.navLink}`}
                    onClick={toggleGlass}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={glass} alt="glass" className={classes.icon} />
                    <span className="fs-5 fw-bold">זכוכית</span>
                    <img
                      src={arrow}
                      alt="arrow"
                      className={`ms-auto ${classes.arrowIcon}`}
                    />
                  </div>
                  {isGlassOpen && (
                    <ul className="nav nav-pills flex-column p-0 m-0 ms-4">
                      <li className="nav-item p-1">
                        <Link
                          to="/glass"
                          className={`d-flex align-items-center nav-link text-dark ${classes.navLink}`}
                        >
                          <img
                            src={activeIcon}
                            alt="active"
                            className={classes.icon}
                          />
                          <span className="fs-6 fw-bold"> זכוכית פעילה </span>
                        </Link>
                      </li>
                      <li className="nav-item p-1">
                        <Link
                          to="/nonActiveGlass"
                          className={`d-flex align-items-center nav-link text-dark ${classes.navLink}`}
                        >
                          <img
                            src={nonActiveIcon}
                            alt="non-active"
                            className={classes.icon}
                          />
                          <span className="fs-6 fw-bold">
                            {" "}
                            זכוכית לא פעילה{" "}
                          </span>
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li className="nav-item p-1">
                  <div
                    className={`d-flex align-items-center nav-link text-dark ${classes.navLink}`}
                    onClick={toggleFoam}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={foam} alt="foam" className={classes.icon} />
                    <span className="fs-5 fw-bold">פרזול</span>
                    <img
                      src={arrow}
                      alt="arrow"
                      className={`ms-auto ${classes.arrowIcon}`}
                    />
                  </div>
                  {isFoamOpen && (
                    <ul className="nav nav-pills flex-column p-0 m-0 ms-4">
                      <li className="nav-item p-1">
                        <Link
                          to="/foam"
                          className={`d-flex align-items-center nav-link text-dark ${classes.navLink}`}
                        >
                          <img
                            src={activeIcon}
                            alt="active"
                            className={classes.icon}
                          />
                          <span className="fs-6 fw-bold"> פרזול פעיל </span>
                        </Link>
                      </li>
                      <li className="nav-item p-1">
                        <Link
                          to="/nonActiveFoam"
                          className={`d-flex align-items-center nav-link text-dark ${classes.navLink}`}
                        >
                          <img
                            src={nonActiveIcon}
                            alt="non-active"
                            className={classes.icon}
                          />
                          <span className="fs-6 fw-bold"> פרזול לא פעיל </span>
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>
          <li className="nav-item p-1">
            <Link
              to="/customer"
              className={`d-flex align-items-center nav-link text-dark ${classes.navLink}`}
            >
              <img src={customer} alt="customer" className={classes.icon} />
              <span className="fs-5 fw-bold">מידע לקוחות</span>
            </Link>
          </li>
          {/* <li className="nav-item p-1">
            <Link
              to="/product"
              className={`d-flex align-items-center nav-link text-dark ${classes.navLink}`}
            >
              <img src={product} alt="product" className={classes.icon} />
              <span className="fs-5 fw-bold">מוצרים </span>
            </Link>
          </li> */}
          <li className="nav-item p-1">
            <Link
              to="/supplier"
              className={`d-flex align-items-center nav-link text-dark ${classes.navLink}`}
            >
              <img src={supplier} alt="supplier" className={classes.icon} />
              <span className="fs-5 fw-bold">ספקים</span>
            </Link>
          </li>
          <li className="nav-item p-1">
            <div
              className={`d-flex align-items-center nav-link text-dark ${classes.navLink}`}
              onClick={toggleActiveOrder}
              style={{ cursor: "pointer" }}
            >
              <img src={order} alt="order" className={classes.icon} />
              <span className="fs-5 fw-bold">הזמנות </span>
              <img
                src={arrow}
                alt="arrow"
                className={`ms-auto ${classes.arrowIcon}`}
              />
            </div>
            {isActiveOrderOpen && (
              <ul className="nav nav-pills flex-column p-0 m-0 ms-4">
                <li className="nav-item p-1">
                  <div
                    className={`d-flex align-items-center nav-link text-dark ${classes.navLink}`}
                  >
                    <img
                      src={activeIcon}
                      alt="active"
                      className={classes.icon}
                    />
                    <span className="fs-6 fw-bold"> הזמנות פעילות </span>
                  </div>
                </li>
                <li className="nav-item p-1">
                  <div
                    className={`d-flex align-items-center nav-link text-dark ${classes.navLink}`}
                  >
                    <img
                      src={nonActiveIcon}
                      alt="non-active"
                      className={classes.icon}
                    />
                    <span className="fs-6 fw-bold"> הזמנות לא פעילות </span>
                  </div>
                </li>
              </ul>
            )}
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
                    to="/bid"
                    className={`d-flex align-items-center nav-link text-dark ${classes.navLink}`}
                  >
                    <img src={bid} alt="bid" className={classes.icon} />
                    <span className="fs-6 fw-bold">הצעת מחיר</span>
                  </Link>
                </li>
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
                    to="/dashboard"
                    className={`d-flex align-items-center nav-link text-dark ${classes.navLink}`}
                  >
                    <img
                      src={dashboard}
                      alt="dashboard"
                      className={classes.icon}
                    />
                    <span className="fs-6 fw-bold">פאנל עבודה </span>
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
