import styles from "./Loading.module.css";
import loading from "../components/img/loading/hourglass.png"

function Loading() {


    return (
      <div className={`${styles.loader_container}`}>
        <img src={loading} alt="Loading" className={`${styles.loader}`} />
      </div>
    );
}

export default Loading;
