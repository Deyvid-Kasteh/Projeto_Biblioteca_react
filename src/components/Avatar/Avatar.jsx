import { useContext, useEffect, useState } from "react";
import styles from "./Avatar.module.css";
import { api } from "../../services/api";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

import avatar_padrao from "../img/userPic/avatar_padrao.png";
import avatar0 from "../img/userPic/avatar.png";
import avatar1 from "../img/userPic/avatar1.png";
import avatar2 from "../img/userPic/avatar2.png";
import avatar3 from "../img/userPic/avatar3.png";
import avatar5 from "../img/userPic/avatar5.png";
import avatar6 from "../img/userPic/avatar6.png";
import avatar7 from "../img/userPic/avatar7.png";
import avatar8 from "../img/userPic/avatar8.png";
import avatar9 from "../img/userPic/avatar9.png";
import avatar10 from "../img/userPic/avatar10.png";
import avatar11 from "../img/userPic/avatar11.png";
import avatar12 from "../img/userPic/avatar12.png";
import avatar13 from "../img/userPic/avatar13.png";
import avatar14 from "../img/userPic/avatar14.png";
import avatar15 from "../img/userPic/avatar15.png";

const avataresArray = [
  avatar_padrao,
  avatar0,
  avatar1,
  avatar2,
  avatar3,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
  avatar11,
  avatar12,
  avatar13,
  avatar14,
  avatar15,
];

const functionWithSwitch = (AvatarLocalStorage) => {
  console.log(AvatarLocalStorage);

  switch (Number(AvatarLocalStorage)) {
    case 0:
      console.log(avatar_padrao);

      return avatar_padrao;

    case 1:
      console.log(avatar0);

      return avatar0;

    case 2:
      console.log(avatar1);

      return avatar1;

    case 3:
      console.log(avatar2);

      return avatar2;

    case 4:
      console.log(avatar3);

      return avatar3;

    case 5:
      console.log(avatar5);

      return avatar5;

    case 6:
      console.log(avatar6);

      return avatar6;

    case 7:
      console.log(avatar7);

      return avatar7;

    case 8:
      console.log(avatar8);

      return avatar8;

    case 9:
      console.log(avatar9);

      return avatar9;

    case 10:
      console.log(avatar10);

      return avatar10;

    case 11:
      console.log(avatar11);

      return avatar11;

    case 12:
      console.log(avatar12);

      return avatar12;

    case 13:
      console.log(avatar13);

      return avatar13;

    case 14:
      console.log(avatar14);

      return avatar14;

    case 15:
      console.log(avatar15);

      return avatar15;

    default:
      console.log("nenhum deles");
      return "Error";
  }
  return;
};

// const AddPicToProfile = async (pic) => {
//   const { id } = useParams();
//   const data = {
//     pic,
//   };
//   const response = await api.patch(`/Perfil/${id}/pic`, data);
//   console.log("acho que foi");
//   console.log(response);
// };

const AddPicToProfile = async (avatar, id) => {
  const avatarIndex = avataresArray.indexOf(avatar);
  const pic = avatarIndex;
  const data = {
    pic,
  };
  const response = await api.patch(`/Perfil/${id}/pic`, data);
  localStorage.setItem("userAvatar", JSON.stringify(avatarIndex));
  window.location.reload(false);
};

export const AvatarPainel = () => {
  // const { id } = useParams();
  const { user } = useContext(AuthContext);
  const id = user.id;
  const [Avatar, setAvatar] = useState(avatar_padrao);

  useEffect(() => {
    const avatarLocalStorage = localStorage.getItem("userAvatar");
    if (avatarLocalStorage) {
      const avatarResponse = functionWithSwitch(avatarLocalStorage);
      console.log(avatarLocalStorage);
      console.log(avatarResponse);
      if (avatarResponse != Avatar) {
        setAvatar(avatarResponse);
      }
    }
  }, []);

  const [divEditar_avatar, setDivEditar_avatar] = useState(false);
  const avatares = avataresArray;
  function editar_Avatar() {
    setDivEditar_avatar((prevToggle) => !prevToggle);
  }

  return (
    <>
      <div className={styles.Perfil_foto}>
        <img
          className={`${styles.Foto}`}
          src={Avatar}
          onClick={() => editar_Avatar()}
          alt=""
        />
        <span className={`${styles.editar_Avatar}`}> Editar Avatar ✏️</span>
      </div>
      {divEditar_avatar && (
        <>
          <div className={styles.escolha_avatar}>
            {avatares.map((avat) => (
              <img
                className={`${styles.Foto_para_escolher}`}
                src={avat}
                onClick={() => setAvatar(avat)}
                // escolha_avatar(avat)}
                alt=""
                key={avat}
              />
            ))}
            <p>Escolha um avatar</p>
            <div className={styles.salvarAvatar}>
              <button
                className={styles.salvarAvatarButton}
                onClick={() => AddPicToProfile(Avatar, id)}
              >
                Salvar
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export const AvatarLogo = () => {
const [Avatar, setAvatar] = useState(avatar_padrao);

useEffect(() => {
  const avatarLocalStorage = localStorage.getItem("userAvatar");
  if (avatarLocalStorage) {
    const avatarResponse = functionWithSwitch(avatarLocalStorage);
    console.log(avatarLocalStorage);
    console.log(avatarResponse);
    if (avatarResponse != Avatar) {
      setAvatar(avatarResponse);
    }
  }
}, []);

  return (
    <><img className={`${styles.Foto_Logo}`} src={Avatar} alt="" /></>
  );
};
