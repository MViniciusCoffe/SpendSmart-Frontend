import styles from "./navbar.module.css";

function navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/images/logo.svg" alt="Logo do Spend Smart"></img>
      </div>
      <div className={styles.navigation}>
        <ul className={styles.links}>          
          <li>
            <a href="...">Home</a>
          </li>
          <li>
            <a href="...">Sobre</a>
          </li>
          <li>
            <a href="...">Contatos</a>
          </li>
          <li>
            <a href="...">Login</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default navbar;
