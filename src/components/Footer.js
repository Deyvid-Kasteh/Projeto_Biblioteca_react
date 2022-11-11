import styles from "./Footer.module.css";
import { VscGithubInverted} from "react-icons/vsc";

import { BsInstagram } from "react-icons/bs";
import { ImTwitter } from "react-icons/im";

function Footer() {
  return (
    <div className={`${styles.Footer_container}`}>
      <VscGithubInverted className={`${styles.VscGithubInverted}`}
      />
      <BsInstagram className={`${styles.BsInstagram}`} />
      <ImTwitter className={`${styles.ImTwitter}`} />
    </div>
  );
}

export default Footer;
