import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";
import Title from "../components/Title";
import { apiRequest } from "../services/api";

function TaskPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchTask = async () => {
      try {
        const data = await apiRequest(`/tasks/${id}`);
        setTask(data);
      } catch (err) {
        console.error("Erro ao carregar tarefa:", err.message);
        alert(err.message); // mostra o erro mais claro
        navigate("/");
      }
    };

    fetchTask();
  }, [id, navigate]);

  if (!task) {
    return (
      <div className="text-white text-center mt-20">Carregando tarefa...</div>
    );
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <div className="flex justify-center relative mb-6">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-0 bottom-0 text-slate-100"
          >
            <ChevronLeftIcon />
          </button>
          <Title>Detalhes da Tarefa</Title>
        </div>
        <div className="bg-slate-200 p-4 rounded-md shadow">
          <h2 className="text-xl text-slate-600 font-bold">{task.title}</h2>
          <p className="text-slate-600">{task.description}</p>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
