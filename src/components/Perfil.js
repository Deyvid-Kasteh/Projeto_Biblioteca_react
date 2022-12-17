import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

import Navbar from "./Navbar";
import FooterBack from "./FooterBack";



import styles from "./Perfil.module.css";
import { FaUserEdit } from "react-icons/fa";



import avatar_padrao from "./img/userPic/avatar_padrao.png"
import avatar0 from "./img/userPic/avatar.png";
import avatar1 from "./img/userPic/avatar1.png";
import avatar2 from "./img/userPic/avatar2.png";
import avatar3 from "./img/userPic/avatar3.png";
import avatar5 from "./img/userPic/avatar5.png";
import avatar6 from "./img/userPic/avatar6.png";
import avatar7 from "./img/userPic/avatar7.png";
import avatar8 from "./img/userPic/avatar8.png";
import avatar9 from "./img/userPic/avatar9.png";
import avatar10 from "./img/userPic/avatar10.png";
import avatar11 from "./img/userPic/avatar11.png";
import avatar12 from "./img/userPic/avatar12.png";
import avatar13 from "./img/userPic/avatar13.png";
import avatar14 from "./img/userPic/avatar14.png";
import avatar15 from "./img/userPic/avatar15.png";







function Perfil() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const nome = user?.name;
  const nomeCapitalized = capitalizeFirst(nome);

  const avatares = [avatar_padrao, avatar0, avatar1, avatar2, avatar3, avatar5, avatar6, avatar7, avatar8, avatar9, avatar10, avatar11, avatar12, avatar13, avatar14, avatar15];

  const [Avatar, setAvatar] = useState(avatar_padrao);

  function escolha_avatar(avata) {
    setAvatar(avata)

  }
  return (
    <div className={`${styles.Perfil_Page}`}>
      {user && (
        <>
          <Navbar />
          <div className={`${styles.Perfil_container}`}>
            <div className={styles.Perfil}>
              <div>
                <img className={`${styles.Foto}`} src={Avatar} />
              </div>
              <div className={styles.escolha_avatar}>
                {avatares.map((avat) => (
                  <img
                    className={`${styles.Foto_para_escolher}`}
                    src={avat}
                    onClick={() => escolha_avatar(avat)}
                  />
                ))}

                {/* <img className={`${styles.avatares}`} src={avatar_padrao} /> */}
              </div>
              <div className={styles.Perfil_detalhes}>
                <h1>{nomeCapitalized}</h1>
                <FaUserEdit />
                <div className={styles.Informacoes_pessoais}></div>
              </div>
            </div>
            <div className={styles.Perfil_painel}></div>
          </div>
          <FooterBack />
        </>
      )}
    </div>
  );
}
export default Perfil;