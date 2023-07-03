import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import FooterBack from "./FooterBack";
import { api } from "../services/api";
import { AuthContext } from "../contexts/auth";

import styles from "./Books.module.css";
import genericCover from "../components/img/genericCover.jpg";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { yellow } from "@mui/material/colors";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BsSearch } from "react-icons/bs";


// CRIAÇÃO DE CAIXA DE CONTEXTO
import {
  Menu,
  Item,
  Separator,
  Submenu,
  useContextMenu,
} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
// CRIAÇÃO DE CAIXA DE CONTEXTO

function Books() {
  const btnRef = useRef([]);
  const idLivroParaContextMenu = useRef();
  const imgLivroParaContextMenu = useRef();
  const ttlLivroParaContextMenu = useRef();
  const { pesquisaTeste, setPesquisaTeste } = useContext(AuthContext);

  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const idUsuario = user?.id;
  const [resultadosLivros, setResultadosLivros] = useState();
  const [tituloLivroMenuContexto, setTituloLivroMenuContexto] = useState();

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
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${id}&maxResults=40`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => setResultadosLivros(data.items))
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  const notifyVerDepois = () => toast.success("Livro salvo em Ver Depois ⏰");
  const notifyFavoritos = () => toast.success("Livro salvo nos Favoritos ❤️");

  // CAIXA DE CONTEXTO

  const { show } = useContextMenu();

  function displayMenu(e) {
    idLivroParaContextMenu.current = e.target.dataset.id;
    imgLivroParaContextMenu.current = e.target.dataset.src;
    ttlLivroParaContextMenu.current = e.target.dataset.title;
    setTituloLivroMenuContexto(e.target.alt);

    show({
      id: "menuLivro",
      event: e,
    });
  }
  // CAIXA DE CONTEXTO

  // ADICIONAR AOS  FAVORITOS
  const handleAddBookToFavorites = async () => {
    if (user) {
      const idLivro = idLivroParaContextMenu.current;
      const imgLivro = imgLivroParaContextMenu.current;
      const ttlLivro = ttlLivroParaContextMenu.current;
      const response = await api.patch(
        `/Perfil/${idUsuario}/addBookToFavorites/${idLivro}`,
        { idLivro, imgLivro, ttlLivro }
      );
      console.log(response.data);
      notifyFavoritos();
    } else {
      toast.warning("Necessário fazer Login");
    }
  };
  // ADICIONAR AOS  FAVORITOS

  // ADICIONAR AO VER DEPOIS
  const handleAddBookToSeeLater = async () => {
    if (user) {
      const idLivro = idLivroParaContextMenu.current;
      const imgLivro = imgLivroParaContextMenu.current;
      const ttlLivro = ttlLivroParaContextMenu.current;
      const response = await api.patch(
        `/Perfil/${idUsuario}/addBookToSeeLater/${idLivro}`,
        { idLivro, imgLivro, ttlLivro }
      );
      console.log(response.data);
      notifyVerDepois();
    } else {
      toast.warning("Necessário fazer Login");
    }
  };
  // ADICIONAR AO VER DEPOIS

  console.log(resultadosLivros);

  // VER LIVRO
  const handleSeeBook = () => {
    navigate(`/book/${idLivroParaContextMenu.current}`);
  };
  // VER LIVRO

  return (
    <div className={`${styles.Books_Page}`}>
      <Navbar />
      <div className={`${styles.form}`}>
        <input
          className={`${styles.input_busca}`}
          type="text"
          name="input_busca"
          value={pesquisaTeste}
          // placeholder={pesquisaTeste}
          onChange={(e) => setPesquisaTeste(e.target.value)}
          autoComplete="off"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              navigate(`/books/${pesquisaTeste}`);
            }
          }}
        />
        <button className={`${styles.btn_busca}`}>
          <Link to={`/books/${pesquisaTeste}`} reloadDocument
          >
            <BsSearch />
          </Link>
        </button>
      </div>
      <div className={`${styles.books_container}`}>
        {resultadosLivros?.map((livro) => (
          <div key={livro.id}>
            {livro.volumeInfo && (
              <>
                <div
                  ref={(el) => (btnRef.current[livro.id] = el)}
                  className={`${styles.livro}`}
                >
                  <div
                    id={`${livro.id}`}
                    key={`${livro.id}`}
                    onClick={displayMenu}
                  >
                    <BootstrapTooltip
                      title={livro.volumeInfo.title}
                      arrow
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 1000 }}
                    >
                      <button
                        className={`${styles.livro_buttom}`}
                        // onClick={() => handleSeeBook(livro)}
                      >
                        {/* <Link to={`/book/${livro.id}`}> */}
                        {livro.volumeInfo.imageLinks ? (
                          <img
                            className={`${styles.capa}`}
                            src={livro.volumeInfo.imageLinks.thumbnail}
                            alt={livro.id}
                            key={livro.id}
                            data-id={livro.id}
                            data-src={livro.volumeInfo.imageLinks.thumbnail}
                            data-title={livro.volumeInfo.title}
                          />
                        ) : (
                          <div className={styles.capa}>
                            <img
                              className={styles.capaSemImagem}
                              src={genericCover}
                              alt={livro.id}
                              key={livro.id}
                              data-id={livro.id}
                              data-src={genericCover}
                              data-title={livro.volumeInfo.title}
                            />
                            <p className={styles.capaSemImagemP}>
                              {livro.volumeInfo.title}
                            </p>
                          </div>
                        )}
                      </button>
                    </BootstrapTooltip>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
        <Menu id={"menuLivro"} theme="light">
          <Item onClick={handleSeeBook}>
            📖 {ttlLivroParaContextMenu.current}
          </Item>
          <Separator />
          <Item onClick={handleAddBookToFavorites}>❤️ Favoritar</Item>
          <Separator />
          <Item onClick={handleAddBookToSeeLater}>⏰ Ver depois</Item>
          <Separator />
          <Item disabled>💰 comprar</Item>
          <Separator />
          <Submenu label="⏬  Mais opções">
            {/* <Item>Reportar um erro 📣📢‼️❗⛔🚫💡💰💣📩✉🔗</Item> */}
            <Item onClick={() => toast.warning(<h2>"Em construção... 🚧"</h2>)}>
              💡 Sugerir uma dica{" "}
            </Item>
            <Item onClick={() => toast.warning(<h2>"Em construção... 🚧"</h2>)}>
              📢 Reportar um erro{" "}
            </Item>
          </Submenu>
        </Menu>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          // toastStyle={{color: "white", backgroundColor: "transparent"}}
          theme="dark"
          // closeButton={<p>Fechar</p>}
        />
      </div>
      <FooterBack />
    </div>
  );
}

export default Books;
