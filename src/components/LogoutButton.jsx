import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  async function handleLogout() {
    const token = localStorage.getItem("token");

    try {
      await fetch(
        "https://apigerenciadordetarefas.brunoalves.dev.br/api/logout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    }

    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium"
    >
      Sair
    </button>
  );
}

export default LogoutButton;
