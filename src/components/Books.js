import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import FooterBack from "./FooterBack";
import { api } from "../services/api";
import { AuthContext } from "../contexts/auth";

import styles from "./Books.module.css";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { yellow } from "@mui/material/colors";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Books() {
  const btnRef = useRef([]);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const idUsuario = user.id;

  const [resultadosLivros, setResultadosLivros] = useState();

  // console.log("1");
  // console.log(id);
  // console.log(user.id);

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
      // .then(console.log(resultadosLivros))
      .catch((err) => console.log(err));
  }, []);

  const handleAddBookToSeeLater = async (livro) => {
    const idLivro = livro.id;
    const imgLivro = livro.volumeInfo.imageLinks.thumbnail;
    const ttlLivro = livro.volumeInfo.title;
    const response = await api.patch(
      `/Perfil/${idUsuario}/addBookToSeeLater/${idLivro}`,
      { idLivro, imgLivro, ttlLivro }
    );
    // console.log(response.data);
    notify();
  };
  const notify = () => toast("Livro salvo em Ver Depois ⏰");

  const [divAtHover, setDivAtHover] = useState(false);
  const showAtHover = (key) => {
    setDivAtHover(true)
  console.log(key)}
    const HideAtNoHover = () => setDivAtHover(false);

  // console.log(livro)

  return (
    <div className={`${styles.Books_Page}`}>
      <Navbar />
      <div className={`${styles.books_container}`}>
        {resultadosLivros?.map((livro, key) => (
          <div key={livro.id}>
            {livro.volumeInfo.imageLinks && (
              <>
                <div
                  ref={(el) => (btnRef.current[livro.id] = el)}
                  className={`${styles.livro}`}
                  onMouseEnter={() => showAtHover(key)}
                  onMouseLeave={() => HideAtNoHover()}
                >
                  <BootstrapTooltip
                    title={livro.volumeInfo.title}
                    arrow
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 1000 }}
                  >
                    <button className={`${styles.livro_buttom}`}>
                      <Link to={`/book/${livro.id}`}>
                        <img
                          className={`${styles.capa}`}
                          src={livro.volumeInfo.imageLinks.thumbnail}
                          alt={livro.id}
                          key={livro.id}
                        />
                      </Link>
                    </button>
                  </BootstrapTooltip>
                  {(divAtHover) ? (
                    <div className={`${styles.books_fav}`}>
                      <BootstrapTooltip
                        title="Ler depois"
                        arrow
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 1000 }}
                      >
                        <button
                          className={`${styles.books_fav_buttom}`}
                          onClick={() => handleAddBookToSeeLater(livro)}
                        >
                          <p className={`${styles.books_fav_buttom_book}`}>
                            ⏰
                          </p>
                        </button>
                      </BootstrapTooltip>
                    </div>
                  ) : ("")}
                </div>
              </>
            )}
          </div>
        ))}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
      <FooterBack />
    </div>
  );
}

export default Books;
