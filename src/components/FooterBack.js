import { Link, useNavigate } from "react-router-dom";

import styles from "./FooterBack.module.css";

import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { yellow } from "@mui/material/colors";


// import { IoArrowBackCircle } from "react-icons/io";
import { IoArrowBackCircle } from "react-icons/io5";
// IoArrowBackCircle;

function FooterBack() {
  const navigate = useNavigate();



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
        title="Voltar"
        arrow
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 1000 }}
      >
        <button className={styles.backbtn} onClick={() => navigate(-1)}><IoArrowBackCircle/></button>
      </BootstrapTooltip>
    </div>
  );
}

export default FooterBack;
