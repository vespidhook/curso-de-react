import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Title from "./components/Title";

const API_URL = "https://apigerenciadordetarefas.brunoalves.dev.br/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);

  function normalizeTask(task) {
    return {
      ...task,
      isCompleted: !!task.is_completed,
    };
  }

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();
      const formatted = data.map(normalizeTask);
      setTasks(formatted);
    };

    fetchTasks();
  }, []);

  async function onTaskClick(taskId) {
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
  }

  async function onDeleteTaskClick(taskId) {
    await fetch(`${API_URL}/${taskId}`, {
      method: "DELETE",
    });

    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }

  async function onAddTaskSubmit(title, description) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    const newTask = await response.json();
    const normalized = normalizeTask(newTask);
    setTasks((prev) => [...prev, normalized]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        {tasks.length > 0 ? (
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
