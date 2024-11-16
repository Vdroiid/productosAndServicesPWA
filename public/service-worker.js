const CACHE_NAME = 'bytebazaar-cache-v1';
const urlsToCache = [
    
    // Stylos y html de public
    '/public/',
    './app.js',
    './scripts/app.js',

    '/public/styles/style-general.css',
    '/public/styles/style-index.css',
    '../src/assets/css/carrito_flotante.css',
    '/public/index.html',
    '/public/acerca.html',
    '/public/contacto.html',
    'error_404.html',

    //funciones
    '../src/assets/js/fun_carrito.js',
    '../src/assets/js/ventanas-flotantes.js',
    //Pages
    '../src/pages/celulares.html',
    '../src/pages/compus.html',
    '../src/pages/licencias.html',
    //Estilos de esas páginas
    '../src/assets/css/div_productos_servicio.css',

    //iconos
    '/public/icons/carrito.svg',
    // imágenes
    '/public/media/images/celulares/CUBOT.jpg',
    '/public/media/images/celulares/motorola.jpg',
    '/public/media/images/celulares/nubia.jpg',
    '/public/media/images/celulares/oppo.jpg',
    '/public/media/images/celulares/philips.jpg',
    '/public/media/images/celulares/samsung.jpg',
    '/public/media/images/celulares/xioami.jpg',
    '/public/media/images/celulares/ZTE.jpg',

    '/public/media/images/compus/HP Laptop 14.jpg',
    '/public/media/images/compus/Hyundai.jpg',
    '/public/media/images/compus/Laptop Asus.jpg',
    '/public/media/images/compus/Laptop Evolve.jpg',
    '/public/media/images/compus/Lenovo ThinkPad.jpg',
    '/public/media/images/compus/LG gram.jpg',

    '/public/media/images/licencias/Antivirus Kxspersky.jpg',
    '/public/media/images/licencias/CorelDRAW.jpg',
    '/public/media/images/licencias/Logo Creator - Windows.jpg',
    '/public/media/images/licencias/Malwarebytes.jpg',
    '/public/media/images/licencias/microsoft365_personal.jpg',
    '/public/media/images/licencias/Norton 36o.jpg',

    '/public/media/images/fidelizacion.jpg',
    '/public/media/images/hardware.jpg',
    '/public/media/images/luismiguel.png',
    '/public/media/images/microsoft_ofice.jpg',
    '/public/media/images/personaje.jpg',
    '/public/media/images/telefonos_intelilgentes.jpg',
    '/public/media/images/tienda.jpg'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Archivos guardados');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Manejo de Fetch
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response; // Respuesta en caché
                }
                return fetch(event.request)
                    .then((networkResponse) => {
                        // Verifica si la respuesta es válida
                        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                            return networkResponse; // Devuelve la respuesta de red si no se puede almacenar
                        }
                        
                        // Clona la respuesta antes de almacenarla en caché
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                        
                        return caches.match('/public/'); // Asegúrate de que este archivo existe

                    })
                    .catch(() => {
                        console.log("Estamos offline");
                        // Aquí podrías devolver una página de error o un recurso específico
                        return caches.match('/public/error_404.html'); // Asegúrate de que este archivo existe
                    });
            })
    );
});

// Para manejar las notificaciones
self.addEventListener('push', (event) => {
    const data = event.data.json();
    
    const options = {
        body: data.body,
        icon: 'icons/icon-144x144.png',
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

