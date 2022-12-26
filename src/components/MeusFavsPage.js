import styles from "./MeusFavsPage.module.css";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { yellow } from "@mui/material/colors";

function MeusFavsPage({ Livros, destroyFavBook }) {

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



  console.log("++++++++++++++++++++++++++++++++++++++");
  console.log(Livros);
  console.log("++++++++++++++++++++++++++++++++++++++");


  return (
    <>
      {Livros?.map((Livro) => (
        <div key={Livro.idLivro} className={`${styles.livro}`}>
          <div
            className={`${styles.livroCada}`}
            // ref={(el) => (btnRef.current[livro.id] = el)}
          >
            <BootstrapTooltip
              title={Livro.ttlLivro}
              arrow
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 1000 }}
              placement="top"
            >
              <button className={`${styles.livro_buttom}`}>
                <Link to={`/book/${Livro.idLivro}`}>
                  <img
                    className={`${styles.capa}`}
                    src={Livro.imgLivro}
                    alt={Livro.ttlLivro}
                  />
                </Link>
              </button>
            </BootstrapTooltip>
            <div>
              <button
                type="submit"
                className={styles.favRemove_btn}
                onClick={() => destroyFavBook({Livro})}
              >
                Remover dos favoritos
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default MeusFavsPage;
