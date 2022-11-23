import styles from "./Index.module.css";
import { BsSearch } from "react-icons/bs";
import {useState} from 'react'
import { Link } from "react-router-dom";

function Index() {

  const [pesquisa, setPesquisa] = useState('Biblioteca')

  return (
    <div className={`${styles.Index_container}`}>
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
          <Link to={`/livros/${pesquisa}`}>
            <BsSearch />
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Index;
