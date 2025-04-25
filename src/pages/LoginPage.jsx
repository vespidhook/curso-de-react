import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Title from "../components/Title";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://apigerenciadordetarefas.brunoalves.dev.br/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Erro ao fazer login");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      console.error("Erro na requisição:", err);
      alert("Erro ao fazer login");
    }
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Login</Title>

        <form
          onSubmit={handleLogin}
          className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col"
        >
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
            Entrar
          </button>
        </form>

        <p
          onClick={() => navigate("/register")}
          className="text-center text-white text-sm underline cursor-pointer"
        >
          Ainda não tem conta? Cadastre-se
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
