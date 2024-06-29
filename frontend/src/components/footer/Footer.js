import React from "react";
import classes from "./footer.module.css";
export default function Footer() {
  return (
    <footer className={classes.footer}>
      <section className="footer">
        {/* Display the current year and the name passed as a prop */}
        &copy; {new Date().getFullYear()} {"הר-אל"}
      </section>
    </footer>
  );
}