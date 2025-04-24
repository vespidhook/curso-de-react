import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Title from "./components/Title";

const API_URL = "https://apigerenciadordetarefas.brunoalves.dev.br/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  function normalizeTask(task) {
    return {
      ...task,
      isCompleted: !!task.is_completed,
    };
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data.map(normalizeTask));
    } catch (err) {
      console.error("Erro ao carregar tarefas", err);
    } finally {
      setLoading(false);
    }
  };

  async function onTaskClick(taskId) {
    setLoading(true);
    try {
      const task = tasks.find((t) => t.id === taskId);
      const response = await fetch(`${API_URL}/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          is_completed: !task.isCompleted,
        }),
      });

      const updated = await response.json();
      const normalized = normalizeTask(updated);

      setTasks((prev) => prev.map((t) => (t.id === taskId ? normalized : t)));
    } catch (err) {
      console.error("Erro ao atualizar tarefa", err);
    } finally {
      setLoading(false);
    }
  }

  async function onDeleteTaskClick(taskId) {
    setLoading(true);
    try {
      await fetch(`${API_URL}/${taskId}`, {
        method: "DELETE",
      });

      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error("Erro ao deletar tarefa", err);
    } finally {
      setLoading(false);
    }
  }

  async function onAddTaskSubmit(title, description) {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      const newTask = await response.json();
      const normalized = normalizeTask(newTask);
      setTasks((prev) => [...prev, normalized]);
    } catch (err) {
      console.error("Erro ao adicionar tarefa", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>
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
