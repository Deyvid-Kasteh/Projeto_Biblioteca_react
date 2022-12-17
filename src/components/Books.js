import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import FooterBack from "./FooterBack";

import styles from "./Books.module.css";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { yellow } from "@mui/material/colors";
import { MdFavorite, MdOutlineFavorite } from "react-icons/md";
import { MdWatchLater, MdOutlineWatchLater } from "react-icons/md";






function Books() {
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
                      <button className={`${styles.books_fav_buttom}`}>
                        <MdWatchLater />
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
