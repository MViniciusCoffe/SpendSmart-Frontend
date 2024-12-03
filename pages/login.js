import Link from "next/link";
import styles from "./login.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

function login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Impede o reload da página

    // Simula a lógica de autenticação
    if (email === "admin@example.com" && password === "123456") {
      // Redireciona para a página desejada após o login
      router.push("/dashboard"); // Substitua por sua página de destino
    } else {
      alert("Credenciais inválidas!"); // Exibe uma mensagem de erro
    }
  };

  return (
    <>
      <div className={styles.login_content}>
        <div className={styles.login}>
          <Link href="/" className={styles.back_button}>
            Voltar
          </Link>
          <h2>Fazer Login</h2>
          <form>
            <div className={styles.input_group}>
              <label htmlFor="email">E-mail:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.input_group}>
              <label htmlFor="password">Senha:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className={styles.button_group}>
              <button type="submit" className={styles.login_button}>
                Entrar
              </button>
              <Link href="app.js" className={styles.create_button}>
                Criar conta
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default login;
