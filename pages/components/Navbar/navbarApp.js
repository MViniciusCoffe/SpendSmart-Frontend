import Link from "next/link";
import styles from "./navbarApp.module.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

function navbarApp() {
  const router = useRouter();

  // Função de fazer logout
  const handleLogout = async (e) => {
    e.preventDefault();

    Cookies.remove("authToken");
    Cookies.remove("userEmail");
    router.push("/login");
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/images/logo.svg" alt="Logo do Spend Smart"></img>
      </div>
      <div className={styles.navigation}>
        <ul className={styles.links}>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/rent">Cadastrar Renda</Link>
          </li>
          <li>
            <Link href="/spent">Cadastrar Gastos</Link>
          </li>
          <li>
            <Link href="/accountConfig">Configurações da conta</Link>
          </li>
          <li>
            <button
              className={styles.exit_button}
              onClick={(e) => handleLogout(e)}
            >
              Sair
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default navbarApp;
