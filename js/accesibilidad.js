// === ACCESIBILIDAD (ZOOM GENERAL DE LA PÁGINA) ===
const btn = document.getElementById("accessibility-btn");
const menu = document.getElementById("accessibility-menu");

btn.addEventListener("click", () => {
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
});

let zoomLevel = 1; // Zoom inicial

document.getElementById("zoom-in").addEventListener("click", () => {
  zoomLevel += 0.1;
  if (zoomLevel > 2.0) zoomLevel = 2.0; // 👈 Límite máximo (puedes cambiar 1.8 por 2, por ejemplo)
  document.body.style.transform = `scale(${zoomLevel})`;
  document.body.style.transformOrigin = "0 0";
});

document.getElementById("zoom-out").addEventListener("click", () => {
  zoomLevel -= 0.1;
  if (zoomLevel < 0.7) zoomLevel = 0.7; // 👈 Límite mínimo
  document.body.style.transform = `scale(${zoomLevel})`;
  document.body.style.transformOrigin = "0 0";
});

document.getElementById("toggle-contrast").addEventListener("click", () => {
  document.body.classList.toggle("high-contrast");
});

document.getElementById("reset").addEventListener("click", () => {
  zoomLevel = 1;
  document.body.style.transform = "scale(1)";
  document.body.classList.remove("high-contrast");
});
