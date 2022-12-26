import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

import Navbar from "./Navbar";
import FooterBack from "./FooterBack";
import MeusFavsPage from "./MeusFavsPage";
import Loading from "./Loading";

import styles from "./Perfil.module.css";
import { FaUserEdit } from "react-icons/fa";

import avatar_padrao from "./img/userPic/avatar_padrao.png";
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

import { api } from "../services/api";

function Perfil() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [usuario, setUsuario] = useState("");
  const [removeLoading, setRemoveLoading] = useState(false);

  const fetchUsuario = async () => {
    const resp = await api.get(`/Perfil/${id}`);
    setUsuario(resp?.data);
    const data1 = await resp.data;
    const data2 = await data1.details;
    const data3 = await data2.picture;
    const picture = await data3;
    await functionWithSwitch(picture);
    setRemoveLoading(true);
    // console.log(usuario);
  };

  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const nome = user?.name;
  // console.log("++++++++++++++++++++++++++++++++++++++");
  // console.log(usuario);
  // console.log("++++++++++++++++++++++++++++++++++++++");



  const nomeCapitalized = capitalizeFirst(nome);

  const avatares = [
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

  const [Avatar, setAvatar] = useState(
    avatar_padrao
  );
  const [divEditar_avatar, setDivEditar_avatar] = useState(false);
  const [divPerfilDetalhesPainel, setDivPerfilDetalhesPainel] = useState(true);
  const [age, setAge] = useState("");






  function editar_Avatar() {
    setDivEditar_avatar((prevToggle) => !prevToggle);
    setDivPerfilDetalhesPainel((prevToggle) => !prevToggle);

  }

  const patchAge = async (e) => {
    e.preventDefault();
    if (age <= 0 || age === undefined || age === null) {
      alert("Por favor, coloque seu email e senha");
      return;
    }
    const data = {
      age,
    };
    const response = await api.patch(`/Perfil/${id}`, data);
    // console.log(response.data);
    alert("Atualização realizada com sucesso");
  };


  const addPicToProfile = async (pic) => {
    const data = {
      pic,
    };
    const response = await api.patch(`/Perfil/${id}/pic`, data);
    // console.log(response.data);
    console.log("acho que foi");

  };

  const functionWithSwitch = async (parameter) => {
    switch (parameter) {
      case 0:
        setAvatar(avatar_padrao);
        await addPicToProfile(0);
        return;

      case 1:
        setAvatar(avatar0);
        await addPicToProfile(1);

        return;

      case 2:
        setAvatar(avatar1);
        await addPicToProfile(2);

        return;

      case 3:
        setAvatar(avatar2);
        await addPicToProfile(3);

        return;

      case 4:
        setAvatar(avatar3);
        await addPicToProfile(4);

        return;

      case 5:
        setAvatar(avatar5);
        await addPicToProfile(5);

        return;

      case 6:
        setAvatar(avatar6);
        await addPicToProfile(6);

        return;

      case 7:
        setAvatar(avatar7);
        await addPicToProfile(7);

        return;

      case 8:
        setAvatar(avatar8);
        await addPicToProfile(8);

        return;

      case 9:
        setAvatar(avatar9);
        await addPicToProfile(9);

        return;

      case 10:
        setAvatar(avatar10);
        await addPicToProfile(10);

        return;

      case 11:
        setAvatar(avatar11);
        await addPicToProfile(11);

        return;

      case 12:
        setAvatar(avatar12);
        await addPicToProfile(12);

        return;

      case 13:
        setAvatar(avatar13);
        await addPicToProfile(13);

        return;

      case 14:
        setAvatar(avatar14);
        await addPicToProfile(14);

        return;

      case 15:
        setAvatar(avatar15);
        await addPicToProfile(15);

        return;

      default:
        console.log(parameter);
        return "Error";
    }
  };

  function escolha_avatar(avat) {
    // console.log(avatares.indexOf(avat));
    const avatarIndex = avatares.indexOf(avat);
    functionWithSwitch(avatarIndex);
  }

  const destroyFavBook = async ({ Livro }) => {
    console.log("++++++++++++++++++++++++++++++++++++++");
    console.log(Livro);
    console.log("++++++++++++++++++++++++++++++++++++++");
    const { idLivro } = await Livro; //Desestruturação
    await api.delete(
      `/Perfil/${usuario._id}/destroyBookfromFavorites/${idLivro}`,
      idLivro
    );
    alert("Favorito deletado com sucesso");
    fetchUsuario();
  };

  useEffect(() => {
    try {
        fetchUsuario();
      } catch (error) {
      }
  }, []);



  const Livros = usuario.books




  return (
    <div className={`${styles.Perfil_Page}`}>
      <Navbar />
      {usuario && (
        <div className={`${styles.Perfil_container}`}>
          <div className={styles.Perfil}>
            <div>
              <img
                className={`${styles.Foto}`}
                src={Avatar}
                onClick={() => editar_Avatar()}
                alt=""
              />
              {/* <FaUserEdit /> */}
            </div>
            {divEditar_avatar && (
              <>
                <div className={styles.escolha_avatar}>
                  {avatares.map((avat) => (
                    <img
                      className={`${styles.Foto_para_escolher}`}
                      src={avat}
                      onClick={() => escolha_avatar(avat)}
                      alt=""
                      key={avat}
                    />
                  ))}

                  {/* <img className={`${styles.avatares}`} src={avatar_padrao} /> */}
                </div>
                <div className={styles.Informacoes_pessoais}>
                  <input
                    className={`${styles.input_age}`}
                    type="number"
                    name="input_age"
                    placeholder="Digite sua Idade"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    autoComplete="off"
                  />
                  <button
                    type="submit"
                    className={styles.login_btn}
                    onClick={patchAge}
                  >
                    Atualizar
                  </button>
                </div>
              </>
            )}

            <div className={styles.Perfil_detalhes}>
              {divPerfilDetalhesPainel && (
                <div className={styles.perfilDetalhesPainel}>
                  <h1>{nomeCapitalized}</h1>
                  <button className={styles.favPage_btn} onClick={patchAge}>
                    Meus favoritos
                  </button>
                  <button className={styles.seeLater_btn} onClick={patchAge}>
                    Ver depois
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className={styles.Perfil_painel}>
            <MeusFavsPage Livros={Livros} destroyFavBook={destroyFavBook} />
          </div>
        </div>
      )}
      {!removeLoading && <Loading />}
      <FooterBack />
    </div>
  );
}
export default Perfil;
