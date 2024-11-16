// Obtenemos los id de las etiquetas
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');
const captureButton = document.getElementById('capture');

// Accede a la cámara
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream; // Muestra la transmisión de video en el elemento video
    })
    .catch((error) => {
        console.error("Error al acceder a la cámara: ", error);
    });

// Captura la foto al hacer clic en el botón
captureButton.addEventListener('click', () => {
    const context = canvas.getContext('2d'); // Obtiene el contexto del canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height); // Dibuja la imagen del video en el canvas

    // Muestra la imagen capturada
    const dataUrl = canvas.toDataURL('image/png'); // Convierte el canvas a una URL de imagen
    photo.src = dataUrl; // Establece la fuente de la imagen para mostrar la foto
});
