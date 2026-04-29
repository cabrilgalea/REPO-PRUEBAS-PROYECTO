const CACHE_NAME = "undergrade-v5"; // Nueva versión para forzar limpieza

const urlsToCache = [
  "./", 
  "./pages/index.html",
  "./pages/bienvenidad.html",
  "./pages/cursos.html",
  "./pages/calificaciones.html",
  "./pages/qr.html",
  "./styles/estilos.css", 
  "./js/main.js",
  "./js/accesibilidad.js",
  "./img/LOGO.png",
  "./img/FONDOPRINCIPAL.jpeg"
];

// Instalación
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Intentando cachear archivos...");
        // Usamos map para intentar cachear uno por uno y que no muera si falta alguno
        return Promise.all(
          urlsToCache.map(url => {
            return cache.add(url).catch(err => console.error("Fallo al cachear:", url, err));
          })
        );
      })
      .then(() => self.skipWaiting()) // Fuerza a que se convierta en activo de inmediato
  );
});

// Activación: Limpia versiones viejas de la memoria
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log("Borrando caché antiguo:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim(); // Toma el control de las pestañas abiertas inmediatamente
});

// Fetch: Estrategia Cache First (Carga instantánea)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve el archivo de caché si existe, si no, lo busca en internet
        return response || fetch(event.request);
      })
  );
});
