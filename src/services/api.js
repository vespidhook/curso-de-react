const API_BASE = "https://apigerenciadordetarefas.brunoalves.dev.br/api";

export async function apiRequest(endpoint, method = "GET", body = null) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (!res.ok) throw new Error("Erro na requisição");
  return await res.json();
}
