// Registramos el worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js') // Asegúrate de que la ruta sea correcta
            .then((registration) => {
                console.log('Service Worker registrado con éxito:', registration);
            })
            .catch((error) => {
                console.error('Error al registrar el Service Worker:', error);
            });
    });
}

// Solicitar permiso para las notificaciones
if ('Notification' in window) {
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Permiso para notificaciones concedido');
        } else {
            console.log('Permiso para notificaciones denegado');
        }
    });
}

console.log(Notification.permission); // Debería ser 'granted'

// Función para mostrar notificaciones //
function mostrarNotificacion(titulo, cuerpo) {
    if (Notification.permission === 'granted') {
        new Notification(titulo, {
            body: cuerpo,
            icon: 'icons/icon-144x144.png' // Asegúrate de tener un icono
        });
    }
}

// Escuchar el evento 'offline'
window.addEventListener('offline', () => {
    console.log('Evento offline detectado');
    mostrarNotificacion('Desconectado', 'Has perdido la conexión a Internet.');
    setTimeout(() => {
        window.location.href = '/public/error_404.html';

    }, 3000); // Espera 3 segundos antes de redirigir
});

// Escuchar el evento 'online'
window.addEventListener('online', () => {
    console.log('Evento online detectado');
    mostrarNotificacion('Conectado', 'Has vuelto a conectarte a Internet.');
});


// Para notificaciones en Badges //
let notificaciones = parseInt(localStorage.getItem('badge')) || 0;
const inputBadges = document.getElementById("abrir-carrito");
const btnBadge = document.getElementById("abrir-carrito");

function configurarBadge() {
    btnBadge.addEventListener("click", () => {
        // Aquí actualizas el número de notificaciones
        notificaciones = parseInt(inputBadges.value) || 0; // Asegúrate de que sea un número
        localStorage.setItem('badge', notificaciones); // Guardas el valor en localStorage
        setearBadge(notificaciones); // Llamas a la función para actualizar el badge
    });
}

function setearBadge(n) {
    if (navigator.setAppBadge) {
        navigator.setAppBadge(n).catch(err => {
            console.error('Error al establecer el badge:', err);
        });
    } else {
        console.warn('setAppBadge no está soportado en este navegador.');
    }
}

// Inicializa el badge al cargar
setearBadge(notificaciones);
configurarBadge(); // Llama a la función para configurar el badge
