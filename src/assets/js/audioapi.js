// Crea un nuevo elemento de audio
const audio = document.createElement('audio');

// Define la ruta de la música
audio.src = "../assets/audio/El Mundo Subjetivo [LETRA].mp3";

// Obtiene referencias a los elementos del DOM mediante sus IDs
const play = document.getElementById('play');
const pause = document.getElementById('pause');
const cover = document.getElementById("cover");
const label = document.getElementById("label");
const progress = document.getElementById("progress");


// Función para mostrar una notificación
function showNotification(title, body) {
    if (Notification.permission === 'granted') {
        new Notification(title, { body }); // Crea y muestra la notificación
    }
}

// Verifica si todos los elementos del DOM se han encontrado
if (!play || !pause || !cover || !label || !progress) {
    console.error("Uno o más elementos no se encontraron en el DOM.");
} else {
    play.addEventListener("click", () => {
        audio.play(); // Play
    });
    pause.addEventListener("click", () => {
        audio.pause(); // Pausa
    });
    console.log(audio); // Depuracion

    // Evento que se activa cuando el audio comienza a reproducirse
    audio.addEventListener("playing", () => {
        cover.src = "../assets/images/mundo_subjetivo.jpg";
        label.textContent = "Reproduciendo: El Mundo Subjetivo [LETRA]";
        
        // Actualiza los metadatos de la sesión multimedia
        navigator.mediaSession.metadata = new MediaMetadata({
            title: 'El Mundo Subjetivo',
            artist: 'Solitario',
            album: 'Solitario',
            artwork: [
                {
                    src: '../assets/images/mundo_subjetivo.jpg', // Ruta de la imagen
                    sizes: '640x640', // Tamaño de la imagen
                    type: 'image/jpg' // Tipo de imagen
                }
            ]
        });
    });

    // Evento que se activa cuando la reproducción se pausa
    audio.addEventListener("pause", () => {
        cover.src = "../assets/images/local.jpg";
        label.textContent = "Reproducción pausada...";
        
        // Actualiza los metadatos de la sesión multimedia
        navigator.mediaSession.metadata = new MediaMetadata({
            title: 'El Mundo Subjetivo',
            artist: 'Solitario',
            album: 'Solitario',
            artwork: [
                {
                    src: '../assets/images/local.jpg', // Ruta de la imagen
                    sizes: '640x640',
                    type: 'image/jpg'
                }
            ]
        });
    });

    // Evento que se activa mientras el audio se está reproduciendo
    audio.addEventListener("timeupdate", () => {
        progress.value = audio.currentTime; // Actualiza la barra de progreso con el tiempo actual
        progress.max = audio.duration || 0; // Establece la duración máxima de la barra de progreso
    });

    // Evento que se activa cuando el audio termina de reproducirse
    audio.addEventListener("ended", () => {
        progress.value = 0;
        cover.src = "../assets/images/local.jpg";
        label.textContent = "Reproducción terminada.";
    });

    // Evento que se activa en caso de error al cargar el audio
    audio.addEventListener("error", () => {
        console.error("Error al cargar el archivo de audio.");
    });
}

if ('Notification' in window) {

    // Solicita permiso para mostrar notificaciones
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            
            // Al reproducir la canción
            play.addEventListener("click", () => {
                audio.play();
                console.log("Click en play");
                showNotification("Reproduciendo", "Se está reproduciendo: El Mundo Subjetivo [LETRA]");
            });
            
            // Al pausar la canción
            pause.addEventListener("click", () => {
                audio.pause();
                console.log("Click en pause");
                showNotification("Pausado", "La reproducción ha sido pausada.");
            });
            
            // Al finalizar la reproducción
            audio.addEventListener("ended", () => {
                progress.value = 0;
                cover.src = "../assets/images/local.jpg";
                label.textContent = "Reproducción terminada.";
                showNotification("Finalizado", "La canción ha terminado de reproducirse.");
            });
        } else if (permission === 'denied') {
            // Permiso denegado
            console.log('Permiso de notificaciones denegado.');
        } else {
            // El usuario todavía no ha respondido
            console.log('El permiso de notificaciones está pendiente.');
        }
    });
} else {
    console.log('Este navegador no soporta la API de Notificaciones.');
}

