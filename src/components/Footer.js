import styles from "./Footer.module.css";
import { VscGithub, VscGithubInverted, VscGithubAlt } from "react-icons/vsc";

function Footer() {
  return (
    <div className={`${styles.Footer_container}`}>
      <h1>
        Biblioteca Footer <VscGithub /> <VscGithubInverted /> <VscGithubAlt />
      </h1>
    </div>
  );
}

export default Footer;
