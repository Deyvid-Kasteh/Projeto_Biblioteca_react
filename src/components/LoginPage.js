import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import FooterBack from "./FooterBack";

import Switch from "@mui/material/Switch";
import styles from "./LoginPage.module.css";

// ICONS ----------------------------------------------------------------
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
// ICONS ----------------------------------------------------------------

import { AuthContext } from "../contexts/auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const navigate = useNavigate();
  const { authenticated, user, login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputPasswordType, setInputPasswordType] = useState(true);

  const notifyNoEmailSenhaAlert = (text) => toast.warning(text);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      notifyNoEmailSenhaAlert("Por favor, coloque email e senha");
      return;
    }
    if (password.length <= 7) {
      notifyNoEmailSenhaAlert("Senha minima: 8 caracteres");
      return;
    }

    console.log("Login");
    console.log("email:", email);
    console.log("password:", password);
    login(email, password);
    console.log("passou pelo login");
    navigate("/");
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
                value={email}
                placeholder="Email..."
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className={styles.formGroup}>
                <input
                  type={inputPasswordType ? "password" : "text"}
                  name="password"
                  id="password"
                  value={password}
                  placeholder="Senha..."
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {password ? (
                  <>
                    <div className={`${styles.password_see}`}>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setInputPasswordType(!inputPasswordType);
                        }}
                      >
                        <h2>
                          {inputPasswordType ? <RxEyeClosed /> : <RxEyeOpen />}
                        </h2>
                      </button>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className={styles.formGroup_key}>
                <Link to="/login">
                  <p>Esqueci a senha</p>
                  🔑
                </Link>
              </div>
              <div className={styles.formGroup_btn}>
                <button
                  type="submit"
                  // {styles.login_btn}
                  className={styles.login_btn}
                  onClick={handleLogin}
                >
                  ENTRAR
                </button>
              </div>
              <div className={styles.formGroup_switch}>
                <Switch
                  // defaultChecked
                  color="warning"
                  // color="primary"

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
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          // toastStyle={{color: "white", backgroundColor: "transparent"}}
          theme="colored"
          // closeButton={<p>Fechar</p>}
        />
      </div>
      <FooterBack />
    </div>
  );
}

export default LoginPage;
