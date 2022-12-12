import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import React, { useState, useEffect } from "react";
import { returnGroup, createGroup } from "../../services/api";

import search from "../../assets/search.svg";
import GrupoEstudo from "../../components/grupo";
import setaLogout from "../../assets/Path.svg";
import ModalArquivos from "../../components/modalarquivos";

const HomePage = () => {
  const [isModalGroupVisiblise, setisModalGroupVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [grupo, setGrupo] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [descricao, setDescricao] = useState("");

  const criarGrupo = async (name, descricao) => {
    const response = await createGroup(name, descricao);
    console.log("Grupo", response.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("submit", { name, descricao });
    criarGrupo(name, descricao);
    setisModalGroupVisible(false);
  };

  const handleaAtiveClass = () => {
    setIsActive((current) => !current);
  };

  const { logout } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const response = await returnGroup();
      setGrupo(response.data);
      setLoading(false);
    })();
  }, []);

  const nomePerfil = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div id="home" className="conteiner home">
      <nav className=" menu">
        <div className="conteinerMenu">
          <img src="/logoNameblue.svg" alt="" />
          <div>
            <h2>Seus grupos</h2>
            <ul className="list-grupos">
              {" "}
              {grupo.map((g) => (
                <li onClick={handleaAtiveClass} key={Math.random() * 10}>
                  {g.name}
                </li>
              ))}{" "}
            </ul>

            <button
              onClick={() => setisModalGroupVisible(true)}
              className="buttonAdd"
              type="button"
            >
              Criar Grupos
            </button>
            {isModalGroupVisiblise ? (
              <ModalArquivos onClose={() => setisModalGroupVisible(false)}>
                <h1>Criar Grupo</h1>
                <form action="">
                  <div>
                    <label htmlFor="nomeGrupo">Nome do grupo</label>
                    <input
                      type="text"
                      id="nomeGrupo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label for="areaDescricao">Descrição</label>
                    <textarea
                      id="areaDescricao"
                      name="areaDescricao"
                      rows="4"
                      cols="50"
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                    >
                      Descricao do grupo...
                    </textarea>
                  </div>
                  <button onClick={handleSubmit} type="submit">
                    Criar Grupo
                  </button>
                </form>
              </ModalArquivos>
            ) : null}
          </div>
        </div>
      </nav>
      <div className="body-home">
        <div className="header-home">
          <div className="busca">
            <img src={search} id="btnBusca" alt="Buscar" />
            <input type="text" id="busca" placeholder="Search" />
          </div>
          <div className="info-user">
            <img src="/per.png" className="foto-user" alt="foto do usuario" />
            <p className="nome-Usuario">{nomePerfil.name}</p>
            <button onClick={handleLogout}>
              <img src={setaLogout} alt="" />
            </button>
          </div>
        </div>
        <div className="main-home">
          <ul>
            {grupo.map((g) => (
              <li className={isActive ? "ativo" : null}>
                <GrupoEstudo>
                  <h1>{g.name}</h1>
                  <p>{g.descricao}</p>
                </GrupoEstudo>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
