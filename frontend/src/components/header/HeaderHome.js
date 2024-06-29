import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './headerhome.module.css';
import menuIcon from '../../img/icon/menu.png'; 

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogin = () => {
    navigate('/login');
    setMenuOpen(false);
  };

  const handlelogout = () => {
    navigate('/');
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={classes.header}>
      <div className={classes.headerContent}>
       <h1 className={classes.h1} >הר אל - ניהול וארגון מפעל אלומיניום</h1>
        <div className={classes.menuContainer}>
          <img src={menuIcon} alt="Menu" className={classes.menuIcon} onClick={toggleMenu} />
          {menuOpen && (
            <div className={classes.dropdownMenu}>
              <button className={classes.menuItem} onClick={handleLogin}>כניסה</button>
              <button className={classes.menuItem} onClick={handlelogout}>התנתק</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
