import styles from "./Livros.module.css";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { yellow } from "@mui/material/colors";


function Livros( {livros} ) {


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
              {/* <p key={livro.id}>{livro.volumeInfo.title}</p> */}
              <BootstrapTooltip
                title={livro.volumeInfo.title}
                arrow
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 1000 }}
              >
                <img
                  className={`${styles.capa}`}
                  src={livro.volumeInfo.imageLinks.smallThumbnail}
                  // title={livro.volumeInfo.title}
                  alt={livro.id}
                  key={livro.id}
                />
              </BootstrapTooltip>
            </div>
          )}
        </>
      ))}
    </div>
  );
}

export default Livros;