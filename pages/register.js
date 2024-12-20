import Link from "next/link";
import styles from "./register.module.css";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

function register() {
  const router = useRouter();

  // Estados para armazenar os dados dos usuários
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");

  // Estado para armazenar a mensagem de erro
  const [errorMessage, setErrorMessage] = useState("");

  // Função para criar usuário
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!nomeCompleto || !email || !senha || !dataNascimento) {
      setErrorMessage("Preencha todos os campos obrigatórios");
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/user",
        JSON.stringify({
          nomeCompleto,
          email,
          senha,
          dataNascimento,
          telefone,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert("Usuário criado com sucesso");
      // Depois de criado o usuário, ele autentica no sistema e salva os tokens
      if (response.status == 200) {
        try {
          const response = await axios.post(
            "http://localhost:5000/auth",
            JSON.stringify({ email, senha }),
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          const token = response.data.token;
          Cookies.set("userEmail", email, { expires: 7 });
          Cookies.set("authToken", token, { expires: 7 });
          setErrorMessage("");
          router.push("/dashboard");
        } catch (error) {
          console.log(error);
          alert("aqui");
          if (!error?.response) {
            setErrorMessage("Erro ao acessar o servidor");
          }
        }
      }
    } catch (error) {
      if (error.response.data.message === "Usuário já existe") {
        setErrorMessage("Usuário já cadastrado nesse email");
      }
      if (!error?.response) {
        setErrorMessage("Erro ao acessar ao servidor");
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
          <h2>Criar Usuário</h2>
          <form>
            <div>
              <div className={styles.input_group}>
                <label htmlFor="nomeCompleto">Nome Completo:</label>
                <input
                  type="text"
                  id="nomeCompleto"
                  name="nomeCompleto"
                  placeholder="Digite seu nome completo"
                  value={nomeCompleto}
                  onChange={(e) => setNomeCompleto(e.target.value)}
                  required
                />
              </div>

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
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>

              <div className={styles.input_group}>
                <label htmlFor="dataNascimento">Data de Nascimento:</label>
                <input
                  type="date"
                  id="dataNascimento"
                  name="dataNascimento"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                  required
                />
              </div>

              <div className={styles.input_group}>
                <label htmlFor="telefone">Telefone:</label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  placeholder="Digite seu telefone (opcional)"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </div>

              {errorMessage && (
                <p className={styles.error_message}>{errorMessage}</p>
              )}
            </div>

            <div className={styles.button_group}>
              <Link href="login" className={styles.login_button}>
                Entrar
              </Link>
              <button
                type="submit"
                className={styles.create_button}
                onClick={(e) => handleRegister(e)}
                disabled={!nomeCompleto || !email || !senha || !dataNascimento}
              >
                Criar conta
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default register;
