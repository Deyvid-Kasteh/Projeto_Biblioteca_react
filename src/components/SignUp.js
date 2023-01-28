import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { api } from "../services/api";
import zxcvbn from "zxcvbn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Navbar";
import styles from "./SignUp.module.css";
import FooterBack from "./FooterBack";

// ICONS ----------------------------------------------------------------

import {
  FaEyeSlash,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
// ICONS ----------------------------------------------------------------

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputPasswordType, setInputPasswordType] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inputConfirmPasswordType, setInputConfirmPassword] = useState(true)
  const [change, setChange] = useState(false);

  const passwordStrengthScore = zxcvbn(password).score;

  const insuficiente = "😭";
  const fraco = "😕";
  const medio = "😐";
  const bom = "😄";
  const forte = "💪";
  const falha = <FaTimesCircle />;
  const trabalhando = "🤖";
  const correto = "👍";
  const teste = "⏳";
  const valido = <FaCheckCircle />;

  const regExpEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  const validName = useRef(false);
  const validEmail = useRef(false);
  const validPassword = useRef(false);
  const validConfirmPassword = useRef(false);

  const formFilled = useRef(false);


  const validNameFunction = (name) => {
    if (name.length >= 4) {
      validName.current = true;
      return <h2 className={styles.icons}>{valido}</h2>;
    } else {
      validName.current = false;
      return <h2 className={styles.icons_disabled}>{valido}</h2>;
    }
  };

  const validEmailFunction = (email) => {
    if (regExpEmail.test(email)) {
      validEmail.current = true;
      return <h2 className={styles.icons}>{valido}</h2>;
    } else {
      validEmail.current = false;
      return <h2 className={styles.icons_disabled}>{valido}</h2>;
    }
  };

  const validPasswordFunction = (password) => {
    if (password.length > 0) {
      validPassword.current = true;
      return passwordStrengthSwitch(passwordStrengthScore);
    } else {
      validPassword.current = false;
      return <h2 className={styles.falha}>{falha}</h2>;
    }
  };

  const validConfirmPasswordFunction = (confirmPassword, password) => {
    if (confirmPassword === password) {
      validConfirmPassword.current = true;
      return <h2 className={styles.icons}>{valido}</h2>;
    } else {
      validConfirmPassword.current = false;
      return <h2 className={styles.icons_disabled}>{valido}</h2>;
    }
  };

  const passwordStrengthSwitch = (passwordStrengthScore) => {
    switch (passwordStrengthScore) {
      case 0:
        validPassword.current = false;

        return <h2>{insuficiente}</h2>;
      case 1:
        validPassword.current = false;

        return <h2>{fraco}</h2>;
      case 2:
        validPassword.current = true;
        console.log(`${"TROCOU MEDIO"}`);
        console.log(`${"TROCOU MEDIO"}`);
        console.log(`${"TROCOU MEDIO"}`);
        console.log(`${"TROCOU MEDIO"}`);

        return <h2>{medio}</h2>;
      case 3:
        validPassword.current = true;
        console.log(`${"TROCOU BOM"}`);
        console.log(`${"TROCOU BOM"}`);
        console.log(`${"TROCOU BOM"}`);
        console.log(`${"TROCOU BOM"}`);
        console.log(`${"TROCOU BOM"}`);

        return <h2>{bom}</h2>;
      case 4:
        validPassword.current = true;
        console.log(`${"TROCOU FORTE"}`);
        console.log(`${"TROCOU FORTE"}`);
        console.log(validPassword.current);
        console.log(`${"TROCOU FORTE"}`);
        console.log(`${"TROCOU FORTE"}`);

        return <h2>{forte}</h2>;
    }
  };

  const formFilledFunction = () => {
    if (
      validName.current &&
      validEmail.current &&
      validPassword.current &&
      validConfirmPassword.current
    ) {
      formFilled.current = true;
      setChange((prev) => !prev);
      console.log(`${"formFilled SIM"}`);
    } else {
      formFilled.current = false;
      console.log(`${"formFilled NÃO"}`);
      setChange((prev) => !prev);

      console.log(`${validName.current} + validName`);
      console.log(`${validEmail.current} + validEmail`);
      console.log(`${validPassword.current} + validPassword`);
      console.log(`${validConfirmPassword.current} + validConfirmPassword`);
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      toast.warning("Por favor, preencha todos os campos");

      return;
    }

    if (!regExpEmail.test(email)) {
      console.log("passou aqui");
      toast.warning("Por favor, coloque um email válido");
      return;
    }

    if (password !== confirmPassword) {
      toast.warning("As senhas precisam ser iguais");

      return;
    }
    const data = {
      name,
      email,
      password,
    };
    const response = await api.post("/users", data);
    navigate(-1);
    // alert("Cadastro realizado com sucesso");
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
                onChange={(e) => {
                  setName(e.target.value);
                }}
                onKeyUp={() => {
                  formFilledFunction();
                }}
              />
              {name ? (
                <div className={`${styles.feedback}`}>
                  {validNameFunction(name)}
                </div>
              ) : (
                ""
              )}
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
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onKeyUp={() => {
                  formFilledFunction();
                }}
              />

              {email ? (
                <div className={`${styles.feedback}`}>
                  {validEmailFunction(email)}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className={styles.formGroup}>
              <input
                type={inputPasswordType ? "password" : "text"}
                name="password"
                id="password"
                className={styles.password}
                value={password}
                placeholder="Senha..."
                autoComplete="off"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onKeyUp={() => {
                  formFilledFunction();
                }}
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
                  <div className={`${styles.feedback}`}>
                    {validPasswordFunction(password)}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>

            <div className={styles.formGroup}>
              <input
                type={inputConfirmPasswordType ? "password" : "text"}
                name="confirmPassword"
                id="confirmPassword"
                className={styles.password}
                value={confirmPassword}
                placeholder="Confirme a senha..."
                autoComplete="off"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                onKeyUp={() => {
                  formFilledFunction();
                }}
              />
              {confirmPassword ? (
                <>
                  <div className={`${styles.password_see}`}>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setInputConfirmPassword(!inputConfirmPasswordType);
                      }}
                    >
                      <h2>
                        {inputConfirmPasswordType ? (
                          <RxEyeClosed />
                        ) : (
                          <RxEyeOpen />
                        )}
                      </h2>
                    </button>
                  </div>
                  <div className={`${styles.feedback}`}>
                    {validConfirmPasswordFunction(confirmPassword, password)}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>

            <div
              className={`${
                formFilled.current
                  ? styles.formGroup_btnFilled
                  : styles.formGroup_btn
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
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
      <FooterBack />
    </div>
  );
}

export default SignUp;
