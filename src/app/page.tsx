'use client';

import { useSongs } from "@/context/MediaContext";
import Navbar from "./components/navbar/Navbar";
import Player from "./components/player/Player";
import styles from "./page.module.scss";

export default function Home() {

  const { songs } = useSongs()


  console.log("All songs:", songs)

  return (
    <div className={styles.page}>
      <Navbar />
      <Player />
    </div>
  );
}