import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";


import styles from "./Navbar.module.css";
import { BsPersonCircle } from "react-icons/bs";
import Clock from "./Clock";

import { AuthContext } from "../contexts/auth";



function Navbar() {
  const loginName = useRef('Login');
  const { authenticated, user, logout } = useContext(AuthContext);
  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };



  // const [loginName, setLoginName] = useState("Login");

  if (user) {
    const nome = user?.name;
    const nomeCapitalized = capitalizeFirst(nome);

    loginName.current = nomeCapitalized;
  } else {
    loginName.current = 'Login';
 }



  console.log(authenticated);
  // if (user) {
  //   console.log('temos usuário')
  //   console.log(user.name);
  //   const nome = user.name
  //   setLoginName(nome);
  // }
  // console.log(user.email);

  const sair = async () => {
    await logout();
    console.log("saiu");
  };

  return (
    <div className={`${styles.Navbar_container}`}>
      <div>
        <h1>
          <Link to="/" reloadDocument>
            Biblioteca.
          </Link>
        </h1>
      </div>
      <Clock />
      <div>
        <h1>
          <Link to="/login" onClick={sair}>
            <BsPersonCircle /> {loginName.current}
          </Link>
        </h1>
        {/* <button className={styles.login_btn} onClick={sair}>
            <h1>----Login----</h1>
          </button> */}
      </div>
    </div>
  );
}

export default Navbar;
