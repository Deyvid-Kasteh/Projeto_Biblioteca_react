import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";


import styles from "./LoginNav.module.css";
import { BsPersonCircle } from "react-icons/bs";
import { AuthContext } from "../contexts/auth";



function LoginNav() {
  const loginName = useRef('Login');
  const { authenticated, user, logout } = useContext(AuthContext);
  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const idPerfil = user?.id;

  if (user) {
    const nome = user?.name;
    const nomeCapitalized = capitalizeFirst(nome);

    loginName.current = nomeCapitalized;
  } else {
    loginName.current = 'Login';
 }

  console.log(authenticated);
  console.log(user?.id);

  const sair = async () => {
    await logout();
    console.log("saiu");
  };

  return (
    <div className={`${styles.loginNav_container}`}>
      <h1>
        {!authenticated ? (
          <Link
            to="/loginPage"
            className={`${styles.loginNav_item}`}
            onClick={sair}
          >
            <BsPersonCircle /> Login
          </Link>
        ) : (
          <>
            Bem vindo
            <Link
              to={`/Perfil/${idPerfil}`}
              className={`${styles.loginNav_item}`}
            >
              {loginName.current}
            </Link>
            <Link
              to="/loginPage"
              className={`${styles.loginNav_item}`}
              onClick={sair}
            >
              Sair
            </Link>
          </>
        )}
      </h1>
    </div>
  );
}

export default LoginNav;
