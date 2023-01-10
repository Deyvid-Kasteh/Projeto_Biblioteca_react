import styles from "./MeusFavsPage.module.css";
import { Link, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { yellow } from "@mui/material/colors";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import Navbar from "./Navbar";
import FooterBack from "./FooterBack";
import { AvatarPainel } from "./Avatar/Avatar";
import Loading from "./Loading";

function MeusFavsPage() {
  const { id } = useParams();

  const [livrosFav, setLivrosFav] = useState("");

  const [removeLoading, setRemoveLoading] = useState(false);

  const notify = () => toast("Livro removido 💔");

  const fetchUsuario = async () => {
    const resp = await api.get(`/Perfil/${id}`);
    setLivrosFav(resp?.data.books);
    setRemoveLoading(true);
  };

  console.log(livrosFav);

  const destroyFavBook = async ({ Livro }) => {
    const { idLivro } = await Livro; //Desestruturação
    const response = await api.delete(
      `/Perfil/${id}/destroyBookfromFavorites/${idLivro}`,
      idLivro
    );
    console.log(response);
    notify();
    fetchUsuario();
  };

  useEffect(() => {
    try {
      fetchUsuario();
    } catch (error) {}
  }, []);

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

  return (
    <div className={`${styles.Favorites_Page}`}>
      <Navbar />
      {livrosFav && (
        <div className={`${styles.Favorites_container}`}>
          <div className={styles.Perfil}>
            <AvatarPainel />
            <div className={styles.Perfil_detalhes}>
              <h1>❤️ Favoritos</h1>
              <h1>Buscar</h1>
            </div>
          </div>
          <div className={styles.Favorites_painel}>
            {livrosFav?.map((Livro) => (
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
                      onClick={() => destroyFavBook({ Livro })}
                    >
                      💔 Remover dos favoritos 💔
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {!removeLoading && <Loading />}
      <FooterBack />
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
    </div>
  );
}

export default MeusFavsPage;
