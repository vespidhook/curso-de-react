const API_BASE = "https://apigerenciadordetarefas.brunoalves.dev.br/api";

export async function apiRequest(endpoint, method = "GET", body = null) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (!res.ok) {
    let message = "Erro na requisição";

    try {
      const errorData = await res.json();
      if (res.status === 401) {
        message = "Não autenticado. Faça login novamente.";
      } else if (res.status === 403) {
        message = "Acesso não autorizado.";
      } else if (errorData?.message) {
        message = errorData.message;
      }
    } catch (e) {
      if (res.status === 403) message = "Acesso negado.";
      else if (res.status === 401) message = "Token inválido ou expirado.";
    }

    throw new Error(message);
  }

  return await res.json();
}
