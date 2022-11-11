import styles from "./Main.module.css";
import { BsSearch } from "react-icons/bs";
import {useState} from 'react'
import Livros from "./Livros";

function Main() {

  
  

  const [pesquisa, setPesquisa] = useState('Biblioteca')

  
  let [resultadosLivros, setResultadosLivros] = useState();


  function BuscarLivros(pesquisa) {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${pesquisa}&maxResults=40`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((resp) => resp.json())
      // .then((data) => console.log(data['items']))
      .then((data) => setResultadosLivros(data["items"]))
      .catch((err) => console.log(err));
  }

  console.log(resultadosLivros)



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
        <button className={`${styles.btn_busca}`} onClick={BuscarLivros}>
          <BsSearch />
        </button>
      </div>
      <Livros livros={resultadosLivros} />
    </div>
  );
}

export default Main;
