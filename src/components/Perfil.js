import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

import Navbar from "./Navbar";
import FooterBack from "./FooterBack";



import styles from "./Perfil.module.css";






function Perfil() {
  const { id } = useParams();
  const { authenticated, user } = useContext(AuthContext);


  return (
    <div className={`${styles.Perfil_Page}`}>
      <Navbar />
      <div className={`${styles.Perfil_container}`}>

      </div>
      <FooterBack />
    </div>
  );
}
export default Perfil;
