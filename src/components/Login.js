import { useContext, useState } from "react";
import styles from "./Login.module.css";

// import { createSession } from "../services/api";
import { AuthContext } from "../contexts/auth";


function Login() {
  const { authenticated , user, login } = useContext(AuthContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log("Login");
    console.log("email", email);
    console.log("password", password);
    login(email, password);

    // const response = await createSession(email, password);
    // console.log("login", response.data);
  }
  return (
    <div className={`${styles.login_container}`}>
      <div className={`${styles.title}`}>
        <h1>Login</h1>
      </div>
      <p>Authenticated: {JSON.stringify(authenticated)}</p>
      <p>TESTE: {JSON.stringify(user)}</p>

      <div className="form">
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
      </div>

      <h1>oi</h1>
    </div>
  );
}

export default Login;
