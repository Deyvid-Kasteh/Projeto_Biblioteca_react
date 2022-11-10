import styles from "./Navbar.module.css";
import { BsPersonCircle } from "react-icons/bs";

function Navbar() {
  return (
    <div className={`${styles.Navbar_container}`}>
      <div>
        <h1>Biblioteca.</h1>
      </div>
      <div>
        <h1>Login <BsPersonCircle/></h1>
      </div>
    </div>
  );
}

export default Navbar;
