import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

import Navbar from "./Navbar";
import FooterBack from "./FooterBack";



import styles from "./Perfil.module.css";



import avatar_padrao from "./img/userPic/avatar_padrao.png"






function Perfil() {
  const { id } = useParams();
  const { authenticated, user } = useContext(AuthContext);


  return (
    <div className={`${styles.Perfil_Page}`}>
      <Navbar />
      <div className={`${styles.Perfil_container}`}>
        <div className={styles.Perfil}>
          <img
            className={`${styles.Perfil_foto}`}
            src={avatar_padrao}
          />
        </div>
        <div className={styles.Perfil_detalhes}></div>
      </div>
      <FooterBack />
    </div>
  );
}
export default Perfil;
