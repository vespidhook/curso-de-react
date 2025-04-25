import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Title from "./components/Title";
import LogoutButton from "./components/LogoutButton";
import { apiRequest } from "./services/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function normalizeTask(task) {
    return {
      ...task,
      isCompleted: !!task.is_completed,
    };
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await apiRequest("/tasks");
      setTasks(data.map(normalizeTask));
    } catch (err) {
      console.error("Erro ao carregar tarefas", err.message);
      alert(err.message);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  async function onTaskClick(taskId) {
    setLoading(true);
    try {
      const task = tasks.find((t) => t.id === taskId);
      const updated = await apiRequest(`/tasks/${taskId}`, "PATCH", {
        is_completed: !task.isCompleted,
      });
      const normalized = normalizeTask(updated);
      setTasks((prev) => prev.map((t) => (t.id === taskId ? normalized : t)));
    } catch (err) {
      console.error("Erro ao atualizar tarefa", err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function onDeleteTaskClick(taskId) {
    setLoading(true);
    try {
      await apiRequest(`/tasks/${taskId}`, "DELETE");
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error("Erro ao deletar tarefa", err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function onAddTaskSubmit(title, description) {
    setLoading(true);
    try {
      const newTask = await apiRequest("/tasks", "POST", {
        title,
        description,
      });
      const normalized = normalizeTask(newTask);
      setTasks((prev) => [...prev, normalized]);
    } catch (err) {
      console.error("Erro ao adicionar tarefa", err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>
        <div className="flex justify-end">
          <LogoutButton />
        </div>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />

        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : tasks.length > 0 ? (
          <Tasks
            tasks={tasks}
            onTaskClick={onTaskClick}
            onDeleteTaskClick={onDeleteTaskClick}
          />
        ) : (
          <p className="text-center text-white">Não há tarefas disponíveis</p>
        )}
      </div>
    </div>
  );
}

export default App;
