import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

import Navbar from "./Navbar";
import FooterBack from "./FooterBack";

import styles from "./Perfil.module.css";
import { FaUserEdit } from "react-icons/fa";

import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { yellow } from "@mui/material/colors";

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

import { api } from "../services/api";

function Perfil() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const idUsuario = user.id;

  const [usuario, setUsuario] = useState('');
  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const nome = user?.name;
  const nomeCapitalized = capitalizeFirst(nome);

  const avatares = [avatar_padrao, avatar0, avatar1, avatar2, avatar3, avatar5, avatar6, avatar7, avatar8, avatar9, avatar10, avatar11, avatar12, avatar13, avatar14, avatar15];

  const [Avatar, setAvatar] = useState(avatar_padrao);
  const [divEditar_avatar, setDivEditar_avatar] = useState(false);
  const [age, setAge] = useState('');


  const colorYellow = yellow[500];
  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: colorYellow,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: colorYellow,
      color: "black",
    },
  }));




  useEffect(() => {
    const fetchUsuario = async () => {
      const resp = await api.get(`/Perfil/${id}`);
      setUsuario(resp.data)
      console.log(resp);

    };

    fetchUsuario().catch(console.error);
  }, []);




  function escolha_avatar(avata) {
    setAvatar(avata)
  }

  function editar_Avatar() {
    setDivEditar_avatar((prevToggle) => !prevToggle);
  }

  const patchAge = async (e) => {
    e.preventDefault();
    if (age <= 0 || age === undefined || age === null) {
      alert("Por favor, coloque seu email e senha");
      return;
    }
    const data = {
      age
    };
    const response = await api.patch(`/Perfil/${id}`, data);
    console.log(response.data);
    alert("Atualização realizada com sucesso");
  };
  console.log(user)
  console.log(usuario);
  const usuarioLivros = usuario.books
  console.log(usuarioLivros);



  const destroyFavBook = async ({Livro}) => {
    console.log(Livro);

    const { idLivro } = Livro;
    console.log(idLivro);


    const response = await api.delete(
      `/Perfil/${idUsuario}/destroyBookfromFavorites/${idLivro}`,
      { idLivro }
    );
    console.log("1teste");
    console.log(idLivro);
    console.log(response);
    console.log("2teste");
    console.log(response.data);
    console.log("3teste");
    console.log(user.id);
    alert("Atualização realizada com sucesso");


  }




  return (
    <div className={`${styles.Perfil_Page}`}>
      {nome && (
        <>
          <Navbar />
          <div className={`${styles.Perfil_container}`}>
            <div className={styles.Perfil}>
              <div>
                <img
                  className={`${styles.Foto}`}
                  src={Avatar}
                  onClick={() => editar_Avatar()}
                  alt=""
                />
              </div>
              {divEditar_avatar && (
                <div className={styles.escolha_avatar}>
                  {avatares.map((avat) => (
                    <img
                      className={`${styles.Foto_para_escolher}`}
                      src={avat}
                      onClick={() => escolha_avatar(avat)}
                      alt=""
                    />
                  ))}

                  {/* <img className={`${styles.avatares}`} src={avatar_padrao} /> */}
                </div>
              )}

              <div className={styles.Perfil_detalhes}>
                <h1>{nomeCapitalized}</h1>
                <FaUserEdit />
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
              </div>
            </div>
            <div className={styles.Perfil_painel}>
              {usuarioLivros?.map((Livro) => (
                <div key={Livro.idLivro} className={`${styles.livro}`}>
                  <div
                    className={`${styles.livroCada}`}
                    // ref={(el) => (btnRef.current[livro.id] = el)}
                  >
                    <BootstrapTooltip
                      title={Livro.ttlLivro}
                      arrow
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 1000 }}
                      placement="top"
                    >
                      <button className={`${styles.livro_buttom}`}>
                        <Link to={`/book/${Livro.idLivro}`}>
                          <img
                            className={`${styles.capa}`}
                            src={Livro.imgLivro}
                            alt={Livro.ttlLivro}
                          />
                        </Link>
                      </button>
                    </BootstrapTooltip>
                    <div>
                      <button
                        type="submit"
                        className={styles.favRemove_btn}
                        onClick={() => destroyFavBook({Livro})}
                      >
                        Remover dos favoritos
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <FooterBack />
        </>
      )}
    </div>
  );
}
export default Perfil;
