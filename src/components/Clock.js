import styles from "./Clock.module.css";

import { useEffect, useState } from "react";

function Clock() {
  const [clock, setClock] = useState(null);

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      const timeNow = `${date.toLocaleTimeString()}`;
      const timeDay = "06:00:00";
      const timeNight = "18:00:00";
      const day = "🌞";
      const night = "🌛";
      if (timeNow >= timeDay) {
        setClock(`${timeNow} ${day}`);
      } else if (timeNow >= timeNight) {
        setClock(`${timeNow} ${night}`);
      } else if (timeNow < timeDay) {
        setClock(`${timeNow} ${night}`);
      } else {
        setClock(timeNow);
      }
    }, 1000);
  }, []);

  return (
    <div className={`${styles.clock}`}>
      {clock}
    </div>
  );
}

export default Clock;
