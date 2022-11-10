import styles from "./Main.module.css";

function Main() {
  return (
    <div className={`${styles.Main_container}`}>
      <h1 className={`${styles.title}`}>Biblioteca.</h1>
      <input className={`${styles.input_busca}`} type="text" name="input_busca" placeholder="Digite o nome do livro"/>
    </div>
  );
}

export default Main;
