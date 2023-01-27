import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";

import styles from "./LoginNav.module.css";
import { BsPersonCircle } from "react-icons/bs";
import { AuthContext } from "../contexts/auth";
import { AvatarLogo } from "./Avatar/Avatar";

// CRIAÇÃO DE CAIXA DE CONTEXTO
import {
  Menu,
  Item,
  Separator,
  Submenu,
  useContextMenu,
} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
// CRIAÇÃO DE CAIXA DE CONTEXTO

function LoginNav() {
  const loginName = useRef("Login");
  const { authenticated, user, logout } = useContext(AuthContext);
  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const idPerfil = user?.id;
  const navigate = useNavigate();
  if (user) {
    const nome = user?.name;
    const nomeCapitalized = capitalizeFirst(nome);

    loginName.current = nomeCapitalized;
  } else {
    loginName.current = "Login";
  }

  // console.log(authenticated);
  // console.log(user?.id);

  const sair = async () => {
    await logout();
    console.log("saiu");
    navigate("/loginPage");
  };

  // CAIXA DE CONTEXTO
  const MENU_ID = "menu-id";
  const { show } = useContextMenu({
    id: MENU_ID,
  });
  function displayMenu(e) {
    // put whatever custom logic you need
    // you can even decide to not display the Menu
    show({
      event: e,
    });
  }
  // CAIXA DE CONTEXTO

  return (
    <div className={`${styles.loginNav_container}`}>
      <>
        {!authenticated ? (
          <h1>
            <Link
              to="/loginPage"
              className={`${styles.loginNav_item}`}
              onClick={sair}
            >
              <BsPersonCircle /> Login
            </Link>
          </h1>
        ) : (
          <>
            <div>
              <div onClick={displayMenu}>
                <AvatarLogo />
              </div>

              <Menu id={MENU_ID} theme="light">
                <Item onClick={() => navigate(`/Perfil/${idPerfil}`)}>
                  👤 Perfil
                </Item>
                <Separator />
                <Item onClick={() => navigate(`/Perfil/${idPerfil}/favoritos`)}>
                  ❤️ Favoritos
                </Item>
                <Separator />
                <Item onClick={() => navigate(`/Perfil/${idPerfil}/verDepois`)}>
                  ⏰ Ver depois
                </Item>
                <Separator />

                <Item disabled>🛒 Carrinho</Item>
                <Separator />
                <Submenu label="⏬ Mais opções">
                  <Item>💰 Mandar um Pix 😜</Item>
                  <Separator />
                  <Item>🫖 Tomar um café ☕</Item>
                  <Separator />
                  <Item>🥠 Biscoito da Sorte 🍀</Item>
                  <Separator />
                  <Item>🖨️ Xerox: 0,25 📄</Item>
                  <Separator />
                  <Item>👨‍💻️ Crítica construtiva 🤬</Item>
                  <Separator />
                  <Item>🚽 Banheiro Não-binário</Item>
                </Submenu>
                <Separator />

                <Item onClick={sair}>❌ Sair</Item>
              </Menu>
            </div>
            {/* CAIXA DE CONTEXTO */}
          </>
        )}
      </>
    </div>
  );
}

export default LoginNav;
