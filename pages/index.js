import React from "react";
import Navbar from "./components/Navbar/navbar";
import styles from "./index.module.css";

function Home() {
  return (
    <>
      <Navbar></Navbar>
      <div className={styles.carousel}>
        <svg
          className={`${styles.carousel_arrow} ${styles.prev}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 18"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="5 12 12 5 19 12" />
        </svg>
        <svg
          className={`${styles.carousel_arrow} ${styles.next}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 18"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="5 12 12 5 19 12" />
        </svg>
      </div>
    </>
  );
}

export default Home;
