import { useContext, useState } from "react";
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

function AvatarState(avatar) {
  const [Avatar, setAvatar] = useState(avatar_padrao);
  if (avatar) {
    setAvatar(avatar);
  }
  return Avatar;
}

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
  console.log("antes do +++++++++++++++++ avatarIndex +++++++++++++++++");
  const avatarIndex = avataresArray.indexOf(avatar);
  console.log("depois do +++++++++++++++++ avatarIndex +++++++++++++++++");
  const pic = avatarIndex;
  const data = {
    pic,
  };
  const response = await api.patch(`/Perfil/${id}/pic`, data);
  console.log("acho que foi");
  console.log(response);
//   localStorage.setItem('user', JSON.stringify(response.data));
};

export const AvatarPainel = () => {
  // const { id } = useParams();
  const { user } = useContext(AuthContext);
  const id = user.id;

  const [Avatar, setAvatar] = useState(avatar_padrao);

  const [divEditar_avatar, setDivEditar_avatar] = useState(false);
  const avatares = avataresArray;
  function editar_Avatar() {
    setDivEditar_avatar((prevToggle) => !prevToggle);
  }
  //   console.log(avatares)
  //   function escolha_avatar(avat) {
  //     const avatarIndex = avatares.indexOf(avat);
  //     functionWithSwitch(avatarIndex);
  //   }

  const functionWithSwitch = (avatarIndex) => {
    console.log("chegou no functionWithSwitch");
    switch (avatarIndex) {
      case 0:
        AvatarState(avatar_padrao);
        return;

      case 1:
        AvatarState(avatar0);

        return;

      case 2:
        AvatarState(avatar1);

        return;

      case 3:
        AvatarState(avatar2);

        return;

      case 4:
        AvatarState(avatar3);

        return;

      case 5:
        AvatarState(avatar5);

        return;

      case 6:
        AvatarState(avatar6);

        return;

      case 7:
        AvatarState(avatar7);

        return;

      case 8:
        AvatarState(avatar8);

        return;

      case 9:
        AvatarState(avatar9);

        return;

      case 10:
        AvatarState(avatar10);

        return;

      case 11:
        AvatarState(avatar11);

        return;

      case 12:
        AvatarState(avatar12);

        return;

      case 13:
        AvatarState(avatar13);

        return;

      case 14:
        AvatarState(avatar14);

        return;

      case 15:
        AvatarState(avatar15);

        return;

      default:
        // console.log(parameter);
        return "Error";
    }
  };

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
  const { user } = useContext(AuthContext);

  const Avatar = AvatarState();
  // localStorage.getItem("picture", JSON.stringify());

  const functionWithSwitch = (avatarIndex) => {
    console.log("chegou no functionWithSwitch");
    switch (avatarIndex) {
      case 0:
        AvatarState(avatar_padrao);
        return;

      case 1:
        AvatarState(avatar0);

        return;

      case 2:
        AvatarState(avatar1);

        return;

      case 3:
        AvatarState(avatar2);

        return;

      case 4:
        AvatarState(avatar3);

        return;

      case 5:
        AvatarState(avatar5);

        return;

      case 6:
        AvatarState(avatar6);

        return;

      case 7:
        AvatarState(avatar7);

        return;

      case 8:
        AvatarState(avatar8);

        return;

      case 9:
        AvatarState(avatar9);

        return;

      case 10:
        AvatarState(avatar10);

        return;

      case 11:
        AvatarState(avatar11);

        return;

      case 12:
        AvatarState(avatar12);

        return;

      case 13:
        AvatarState(avatar13);

        return;

      case 14:
        AvatarState(avatar14);

        return;

      case 15:
        AvatarState(avatar15);

        return;

      default:
        // console.log(parameter);
        return "Error";
    }
  };

  return (
    <>
      <img className={`${styles.Foto_Logo}`} src={Avatar} alt="" />
    </>
  );
};
