import styles from "./MeusSeeLaterPage.module.css";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { yellow } from "@mui/material/colors";

function MeusSeeLaterPage({ LivrosSeeLater, destroySeeLaterBook }) {
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

  // console.log("++++++++++++++++++++++++++++++++++++++");
  // console.log(Livros);
  // console.log("++++++++++++++++++++++++++++++++++++++");

  return (
    <>
      <div className={`${styles.bookFavContainer}`}>
        <div className={`${styles.bookFavTitle}`}>
          <h1>Ver depois</h1>
        </div>
        <div className={`${styles.bookSeeLaterBox}`}>
          {LivrosSeeLater?.map((Livro) => (
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
                    onClick={() => destroySeeLaterBook({ Livro })}
                  >
                  Remover do Ver depois ❌
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MeusSeeLaterPage;
