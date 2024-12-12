import Link from "next/link";

function dashboard() {
  return (
    <>
      <h1>BEM VINDO AO SITE</h1>

      <Link href="/login">Voltar ao login</Link>
    </>
  );
}

export default dashboard;
