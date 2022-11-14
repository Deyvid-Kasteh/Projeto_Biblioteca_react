import styles from "./Main.module.css";
import { BsSearch } from "react-icons/bs";
import {useState} from 'react'
import Livros from "./Livros";


function Main() {

  
  

  const [pesquisa, setPesquisa] = useState('Biblioteca')

  
  let [resultadosLivros, setResultadosLivros] = useState();


  function BuscarLivros() {
    console.log(`a pesquisa é: ${ pesquisa }`);
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

  function ApagarResultadosLivros() {
    setResultadosLivros(false)
  }

  console.log(resultadosLivros)



  return (
    <div className={`${styles.Main_container}`}>
      {!resultadosLivros ? (
        <div>
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
        </div>
      ) : (
        <div className={`${styles.Main_container}`}>
          <Livros livros={resultadosLivros} />
          <button
            className={`${styles.btn_voltar}`}
            onClick={ApagarResultadosLivros}
          >
            <h1>Voltar</h1>
            </button>
            {/* <p>{pesquisa}</p> */}
        </div>
      )}
    </div>
  );
}

export default Main;
