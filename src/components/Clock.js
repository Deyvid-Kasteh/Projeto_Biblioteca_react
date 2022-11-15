import styles from "./Clock.module.css";
import { TiWeatherSunny } from "react-icons/ti";

import { useEffect, useState } from "react";

function Clock() {
    const [clock, setClock] = useState();

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClock(date.toLocaleTimeString());
    }, 1000);
  }, []);

    return <div className={`${styles.clock}`}>
        {clock}
        <TiWeatherSunny className={`${styles.TiWeatherSunny}`} />
    </div>;
}

export default Clock;
