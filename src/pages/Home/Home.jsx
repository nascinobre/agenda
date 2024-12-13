import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

function Home() {
  const [agendas, setAgendas] = useState([]);
  const { handleSubmit, register, reset } = useForm();

  async function loadData() {
    const resposta = await fetch("http://localhost:3000/agendas");
    const dados = await resposta.json();
    setAgendas(dados);
  }

  async function excluirAgenda(id) {
    await fetch(`http://localhost:3000/agenda/${id}`, {
      method: "DELETE",
    });
    loadData();
  }

  async function editarAgenda(id) {
    const nome = window.prompt("Digite um novo paciente:");
    await fetch(`http://localhost:3000/agenda/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome }),
    });
    loadData();
  }

  async function salvarAgenda(dados) {
    await fetch("http://localhost:3000/agenda", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });
    loadData();
    reset();
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Header />
      <main style={{ flexGrow: "1" }}>
        <div>
          <h1>Agenda</h1>
          <form onSubmit={handleSubmit(salvarAgenda)}>
            <div>
              <label htmlFor="nome">Nome</label> <br />
              <input type="text" id="nome" {...register("nome")} />
            </div>
            <div>
              <label htmlFor="data">Data</label> <br />
              <input type="text" id="data" {...register("data")} />
            </div>
            <div>
              <label htmlFor="hora">Hora</label> <br />
              <input type="text" id="hora" {...register("hora")} />
            </div>

            <button>Adicionar</button>
          </form>{" "}
          <br />
          <table>
            <tbody>
              {agendas.map((agenda) => (
                <tr key={agenda.id}>
                  <td>{agenda.nome}</td>
                  <td>{agenda.data}</td>
                  <td>{agenda.hora}</td>
                  <td>
                    <button onClick={() => excluirAgenda(agenda.id)}>
                      Excluir
                    </button>
                  </td>
                  <td>
                    <button onClick={() => editarAgenda(agenda.id)}>
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Home;
