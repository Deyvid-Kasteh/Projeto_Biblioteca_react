import styles from "./Loading.module.css";
import loading from "../components/img/loading/hourglass.png"

function Loading() {


    return (
      <div className={`${styles.loader_container}`}>
        <img src={loading} alt="Loading" className={`${styles.loader}`} />
        {/*

        atribuição

        <a
          href="https://www.flaticon.com/free-icons/hourglass"
          title="hourglass icons"
        >
          Hourglass icons created by Freepik - Flaticon
        </a> */}
      </div>
    );
}

export default Loading;
