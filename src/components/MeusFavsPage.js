import styles from "./MeusFavsPage.module.css";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { yellow } from "@mui/material/colors";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const notify = () => toast("❤️ => 💔");

  async function DestroyFavBooksFavPage({ Livro }) {
    destroyFavBook({ Livro });
    notify();
  }

  // console.log("++++++++++++++++++++++++++++++++++++++");
  // console.log(Livros);
  // console.log("++++++++++++++++++++++++++++++++++++++");

  return (
    <>
      <div className={`${styles.bookFavContainer}`}>
        <div className={`${styles.bookFavTitle}`}>
          <h1>Meus Favoritos</h1>
        </div>
        <div className={`${styles.bookFavBox}`}>
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
                    onClick={() => DestroyFavBooksFavPage({ Livro })}
                  >
                    💔 Remover dos favoritos 💔
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default MeusFavsPage;
