

// Redirecciones
document.addEventListener('DOMContentLoaded', function() {
    const botonRedireccionarCelulares = document.getElementById("celulares");
    const botonRedireccionarCompus = document.getElementById("compus");
    const botonRedireccionarLicencias = document.getElementById("licencias");
    if (botonRedireccionarCelulares) {
        botonRedireccionarCelulares.addEventListener('click', function() {
            window.location.href = '../../src/pages/celulares.html'; // Ruta según tu estructura
        });
    } else {
        console.error("Elemento no encontrado");
    }
    if (botonRedireccionarCompus) {
        botonRedireccionarCompus.addEventListener('click', function() {
            window.location.href = '../../src/pages/compus.html'; // Ajusta la ruta según tu estructura
        });
    } else {
        console.error("Elemento no encontrado");
    }
    if (botonRedireccionarLicencias) {
        botonRedireccionarLicencias.addEventListener('click', function() {
            window.location.href = '../../src/pages/licencias.html'; // Ajusta la ruta según tu estructura
        });
    } else {
        console.error("Elemento no encontrado");
    }
});
