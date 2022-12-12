import foguetim from "../assets/foguetim.svg";
import prancheta from "../assets/prancheta.svg";
import React, { useState, useEffect } from "react";
import ModalArquivos from "./modalarquivos";
import { returnTask, createTask } from "../services/api";
import { useRef } from "react";

const GrupoEstudo = ({ children }) => {
  const [isModalVisiblise, setisModalVisible] = useState(false);
  const [isModalMetasVisiblise, setisModalMetasVisible] = useState(false);

  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");

  const filesElement = useRef(null);

  const sendFile = async () => {
    const dataForm = new FormData();
    for (const file of filesElement.current.files) {
      dataForm.append("file", file);
    }
    const res = await fetch(`http://localhost:5000/upload`, {
      method: "POST",
      body: dataForm,
    });
    const data = await res.json();
    console.log(data);
  };

  const criarTask = async (name) => {
    const response = await createTask(name);
    console.log("Grupo", response.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("submit", { name });
    criarTask(name);
    onclose = setisModalVisible(false);
  };

  useEffect(() => {
    (async () => {
      const response = await returnTask();
      setTask(response.data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="dados-grupo">
      <div className="encontro-grupo">
        <div className="infos">{children}</div>
        <div className="encontros">
          <p>Dias de encontro:</p>
          <div className="dias-encontro">
            <div className="dia-custom">
              <input type="checkbox" name="Dom" id="Dom" />
              <label htmlFor="Dom"></label>
              <span>D</span>
            </div>
            <div className="dia-custom">
              <input type="checkbox" name="Seg" id="Seg" />
              <label htmlFor="Seg"></label>
              <span>S</span>
            </div>
            <div className="dia-custom">
              <input type="checkbox" name="Ter" id="Ter" />
              <label htmlFor="Ter"></label>
              <span>T</span>
            </div>
            <div className="dia-custom">
              <input type="checkbox" name="Qua" id="Qua" />
              <label htmlFor="Qua"></label>
              <span>Q</span>
            </div>
            <div className="dia-custom">
              <input type="checkbox" name="Qui" id="Qui" />
              <label htmlFor="Qui"></label>
              <span>Q</span>
            </div>
            <div className="dia-custom">
              <input type="checkbox" name="Sex" id="Sex" />
              <label htmlFor="Sex"></label>
              <span>S</span>
            </div>
            <div className="dia-custom">
              <input type="checkbox" name="Sab" id="Sab" />
              <label htmlFor="Sab"></label>
              <span>S</span>
            </div>
          </div>
        </div>
      </div>
      <div className="metas-materiais">
        <div className="metas card-m">
          <div className="titulo-img">
            <div className="circulo">
              <img src={foguetim} alt="foguete" />
            </div>
            <h2>Metas</h2>
          </div>
          <div className="local-lis metas" id="meta-valor">
            <div className="valor-adicionado arquivos" id="arquivos-valor">
              <ul>
                {task.map((g, i) => (
                  <li key={Math.random() * 20}>
                    <input type="checkbox" name="tarefa" id="meta1" />
                    <label className="nomeAtask" htmlFor="meta1">
                      {g.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button
            onClick={() => setisModalMetasVisible(true)}
            className="buttonAdd"
            type="button"
          >
            Adicionar metas
          </button>
          {isModalMetasVisiblise ? (
            <ModalArquivos onClose={() => setisModalMetasVisible(false)}>
              <h1>Criar Meta</h1>
              <form>
                <label htmlFor="nomeTask">Meta:</label>
                <input
                  type="text"
                  name="nome"
                  id="nomeTask"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button onClick={handleSubmit} type="submit">
                  Criar meta
                </button>
              </form>
            </ModalArquivos>
          ) : null}
        </div>
        <div className="materias card-m">
          <div className="titulo-img">
            <div className="circulo">
              <img src={prancheta} alt="arquivos" />
            </div>
            <h2>Materiais</h2>
          </div>
          <div className="local-list arquivos">
            <div className="valor-adicionado arquivos" id="arquivos-valor">
              <p>nome_do_arquivo.pdf</p>
            </div>
          </div>
          <button
            onClick={() => setisModalVisible(true)}
            className="buttonAdd"
            type="button"
          >
            Adicionar arquivos
          </button>
          {isModalVisiblise ? (
            <ModalArquivos onClose={() => setisModalVisible(false)}>
              <h1>Adicionar materiais de estudo</h1>
              <input
                type="file"
                id="bntArquivos"
                name="file"
                multiple
                ref={filesElement}
              />
              <button onClick={sendFile} type="submit">
                Salvar Arquivos
              </button>
            </ModalArquivos>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default GrupoEstudo;
