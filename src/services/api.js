import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/",
});

export const createSession = async (email, password) => {
  return api.post("/auth/login", { email, password });
};

export const createUsuario = async (name, email, password, confirmpassword) => {
  return api.post("/auth/register", { name, email, password, confirmpassword });
};

export const createGroup = async (name, descricao) => {
  return api.post("/group", { name, descricao });
};

export const returnGroup = async () => {
  return api.get("/group");
};


export const createTask = async (name, descricao) => {
  return api.post("/task", { name, descricao });
};

export const returnTask = async () => {
  return api.get("/task");
};

export const deleteTask = async (id) => {
  return api.get("/task", id);
};
