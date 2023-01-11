import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

import Navbar from "./Navbar";
import FooterBack from "./FooterBack";
import MeusFavsPage from "./MeusFavsPage";
import MeusSeeLaterPage from "./MeusSeeLaterPage";
import Loading from "./Loading";

import { AvatarPainel } from "../components/Avatar/Avatar";

import styles from "./Perfil.module.css";

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

  const [usuario, setUsuario] = useState("");
  const [nome, setNome] = useState("");
  const [removeLoading, setRemoveLoading] = useState(false);

  const fetchUsuario = async () => {
    const resp = await api.get(`/Perfil/${id}`);
    setUsuario(resp?.data);
    const data1 = await resp.data;
    if (data1.details) {
      const data2 = await data1.details;
      const data3 = await data2.picture;
      const picture = await data3;
    }
    setRemoveLoading(true);
    const capitalizeFirst = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };
    const nomeCapitalized = await capitalizeFirst(data1.name);
    setNome(nomeCapitalized);
  };

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
  const [divPainelFavorites, setDivPainelFavorites] = useState(false);
  const [divPainelSeeLater, setDivPainelSeeLater] = useState(false);

  const [divPerfilDetalhesPainel, setDivPerfilDetalhesPainel] = useState(true);

  function openDivPainelFavorites() {
    setDivPainelSeeLater((prevToggle) => false);
    setDivPainelFavorites((prevToggle) => true);
  }

  function openDivPainelSeeLater() {
    setDivPainelFavorites((prevToggle) => false);
    setDivPainelSeeLater((prevToggle) => true);
  }

  const destroyFavBook = async ({ Livro }) => {
    const { idLivro } = await Livro; //Desestruturação
    const response = await api.delete(
      `/Perfil/${id}/destroyBookfromFavorites/${idLivro}`,
      idLivro
    );
    console.log(response);
    // alert("Favorito deletado com sucesso");
    fetchUsuario();
  };

  const destroySeeLaterBook = async ({ Livro }) => {
    const { idLivro } = await Livro; //Desestruturação
    await api.delete(
      `/Perfil/${usuario._id}/destroySeeLaterBook/${idLivro}`,
      idLivro
    );
    alert("See Later deletado com sucesso");
    fetchUsuario();
  };

  useEffect(() => {
    try {
      fetchUsuario();
    } catch (error) {}
  }, []);

  const Livros = usuario.books;
  const LivrosSeeLater = usuario.booksSeeLater;
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  AQUI COMEÇA O RENDER     ++++++++++++++++++++++ ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  return (
    <div className={`${styles.Perfil_Page}`}>
      <Navbar />
      {usuario && (
        <div className={`${styles.Perfil_container}`}>
          <div className={styles.Perfil}>
            <AvatarPainel />
            <div className={styles.Perfil_detalhes}>
              {divPerfilDetalhesPainel && (
                <div className={styles.perfilDetalhesPainel}>
                  <h1>{nome}</h1>
                  <button
                    className={styles.favPage_btn}
                    onClick={() => openDivPainelFavorites()}
                  >
                    <div>Meus favoritos</div>
                    <div className={styles.favPage_btn_heart}>❤️</div>
                  </button>
                  <button
                    className={styles.seeLater_btn}
                    onClick={() => openDivPainelSeeLater()}
                  >
                    <div>Ver depois</div>
                    <div className={styles.seeLater_btn_alam}>⏰</div>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className={styles.Perfil_painel}>
            {divPainelFavorites && (
              <MeusFavsPage Livros={Livros} destroyFavBook={destroyFavBook} />
            )}
            {divPainelSeeLater && (
              <MeusSeeLaterPage
                LivrosSeeLater={LivrosSeeLater}
                destroySeeLaterBook={destroySeeLaterBook}
              />
            )}
          </div>
        </div>
      )}
      {!removeLoading && <Loading />}
      <FooterBack />
    </div>
  );
}
export default Perfil;
