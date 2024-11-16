
document.querySelectorAll('#abrir-ventana').forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault(); // Evitar el recargado de la página

        // Obtener datos del producto
        const nombre = item.getAttribute('data-nombre');
        const precio = item.getAttribute('data-precio');
        const imagen = item.getAttribute('data-imagen');

        // Actualizar contenido de la ventana
        document.querySelector('.contenido-ventana h3').textContent = nombre;
        document.querySelector('.contenido-ventana p').textContent = precio;
        document.querySelector('.img-detalles-producto img').src = imagen;

        // Mostrar ventana
        document.getElementById('ventana-galaxy').style.display = 'block';
    });
});

// Cerrar la ventana con el icono
document.getElementById('close').addEventListener('click', function() {
    document.getElementById('ventana-galaxy').style.display = 'none';
});

// Cerrar la ventana al hacer click fuera de ella
window.onclick = function(event) {
    const ventana = document.getElementById('ventana-galaxy');
    if (event.target == ventana) {
        ventana.style.display = "none";
    }
}
