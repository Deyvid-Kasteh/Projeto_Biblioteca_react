import styles from "./Footer.module.css";
import { VscGithub, VscGithubInverted, VscGithubAlt } from "react-icons/vsc";
import { DiGithubFull } from "react-icons/di";
import { FiGithub } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { ImTwitter } from "react-icons/im";

function Footer() {
  return (
    <div className={`${styles.Footer_container}`}>
      <h1>
        <VscGithubInverted cursor="pointer" /> - <BsInstagram cursor="pointer"/> - <ImTwitter cursor="pointer"/>
      </h1>
    </div>
  );
}

export default Footer;
