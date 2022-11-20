import { Link } from "react-router-dom";

import styles from "./Footer.module.css";

import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { yellow } from "@mui/material/colors";

import { VscGithubInverted } from "react-icons/vsc";
import { BsInstagram } from "react-icons/bs";
import { ImTwitter } from "react-icons/im";
import { TfiLinkedin } from "react-icons/tfi";

function Footer() {
  const colorYellow = yellow[500];
  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: colorYellow,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: colorYellow,
      color: "black",
    },
  }));

  return (
    <div className={`${styles.Footer_container}`}>
      <BootstrapTooltip
        title="GitHub"
        arrow
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 1000 }}
      >
        <Link to={"/"}>
          {" "}
          <VscGithubInverted className={`${styles.icons}`} />
        </Link>
      </BootstrapTooltip>

      <BootstrapTooltip
        title="Instagram"
        arrow
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 1000 }}
      >
        <Link to={"/"}>
          {" "}
          <BsInstagram className={`${styles.icons}`} />
        </Link>
      </BootstrapTooltip>

      <BootstrapTooltip
        title="Twitter"
        arrow
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 1000 }}
      >
        <Link to={"/"}>
          {" "}
          <ImTwitter className={`${styles.icons}`} />
        </Link>
      </BootstrapTooltip>

      <BootstrapTooltip
        title="LinkedIn"
        arrow
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 1000 }}
      >
        <Link to={"/"}>
          {" "}
          <TfiLinkedin className={`${styles.icons}`} />
        </Link>
      </BootstrapTooltip>
    </div>
  );
}

export default Footer;
