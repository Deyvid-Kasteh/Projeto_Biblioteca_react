import { useRef, useEffect, useState } from "react";


import styles from "./Livros.module.css";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { yellow } from "@mui/material/colors";


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


  function handleBook(x) {
    console.log(x)
  };

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
                  <img
                    className={`${styles.capa}`}
                    src={livro.volumeInfo.imageLinks.smallThumbnail}
                    alt={livro.id}
                    key={livro.id}
                  />
                </button>
              </BootstrapTooltip>
              <div className={`${styles.livroDetalhe}`}></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Livros;