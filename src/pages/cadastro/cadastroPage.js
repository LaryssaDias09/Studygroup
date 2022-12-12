import astronauta from "../../assets/astronauta.png";
import userProfile from "../../assets/User.svg";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  createUsuario } from "../../services/api";

const CadastroPage = () => {
  const navigate = useNavigate();

  const goLogin = () => {
    navigate("/login");
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const cadastro = async (name, email, password, confirmpassword) => {
    const response = await createUsuario(
      name,
      email,
      password,
      confirmpassword
    );
    console.log("cadastro", response.data);
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("submit", { name, email, password, confirmPassword });
    cadastro(name, email, password, confirmPassword);
  };

  return (
    <div className="grid-form" id="cadastro">
      <div className="azul-img">
        <img className="logo" src="/logoName.png" alt="" />
        <img className="astronauta" src={astronauta} alt="" />
      </div>
      <div className="cadastro conteiner-form">
        <h1>Crie seu perfil</h1>
        <div className="circulo-user">
          <img src={userProfile} alt="" />
        </div>
        <form className="form">
          <div className="span-2">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nome"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="span-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="word">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirmpassword">Confirmar senha</label>
            <input
              type="password"
              id="confirmpassword"
              name="confirmarpassword"
              placeholder="Confirme a senha"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button onClick={handleSubmit} type="submit">
            Criar Conta
          </button>
        </form>
        <p className="sing">
          Já possui uma conta? <span onClick={goLogin}>Entre agora</span>
        </p>
      </div>
    </div>
  );
};

export default CadastroPage;
