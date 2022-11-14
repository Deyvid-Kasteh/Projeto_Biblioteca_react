import styles from "./Livros.module.css";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { yellow } from "@mui/material/colors";


function Livros( {livros} ) {

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
        <>
          {livro.volumeInfo.imageLinks && (
            <div className={`${styles.livro}`} key={livro.id}>
              <BootstrapTooltip
                title={livro.volumeInfo.title}
                arrow
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 1000 }}
              >
                <div className={livro.id}>
                  <button onClick={() => handleBook(livro.id)}>
                    <img
                      className={`${styles.capa}`}
                      src={livro.volumeInfo.imageLinks.smallThumbnail}
                      alt={livro.id}
                      key={livro.id}
                    />
                  </button>
                </div>
              </BootstrapTooltip>
            </div>
          )}
        </>
      ))}
    </div>
  );
}

export default Livros;