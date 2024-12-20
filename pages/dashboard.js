import { useState, useEffect } from "react";
import withAuth from "./components/utils/withAuth";
import styles from "./dashboard.module.css";
import Navbar from "./components/Navbar/navbarApp.js";
import axios from "axios";

function dashboard() {
  const [dados, setDados] = useState({
    saldo: null,
    totalReceitas: null,
    totalGastos: null,
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/dashboard");
        setDados({
          saldo: response.data.saldo || null,
          totalReceitas: response.data.totalReceitas || null,
          totalGastos: response.data.totalGastos || null,
        });
        setError(false);
      } catch (error) {
        setError(true); // Indica que ocorreu um erro na requisição
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.app_content}>
        <h1>Dashboard</h1>
        <div className={styles.status_content}>
          <div className={styles.metric}>
            <div className={styles.metric_img}>
              <img src="/images/saldo-img.png" alt="Imagem saldo atual" />
            </div>
            <div>
              <h3>Saldo atual</h3>
              {/* Renderiza "Sem dados disponíveis" caso não tenha saldo */}
              <p>{error || dados.saldo === null ? "Sem dados disponíveis" : `R$ ${dados.saldo}`}</p>
            </div>
          </div>
          <div className={styles.metric}>
            <div className={styles.metric_img}>
              <img src="/images/recipe-img.png" alt="Imagem saldo atual" />
            </div>
            <div>
              <h3>Total em Receitas</h3>
              {/* Renderiza "Sem dados disponíveis" caso não tenha receitas */}
              <p>{error || dados.totalReceitas === null ? "Sem dados disponíveis" : `R$ ${dados.totalReceitas}`}</p>
            </div>
          </div>
          <div className={styles.metric}>
            <div className={styles.metric_img}>
              <img src="/images/drop-money.png" alt="Imagem saldo atual" />
            </div>
            <div>
              <h3>Total em Gastos</h3>
              {/* Renderiza "Sem dados disponíveis" caso não tenha gastos */}
              <p>{error || dados.totalGastos === null ? "Sem dados disponíveis" : `R$ ${dados.totalGastos}`}</p>
            </div>
          </div>
        </div>

        <div className={styles.dashboards_content}>
          <div className={styles.dashboard_donut}>
            <h3>Despesas do Mês (Mês Atual)</h3>
            {/* Renderiza "Sem dados disponíveis" caso o gráfico não possa ser gerado */}
            <div>{error ? "Sem dados disponíveis" : "O gráfico"}</div>
          </div>

          <div className={styles.dashboard_lines}>
            <h3>Gráfico de Linhas (Mês Atual)</h3>
            {/* Renderiza "Sem dados disponíveis" caso o gráfico não possa ser gerado */}
            <div>{error ? "Sem dados disponíveis" : "O gráfico"}</div>
          </div>
        </div>
      </div>
    </>
  );
}

// Redireciona o usuário para "login" caso ele não esteja logado
export default withAuth(dashboard);
