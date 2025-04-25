import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";
import Title from "../components/Title";
import { apiRequest } from "../services/api";

function TaskPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchTask = async () => {
      try {
        setLoading(true);
        const data = await apiRequest(`/tasks/${id}`);
        setTask(data);
      } catch (err) {
        console.error("Erro ao carregar tarefa", err);
        setError("Tarefa não encontrada ou acesso não autorizado.");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center items-center p-6">
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

        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center text-white bg-red-500 p-4 rounded-md shadow">
            {error}
          </div>
        ) : (
          <div className="bg-slate-200 p-4 rounded-md shadow">
            <h2 className="text-xl text-slate-600 font-bold">{task.title}</h2>
            <p className="text-slate-600">{task.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskPage;
