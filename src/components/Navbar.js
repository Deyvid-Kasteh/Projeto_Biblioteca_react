import { Link } from "react-router-dom";


import styles from "./Navbar.module.css";
import Clock from "./Clock";
import LoginNav from "./LoginNav";




function Navbar() {


  return (
    <div className={`${styles.Navbar_container}`}>
      <div className={`${styles.Navbar_Item}`}>
        <h1>
          <Link to="/" reloadDocument>
            Biblioteca.
          </Link>
        </h1>
      </div>
      <div className={`${styles.Navbar_Item}`}>
        <Clock />
      </div>
      <div className={`${styles.Navbar_Item}`}>
        <LoginNav />
      </div>
    </div>
  );
}

export default Navbar;
