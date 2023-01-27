import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../services/api";
import zxcvbn from "zxcvbn";



import Navbar from "./Navbar";
import styles from "./SignUp.module.css";
import FooterBack from "./FooterBack";

// ICONS ----------------------------------------------------------------

import { BsFillCheckCircleFill, BsCheckCircle } from "react-icons/bs";

import { FaCheck, FaCheckCircle } from "react-icons/fa";

// ICONS ----------------------------------------------------------------

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordStrengthScore = zxcvbn(password).score;

  const insuficiente = "😭";
  const fraco = "😕";
  const medio = "😐";
  const bom = "😄";
  const forte = "💪";
  const falha = "❌";
  const trabalhando = "🤖";
  const correto = "👍";
  const teste = "⏳";
  const valido = <FaCheckCircle />;

  const regExpEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  let formFilled = false;

  if (
    name.length > 0 &&
    email.length > 0 &&
    password.length > 0 &&
    confirmPassword > 0
  ) {
    formFilled = true;
  } else {
    formFilled = false;
  }

  // console.log(regExpEmail.test(email));
  console.log(formFilled)

  const passwordStrengthSwitch = (passwordStrengthScore) => {
    switch (passwordStrengthScore) {
      case 0:
        return <h2>{insuficiente}</h2>;
      case 1:
        return <h2>{fraco}</h2>;
      case 2:
        return <h2>{medio}</h2>;
      case 3:
        return <h2>{bom}</h2>;
      case 4:
        return <h2>{forte}</h2>;
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Por favor, coloque seu email e senha");
      return;
    }
    // console.log("Login");
    // console.log("nome:", name);
    // console.log("email:", email);
    // console.log("senha:", password);
    // console.log("confirmação de senha:", confirmPassword);
    if (password !== confirmPassword) {
      alert("As senhas precisam ser iguais");
      return;
    }
    const data = {
      name,
      email,
      password,
    };
    const response = await api.post("/users", data);
    // console.log(response.data);
    navigate(-1);
    alert("Cadastro realizado com sucesso");
    // console.log("passou pelo navigate");
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
                value={name}
                placeholder="Apelido..."
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
              />
              <div className={`${styles.feedback}`}>
                {name.length >= 3 ? (
                  <h2 className={styles.icons}>{valido}</h2>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className={styles.formGroup}>
              <input
                type="email"
                name="email"
                id="email"
                className={styles.email}
                value={email}
                placeholder="Email..."
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
              />

              {email ? (
                <div className={`${styles.feedback}`}>
                  {regExpEmail.test(email) ? (
                    <h2 className={styles.icons}>{valido}</h2>
                  ) : (
                    <h2>{teste}</h2>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className={styles.formGroup}>
              <input
                type="password"
                name="password"
                id="password"
                className={styles.password}
                value={password}
                placeholder="Senha..."
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
              />
              {password ? (
                <div className={`${styles.feedback}`}>
                  {password.length === 0 ? (
                    <h2>{falha}</h2>
                  ) : (
                    passwordStrengthSwitch(passwordStrengthScore)
                  )}
                </div>
              ) : (
                ""
              )}
            </div>

            <div className={styles.formGroup}>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className={styles.password}
                value={confirmPassword}
                placeholder="Confirme a senha..."
                autoComplete="off"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {confirmPassword ? (
                <div className={`${styles.feedback}`}>
                  {confirmPassword === password ? (
                    <h2 className={styles.icons}>{valido}</h2>
                  ) : (
                    <h2>{falha}</h2>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>

            <div
              // className={styles.formGroup_btn}
              className={`${
                formFilled ? styles.formGroup_btnFilled : styles.formGroup_btn
              }`}
            >
              <button
                type="submit"
                className={styles.login_btn}
                onClick={handleSignUp}
              >
                Inscrever
              </button>
            </div>
            <div className={styles.formGroup_Login}>
              <p>Já tem conta?</p>
              <Link to="/loginPage">
                <p>Login</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <FooterBack />
    </div>
  );
}

export default SignUp;
