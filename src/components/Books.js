import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./Books.module.css";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { yellow } from "@mui/material/colors";
import noimage from "./img/noimage.png";

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
    <div className={`${styles.books_container}`}>
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
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Books;
