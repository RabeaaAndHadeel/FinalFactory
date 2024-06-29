import classes from "./header.module.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className={classes.header}>
      <nav className="nav-container">
        <div>
          <ul>
            <li>
              <Link to="/login">יציאה</Link>
              {/* Link to the Sign out page */}
            </li>
            <li>
              <Link to="/">דף הבית</Link>
              {/* Link to the home page */}
            </li>
            <li>
              <Link to="/profile">פרופיל</Link>
              {/* Link to the profile page */}
            </li>
            <li>
              <Link to="/glass">זכוכית</Link>
              {/* Link to the Glass page */}
            </li>
            <li>
              <Link to="/foam">פרזול</Link>
              {/* Link to the foam page */}
            </li>
            <li>
              <Link to="/order">הזמנה</Link>
              {/* Link to the order page */}
            </li>
            <li>
              <Link to="/product">מוצרים</Link>
              {/* Link to the product page */}
            </li>
            <li>
              <Link to="/customer">מידע לקוחות</Link>
              {/* Link to the customers page */}
            </li>
            <li>
              <Link to="/supplier">ספקים</Link>
              {/* Link to the supplier page */}
            </li>
            <li>
              <Link to="/Contactus">צור קשר</Link>
              {/* Link to the contactus page */}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
