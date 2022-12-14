import { Link } from "react-router-dom";


import styles from "./Navbar.module.css";
import Clock from "./Clock";
import LoginNav from "./LoginNav";




function Navbar() {


  return (
    <div className={`${styles.Navbar_container}`}>
      <div>
        <h1>
          <Link to="/" reloadDocument>
            Biblioteca.
          </Link>
        </h1>
      </div>
      <Clock />
      <div>
          <LoginNav/>
      </div>
    </div>
  );
}

export default Navbar;
