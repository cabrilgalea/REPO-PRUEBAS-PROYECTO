const CACHE_NAME = "undergrade-v6"; // Subimos a v6 para limpiar el error anterior

const urlsToCache = [
  "./", 
  "./index.html",            // CORREGIDO: Ahora está en la raíz
  "./pages/bienvenidad.html",
  "./pages/cursos.html",
  "./pages/calificaciones.html",
  "./pages/qr.html",
  "./styles/estilos.css", 
  "./js/script.js",          // CORREGIDO: Según tu captura es script.js, no main.js
  "./js/accesibilidad.js",
  "./img/LOGO.png",
  "./img/FONDOPRINCIPAL.jpeg"
];

// Instalación
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Cacheando rutas actualizadas...");
        return Promise.all(
          urlsToCache.map(url => {
            return cache.add(url).catch(err => console.error("No se encontró:", url));
          })
        );
      })
      .then(() => self.skipWaiting())
  );
});

// Activación: Limpia la "basura" de las versiones que fallaron (v5, v4...)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log("Borrando rastro de versión rota:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch: Estrategia de red con caída a caché
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});