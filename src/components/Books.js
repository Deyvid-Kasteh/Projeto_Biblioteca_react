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
import {
  MdOutlineBookmarkAdd,
  MdOutlineBookmarkAdded,
} from "react-icons/md";


function Books() {
  const btnRef = useRef([]);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const idUsuario = user.id;


  const [resultadosLivros, setResultadosLivros] = useState();

  console.log("1");
  console.log(id);
  console.log(user.id);

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
      .then(console.log(resultadosLivros))
      .catch((err) => console.log(err));
  }, []);


  const handleAddReadLater = async (livro) => {
    // livro.feito = !livro.feito;
    // console.log('foi todo.done')
    // console.log(livro);
    // console.log(livro);
    const idLivro = livro.id;
    const imgLivro = livro.volumeInfo.imageLinks.thumbnail;
    const ttlLivro = livro.volumeInfo.title;

    const response = await api.patch(
      `/Perfil/${idUsuario}/addBookToFavorites/${idLivro}`,
      {idLivro, imgLivro, ttlLivro}
    );
    // console.log('1teste');
    // console.log(response);
    // console.log('2teste');
    console.log(response.data);
    // console.log("3teste");
    // console.log(user.id);
    alert("Atualização realizada com sucesso");
  }


  return (
    <div className={`${styles.Books_Page}`}>
      <Navbar />
      <div className={`${styles.books_container}`}>
        {resultadosLivros?.map((livro) => (
          <div key={livro.id}>
            {livro.volumeInfo.imageLinks && (
              <>
                <div
                  ref={(el) => (btnRef.current[livro.id] = el)}
                  className={`${styles.livro}`}
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
                  <div className={`${styles.books_fav}`}>
                    <BootstrapTooltip
                      title="Ler depois"
                      arrow
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 1000 }}
                    >
                      <button className={`${styles.books_fav_buttom}`} onClick={() => handleAddReadLater(livro)}>
                        {!livro.feito ? <MdOutlineBookmarkAdd /> : <MdOutlineBookmarkAdded/>}
                      </button>
                    </BootstrapTooltip>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <FooterBack />
    </div>
  );
}

export default Books;
