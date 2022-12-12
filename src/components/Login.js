import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Navbar from "./Navbar";
import FooterBack from "./FooterBack";

import Switch from "@mui/material/Switch";
import styles from "./Login.module.css";
import { VscKey } from "react-icons/vsc";


import { AuthContext } from "../contexts/auth";

function Login() {
  const navigate = useNavigate();
  const { authenticated, user, login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Por favor, coloque seu email e senha");
      return;
    }

    console.log("Login");
    console.log("email:", email);
    console.log("password:", password);
    login(email, password);
    console.log("passou pelo login");

  };
  return (
    <div className={`${styles.login_container}`}>
      <Navbar />
      <div className={`${styles.login_container_body}`}>
        <div className={styles.login_form}>
          <div className={`${styles.title}`}>
            <h1>Login</h1>
            <p>{String(authenticated)}</p>
          </div>

          <form className={styles.login_form_login}>
            <div className={styles.formGroup}>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                placeholder="Email.."
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className={styles.formGroup}>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  placeholder="Senha..."
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={styles.formGroup_key}>
                <Link to="/login">
                  <p>Esqueci a senha</p>
                  <VscKey className={`${styles.icons}`} />
                </Link>
              </div>
              <div className={styles.formGroup_btn}>
                <button
                  type="submit"
                  className={styles.login_btn}
                  onClick={handleLogin}
                >
                  Entrar
                </button>
              </div>
              <div className={styles.formGroup_switch}>
                <Switch
                  // defaultChecked
                  color="warning"
                  // onChange={handleChange}
                />
                <p>Manter logado</p>
              </div>
              <div className={styles.formGroup_inscrever}>
                <p>Novo aqui?</p>
                <Link to="/SignUp">
                  <p>Inscrever-se</p>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <FooterBack/>
    </div>
  );
}

export default Login;
