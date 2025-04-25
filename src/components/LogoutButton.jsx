import { useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";

function LogoutButton() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await apiRequest("/logout", "POST");
    } catch (err) {
      console.error("Erro ao fazer logout:", err.message);
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
