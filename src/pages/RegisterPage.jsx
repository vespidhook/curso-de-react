import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Title from "../components/Title";
import { apiRequest } from "../services/api";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      await apiRequest("/register", "POST", { name, email, password });
      alert("Usuário registrado com sucesso! Faça login.");
      navigate("/login");
    } catch (error) {
      console.error("Erro na requisição:", error.message);
      alert(error.message);
    }
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Cadastro</Title>
        <form
          onSubmit={handleRegister}
          className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col"
        >
          <Input
            type="text"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium"
          >
            Registrar
          </button>
        </form>
        <p
          className="text-center text-white text-sm underline cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Já tem conta? Faça login
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
