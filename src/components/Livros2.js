import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Livros2.module.css";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { yellow } from "@mui/material/colors";

import noimage from "./img/noimage.png";

function Livros() {
  const btnRef = useRef([]);

  const { id } = useParams();
  const [resultadosLivros, setResultadosLivros] = useState();

  console.log("1");



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
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${id}&maxResults=40`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => setResultadosLivros(data.items))
      .then(console.log(resultadosLivros))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={`${styles.livros}`}>
      {resultadosLivros?.map((livro) => (
        <div>
          {livro.volumeInfo.imageLinks && (
            <div
              ref={(el) => (btnRef.current[livro.id] = el)}
              className={`${styles.livro}`}
              key={livro.id}
            >
              <BootstrapTooltip
                title={livro.volumeInfo.title}
                arrow
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 1000 }}
              >
                <button>
                  <Link to={`/books/${livro.id}`}>
                    <img
                      className={`${styles.capa}`}
                      src={livro.volumeInfo.imageLinks.thumbnail}
                      alt={livro.id}
                      key={livro.id}
                    />
                  </Link>
                </button>
              </BootstrapTooltip>
              {/* className={`${styles.}`} */}
              <div className={`${styles.livroDetalhe}`}>
                <p className={`${styles.title}`}>
                  Titulo: <strong>{livro.volumeInfo.title}</strong>
                </p>
                <a href={livro.selfLink}>{livro.selfLink}</a>

                <p className={`${styles.authors}`}>
                  Autor:
                  {livro.volumeInfo.authors
                    ? livro.volumeInfo.authors[0]
                    : "Não identificado"}
                </p>
                <p className={`${styles.publisher}`}>
                  Livraria: {livro.volumeInfo.publisher}
                </p>
                <p className={`${styles.language}`}>
                  Idioma: {livro.volumeInfo.language}
                </p>
                <p className={`${styles.pageCount}`}>
                  Número de páginas: {livro.volumeInfo.pageCount}
                </p>
                <p className={`${styles.description}`}>
                  Descrição: {livro.volumeInfo.description}
                </p>
                <p className={`${styles.publishedDate}`}>
                  Lançamento: {livro.volumeInfo.publishedDate}
                </p>
                <div className={`${styles.images}`}>
                  <img
                    className={`${styles.capaDetails}`}
                    src={
                      livro.volumeInfo.imageLinks.smallThumbnail || { noimage }
                    }
                    alt={livro.id}
                  />
                  <img
                    className={`${styles.capaDetails}`}
                    src={livro.volumeInfo.imageLinks.thumbnail || { noimage }}
                    alt={livro.id}
                  />
                  <img
                    className={`${styles.capaDetails}`}
                    src={livro.volumeInfo.imageLinks.small || { noimage }}
                    alt={livro.id}
                  />
                  <img
                    className={`${styles.capaDetails}`}
                    src={livro.volumeInfo.imageLinks.medium || { noimage }}
                    alt={livro.id}
                  />
                  <img
                    className={`${styles.capaDetails}`}
                    src={livro.volumeInfo.imageLinks.large || { noimage }}
                    alt={livro.id}
                  />
                  <img
                    className={`${styles.capaDetails}`}
                    src={livro.volumeInfo.imageLinks.extraLarge || { noimage }}
                    alt={livro.id}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Livros;