import { Link } from "react-router-dom";
import Clock from "./Clock";
import Navbar from "./Navbar";



import { useContext, useState } from "react";
import styles from "./Login.module.css";
// import { HiOutlineEmojiSad } from "react-icons/hi";
import { VscKey } from "react-icons/vsc";
// import obiblio from "../components/img/obiblio.webp";

// import { createSession } from "../services/api";
import { AuthContext } from "../contexts/auth";

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
        {/* <div className={styles.login_pic}>
          <img className={styles.obiblio} src={obiblio} alt="obiblio" />
        </div> */}

        <div className={styles.login_form}>
          <div className={`${styles.title}`}>
            <h1>Login</h1>
          </div>

          <form className={styles.login_form_login}>
            {/* <div className={styles.formGroup}>
              <input
                type="text"
                name="name"
                id="user name"
                placeholder="Nome..."
                autoComplete="off"
              />
            </div> */}
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
              {/* <div className={styles.formGroup}>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirme a senha..."
                  autoComplete="off"
                />
              </div> */}
              <div className={styles.formGroup_key}>
                <Link to="/login">
                  <p>Esqueci a senha</p>
                  <VscKey className={`${styles.icons}`} />
                </Link>
              </div>
            </div>
          </form>

          {/* <p>Authenticated: {JSON.stringify(authenticated)}</p>
           <p>TESTE: {JSON.stringify(user)}</p> */}

          {/* <div className="form">
            <div className="fild">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                className={`${styles.email}`}
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="fild">
              <label htmlFor="password">Senha:</label>
              <input
                type="password"
                name="password"
                id="password"
                className={`${styles.password}`}
                placeholder="Senha"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="actions">
              <button onClick={handleLogin} type="submit">
                Entrar
              </button>
              <button onClick={handleLogin} type="submit">
                Sair
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
