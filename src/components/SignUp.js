import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import Navbar from "./Navbar";


import styles from "./SignUp.module.css";
// import { HiOutlineEmojiSad } from "react-icons/hi";
// import obiblio from "../components/img/obiblio.webp";


// import { createSession } from "../services/api";
import { AuthContext } from "../contexts/auth";

function SignUp() {
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
            <h1>Inscrever</h1>
          </div>

          <form className={styles.login_form_login}>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="name"
                id="user name"
                placeholder="Nome..."
                autoComplete="off"
              />
            </div>
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
              <div className={styles.formGroup}>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirme a senha..."
                  autoComplete="off"
                />
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
              <div className={styles.formGroup_Login}>
                <p>Já tem conta?</p>
                <Link to="/Login">
                  <p>Login</p>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
