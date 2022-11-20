import { Link } from "react-router-dom";


import styles from "./Navbar.module.css";
import { BsPersonCircle } from "react-icons/bs";
import Clock from "./Clock";

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
        <h1>
          <Link to="/login">
            <BsPersonCircle /> Login
          </Link>
        </h1>
      </div>
    </div>
  );
}

export default Navbar;
