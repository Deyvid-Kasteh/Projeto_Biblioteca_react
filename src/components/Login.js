import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import Navbar from "./Navbar";
import portal from "./img/portal.jpg";

import Switch from "@mui/material/Switch";
import styles from "./Login.module.css";
// import { HiOutlineEmojiSad } from "react-icons/hi";
import { VscKey } from "react-icons/vsc";
// import obiblio from "../components/img/obiblio.webp";

// import { createSession } from "../services/api";
import { AuthContext } from "../contexts/auth";
import FooterBack from "./FooterBack";

function Login() {
  const { authenticated, user, login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("Login");
    console.log("email", email);
    console.log("password", password);
    login(email, password);

    // const response = await createSession(email, password);
    // console.log("login", response.data);
  };
  return (
    <div className={`${styles.login_container}`}>
      <Navbar />
      <div className={`${styles.login_container_body}`}>
        <div className={styles.login_form}>
          <div className={`${styles.title}`}>
            <h1>Login</h1>
          </div>

          <form className={styles.login_form_login}>
            <div className={styles.formGroup}>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email.."
                autoComplete="off"
              />
              <div className={styles.formGroup}>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Senha..."
                  autoComplete="off"
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
