import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Main.module.css";
import { BsSearch } from "react-icons/bs";

// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Main() {
  const [pesquisa, setPesquisa] = useState("Biblioteca");

  return (
    <div className={`${styles.Main_container}`}>
      <h1 className={`${styles.title}`}>{pesquisa || "Biblioteca"}.</h1>
      <div className={`${styles.form}`}>
        <input
          className={`${styles.input_busca}`}
          type="text"
          name="input_busca"
          placeholder="Digite o nome do livro"
          onChange={(e) => setPesquisa(e.target.value)}
        />
        <button className={`${styles.btn_busca}`}>
          <Link to={`/books/${pesquisa}`}>
            <BsSearch />
          </Link>
        </button>
      </div>
    </div>
  );
}
export default Main;
