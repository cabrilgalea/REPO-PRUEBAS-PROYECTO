const API_KEY = "TU_API_KEY_AQUI"; // ← reemplaza con tu clave real de OpenAI

async function consultarOpenAI(mensaje) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini", // puedes usar "gpt-4o" si tienes acceso
      messages: [{ role: "user", content: mensaje }],
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

// evento del botón
document.getElementById("enviar").addEventListener("click", async () => {
  const input = document.getElementById("mensaje");
  const chat = document.getElementById("chat");

  const mensajeUsuario = input.value.trim();
  if (!mensajeUsuario) return;

  chat.innerHTML += `<div class="user"><b>Tú:</b> ${mensajeUsuario}</div>`;
  input.value = "";

  const respuesta = await consultarOpenAI(mensajeUsuario);
  chat.innerHTML += `<div class="bot"><b>IA:</b> ${respuesta}</div>`;
});
