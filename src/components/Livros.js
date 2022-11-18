import { useRef } from "react";
import { Link } from "react-router-dom";



import styles from "./Livros.module.css";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { yellow } from "@mui/material/colors";

import noimage from "./img/noimage.png";

function Livros({ livros }) {
  


  const btnRef = useRef([])
  const handler = idx => e => {
    console.log(e)
    
    



    const btnRefclicked = btnRef.current[idx]
    if (btnRefclicked) {

      if (btnRefclicked.children[1].style.display === "flex") {
        console.log("foi 1");
        btnRefclicked.classList.remove(`${styles.bg_salmon}`);
        btnRefclicked.children[1].style.display = "none";
        // btnRefclicked.style.width = "auto"
        // btnRefclicked.style.height = "auto";
        // btnRefclicked.style.background = "rgba(0, 0, 0, 0.5)";
      } else {
        console.log("foi 2");
        console.log(btnRefclicked);
        console.log(btnRefclicked.children);
        // btnRefclicked.style.position = "fixed";
        // btnRefclicked.style.width = "80%";
        // btnRefclicked.style.height = "80%";
        // btnRefclicked.style.backgroundColor = "black";
        // 👇️ toggle class on click
        btnRefclicked.classList.add(`${styles.bg_salmon}`);
        btnRefclicked.children[1].style.display = "flex";
      }
    } else {
      console.log('algo não deu certo')
    }
  }


  console.log(livros)
  
  const colorred = yellow[500];



  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: colorred,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: colorred,
      color: "black",
    },
  }));

  return (
    <div className={`${styles.livros}`}>
      {livros.map((livro) => (
        <div key={livro.id}>
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
                <button onClick={handler(livro.id)}>
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
                    key={livro.id}
                  />
                  <img
                    className={`${styles.capaDetails}`}
                    src={livro.volumeInfo.imageLinks.medium || { noimage }}
                    alt={livro.id}
                    key={livro.id}
                  />
                  <img
                    className={`${styles.capaDetails}`}
                    src={livro.volumeInfo.imageLinks.large || { noimage }}
                    alt={livro.id}
                    key={livro.id}
                  />
                  <img
                    className={`${styles.capaDetails}`}
                    src={livro.volumeInfo.imageLinks.extraLarge || { noimage }}
                    alt={livro.id}
                    key={livro.id}
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