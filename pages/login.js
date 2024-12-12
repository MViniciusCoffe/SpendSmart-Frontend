import Link from "next/link";
import styles from "./login.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";

function login() {
  const router = useRouter();

  // Estado para armazenar as credenciais
  const [email, setEmail] = useState("");
  const [senha, setPassword] = useState("");

  // Estado para armazenar mensagem de erro
  const [errorMessage, setErrorMessage] = useState("");

  // Função para fazer a requisição na rota auth
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      setErrorMessage("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/auth",
        JSON.stringify({ email, senha }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Salva o token do usuário
      const token = response.data.token;
      Cookies.get("authToken", token, { expires: 7 });

      // Redireciona o usuário para /dashboard
      setErrorMessage("");
      router.push("/dashboard");
    } catch (error) {
      if (!error?.response) {
        setErrorMessage("Erro ao acessar ao servidor");
      } else if (error.response.status == 401) {
        setErrorMessage(
          "Ocorreu um erro ao fazer login, verifique seu email/senha"
        );
      }
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
            <div>
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
                  value={senha}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {errorMessage && (
                <p className={styles.error_message}>{errorMessage}</p>
              )}
            </div>

            <div className={styles.button_group}>
              <button
                type="submit"
                className={styles.login_button}
                onClick={(e) => handleLogin(e)}
              >
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
