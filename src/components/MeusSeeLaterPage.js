import styles from "./MeusSeeLaterPage.module.css";
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

function MeusSeeLaterPage() {
  const { id } = useParams();

  const [livrosSeeLater, setLivrosSeeLater] = useState("");

  const [removeLoading, setRemoveLoading] = useState(false);

  const notify = () => toast("Livro removido do ⏰");

  const fetchUsuario = async () => {
    const resp = await api.get(`/Perfil/${id}`);
    setLivrosSeeLater(resp?.data.booksSeeLater);
    setRemoveLoading(true);
  };

  console.log(livrosSeeLater);

  const destroySeeLaterBook = async ({ Livro }) => {
    const { idLivro } = await Livro; //Desestruturação
    const response = await api.delete(
      `/Perfil/${id}/destroySeeLaterBook/${idLivro}`,
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
    <>
      <div className={`${styles.SeeLater_Page}`}>
        <Navbar />
        {livrosSeeLater && (
          <div className={`${styles.SeeLater_container}`}>
            <div className={styles.Perfil}>
              <AvatarPainel />
              <div className={styles.Perfil_detalhes}>
                <h1>⏰ Ver depois</h1>
                <h1>Buscar</h1>
              </div>
            </div>
            <div className={styles.SeeLater_painel}>
              {livrosSeeLater?.map((Livro) => (
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
    </>
  );
}

export default MeusSeeLaterPage;
