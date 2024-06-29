// Sidebar.js
import React from 'react';
import classes from './header1.css';

const Header = () => {
  return (
    <div className={classes.sidebar}>
      <div className={classes.profile}>
        <img src="profile-pic-url" alt="Profile" className={classes.pic} />
        <h2>MuhilanOrg</h2>
      </div>
      <nav>
        <ul>
          <li><a href="#"><i className={classes.icon}>💎</i> Components <span className={classes.hot}>Hot</span></a></li>
          <li><a href="#"><i className={classes.icon}>📊</i> Charts</a></li>
          <li><a href="#"><i className={classes.icon}>🛒</i> E-commerce</a></li>
          <li><a href="#"><i className={classes.icon}>🌐</i> Maps</a></li>
          <li><a href="#"><i className={classes.icon}>🎨</i> Theme</a></li>
        </ul>
      </nav>
      <nav>
        <h3>EXTRA</h3>
        <ul>
          <li><a href="#"><i className={classes.icon}>📄</i> Documentation <span className={classes.beta} >Beta</span></a></li>
          <li><a href="#"><i className={classes.icon}>📅</i> Calendar</a></li>
          <li><a href="#"><i className={classes.icon}>🔍</i> Examples</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
