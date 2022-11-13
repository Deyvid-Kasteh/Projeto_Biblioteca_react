import styles from "./Livros.module.css";

function Livros( {livros} ) {

        console.log( livros )

  return (
    <div className={`${styles.livros}`}>
      {livros.map((livro) => (
        <>
          {livro.volumeInfo.imageLinks && (
            <div className={`${styles.livro}`}>
              <p key={livro.id}>{livro.volumeInfo.title}</p>
              <img
                className={`${styles.capa}`}
                src={livro.volumeInfo.imageLinks.smallThumbnail}
                alt={livro.id}
              />
            </div>
          )}
        </>
      ))}
    </div>
  );
}

export default Livros;