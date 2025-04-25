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

  if (!res.ok) {
    // Tenta extrair a mensagem do erro da resposta (se existir)
    let message = "Erro na requisição";
    try {
      const data = await res.json();
      if (data.message) message = data.message;
    } catch (e) {
      // ignora se não conseguir fazer parsing
    }

    console.error(`[API] ${method} ${endpoint} =>`, message);
    throw new Error(message);
  }

  return await res.json();
}
