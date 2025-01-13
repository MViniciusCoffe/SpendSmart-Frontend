import withAuth from "./components/utils/withAuth";
import Navbar from "./components/Navbar/navbarApp";

// aqui vou poder cadastrar tanto os gastos como as suas respectivas categorias, mesma coisa com orçamentoPage
function rendaPage() {
  return (
    <>
      <Navbar />
    </>
  );
}

export default withAuth(rendaPage);
