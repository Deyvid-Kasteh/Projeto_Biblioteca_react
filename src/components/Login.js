import { useState } from "react";
import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log("Login");
    console.log("email", email);
    console.log("password", password);
  }



  return (
    <div className={`${styles.login_container}`}>
      <div className={`${styles.title}`}><h1>Login</h1></div>
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
        </div>
      </div>

      <h1>oi</h1>
    </div>
  );
}

export default Login;
