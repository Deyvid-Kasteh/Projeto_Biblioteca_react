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

  console.log(authenticated);
  console.log(user?.id);

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
          <Link
            to="/loginPage"
            className={`${styles.loginNav_item}`}
            onClick={sair}
          >
            <BsPersonCircle /> Login
          </Link>
        ) : (
          <>
            <div>
              <div onClick={displayMenu}>
                <AvatarLogo />
              </div>

              <Menu id={MENU_ID} theme="light">
                <Item>
                  <Item onClick={() => navigate(`/Perfil/${idPerfil}`)}>
                    👤 {loginName.current}
                  </Item>
                </Item>
                <Separator />
                <Item disabled>🛒 Carrinho</Item>
                <Separator />
                <Submenu label="⏬ Mais opções">
                  <Item onClick={() => navigate(`/Perfil/${idPerfil}`)}>
                    👤 {loginName.current}
                  </Item>
                  <Item onClick={""}>Sub Item 2</Item>
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
