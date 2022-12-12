import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Book.module.css";
import noimage from "./img/noimage.png";
import Navbar from "./Navbar";
import FooterBack from "./FooterBack";


function Book() {
  const { id } = useParams();
  const [livro, setLivro] = useState();
  useEffect(() => {
          fetch(`https://www.googleapis.com/books/v1/volumes/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          })
                  .then((resp) => resp.json())

                  .then((bookData) => {
                          console.log(livro)
                          setLivro(bookData.volumeInfo)
                          console.log(livro)
                  }

                  )

                  .catch((err) => console.log(err));

  }, []);


        // console.log(livro.imageLinks.thumbnail);


        return (
          <div className={`${styles.Book_Page}`}>
            <Navbar />
            <div className={`${styles.Book_Page_box}`}>
              {livro && (
                <div className={`${styles.Book_container}`}>
                  <div className={`${styles.up}`}>
                    <div className={`${styles.bookCover}`}>
                      <img
                        className={`${styles.capa}`}
                        src={livro.imageLinks.thumbnail}
                        alt={livro.id}
                        key={livro.id}
                      />
                    </div>
                    <div className={`${styles.bookDetails}`}>
                      <h1 className={`${styles.title}`}>
                        Titulo: <strong>{livro.title}</strong>
                      </h1>
                      <h3 className={`${styles.authors}`}>
                        {livro.authors
                          ? `Autor: ${livro.authors[0]}`
                          : "Não identificado"}
                      </h3>
                      <h3 className={`${styles.language}`}>
                        Idioma: {livro.language}
                      </h3>
                      <h3 className={`${styles.pageCount}`}>
                        Número de páginas: {livro.pageCount}
                      </h3>
                      <h3 className={`${styles.publisher}`}>
                        Livraria: {livro.publisher}
                      </h3>
                      <h3 className={`${styles.publishedDate}`}>
                        Lançamento: {livro.publishedDate}
                      </h3>
                      <h3 className={`${styles.description}`}>
                        Descrição: {livro.description}
                      </h3>
                      {/* <div className={`${styles.images}`}>
                      <img
                        className={`${styles.capaDetails}`}
                        src={
                          livro.imageLinks.smallThumbnail || {
                            noimage,
                          }
                        }
                        alt={livro.id}
                      />
                      <img
                        className={`${styles.capaDetails}`}
                        src={livro.imageLinks.thumbnail || { noimage }}
                        alt={livro.id}
                      />
                      <img
                        className={`${styles.capaDetails}`}
                        src={livro.imageLinks.small || { noimage }}
                        alt={livro.id}
                        key={livro.id}
                      />
                      <img
                        className={`${styles.capaDetails}`}
                        src={livro.imageLinks.medium || { noimage }}
                        alt={livro.id}
                        key={livro.id}
                      />
                      <img
                        className={`${styles.capaDetails}`}
                        src={livro.imageLinks.large || { noimage }}
                        alt={livro.id}
                        key={livro.id}
                      />
                      <img
                        className={`${styles.capaDetails}`}
                        src={livro.imageLinks.extraLarge || { noimage }}
                        alt={livro.id}
                        key={livro.id}
                      />
                    </div> */}
                    </div>
                  </div>
                  <div className={`${styles.down}`}>
                    <div className={`${styles.images}`}>
                      <img
                        className={`${styles.capaDetails}`}
                        src={livro.imageLinks.thumbnail || { noimage }}
                        alt={livro.id}
                      />
                      <img
                        className={`${styles.capaDetails}`}
                        src={livro.imageLinks.small || { noimage }}
                        alt={livro.id}
                        key={livro.id}
                      />
                      <img
                        className={`${styles.capaDetails}`}
                        src={livro.imageLinks.medium || { noimage }}
                        alt={livro.id}
                        key={livro.id}
                      />
                      <img
                        className={`${styles.capaDetails}`}
                        src={livro.imageLinks.large || { noimage }}
                        alt={livro.id}
                        key={livro.id}
                      />
                      <img
                        className={`${styles.capaDetails}`}
                        src={livro.imageLinks.extraLarge || { noimage }}
                        alt={livro.id}
                        key={livro.id}
                      />
                    </div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              )}
            </div>
            <FooterBack />
          </div>
        );
}


export default Book
