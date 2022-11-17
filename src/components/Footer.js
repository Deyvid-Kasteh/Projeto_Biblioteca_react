import styles from "./Footer.module.css";

import { VscGithubInverted } from "react-icons/vsc";
import { BsInstagram } from "react-icons/bs";
import { ImTwitter } from "react-icons/im";
import { TfiLinkedin } from "react-icons/tfi";









function Footer() {
  return (
    <div className={`${styles.Footer_container}`}>
      <VscGithubInverted className={`${styles.icons}`} />
      <BsInstagram className={`${styles.icons}`} />
      <ImTwitter className={`${styles.icons}`} />
      <TfiLinkedin className={`${styles.icons}`} />
    </div>
  );
}

export default Footer;
