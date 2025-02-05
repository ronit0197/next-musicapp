import Navbar from "./components/navbar/Navbar";
import Player from "./components/player/Player";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <Player />
    </div>
  );
}