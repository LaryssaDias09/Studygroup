import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { useNavigate } from "react-router-dom";

import astronauta from "../../assets/astronauta.png";

const LoginPage = () => {
  const navigate = useNavigate();

  const goCadastro = () => {
    navigate("/cadastro");
  };

  const { authenticated, login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("submit", { email, password });
    login(email, password);
  };

  return (
    <div className="grid-form" id="login">
      <div className="azul-img">
        <img className="logo" src="/logoName.png" alt="" />
        <img className="astronauta" src={astronauta} alt="" />
      </div>
      <div className="login conteiner-form">
        <h1>Entre na sua conta</h1>
        <form className="form" onSubmit={handleSubmit}>
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
          <div className="span-2">
            <label htmlFor="password">Senha</label>
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
          <button type="submit">Entrar</button>
        </form>

        <p className="sing">
          Ainda não possui uma conta?
          <span onClick={goCadastro}> Crie agora</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
