import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from "../css/menu.css";
import profileImage from '../img/aaa.jpg'; // Use the provided profile image

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(true);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebarHeader}>
        <img src={profileImage} alt="Profile" className={classes.profileImage} />
        <h1 className={classes.h1}>MuhilanOrg</h1>
      </div>
      <div className={`${classes.dropdownMenu} ${menuOpen ? '' : classes.hidden}`}>
        <div className={classes.sectionTitle}>GENERAL</div>
        <Link to="/components" className={classes.menuItem} onClick={toggleMenu}>
          <span className={classes.icon}>💎</span>
          <span className={classes.label}>Components</span>
          <span className={classes.badge}>Hot</span>
        </Link>
        <Link to="/charts" className={classes.menuItem} onClick={toggleMenu}>
          <span className={classes.icon}>📊</span>
          <span className={classes.label}>Charts</span>
        </Link>
        <Link to="/ecommerce" className={classes.menuItem} onClick={toggleMenu}>
          <span className={classes.icon}>🛒</span>
          <span className={classes.label}>E-commerce</span>
        </Link>
        <Link to="/maps" className={classes.menuItem} onClick={toggleMenu}>
          <span className={classes.icon}>🌐</span>
          <span className={classes.label}>Maps</span>
        </Link>
        <Link to="/theme" className={classes.menuItem} onClick={toggleMenu}>
          <span className={classes.icon}>🎨</span>
          <span className={classes.label}>Theme</span>
        </Link>
        
        <div className={classes.sectionTitle}>EXTRA</div>
        <Link to="/documentation" className={classes.menuItem} onClick={toggleMenu}>
          <span className={classes.icon}>📄</span>
          <span className={classes.label}>Documentation</span>
          <span className={classes.badge}>Beta</span>
        </Link>
        <Link to="/calendar" className={classes.menuItem} onClick={toggleMenu}>
          <span className={classes.icon}>📅</span>
          <span className={classes.label}>Calendar</span>
        </Link>
        <Link to="/examples" className={classes.menuItem} onClick={toggleMenu}>
          <span className={classes.icon}>💡</span>
          <span className={classes.label}>Examples</span>
        </Link>
      </div>
    </div>
  );
}
