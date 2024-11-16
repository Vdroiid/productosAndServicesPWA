// Almacenar el carrito en Local Storage
let carrito = JSON.parse(localStorage.getItem('carrito')) || {};

// Inicializa el valor de badge en 0 si no está definido en localStorage
if (localStorage.getItem('badge') === null) {
    localStorage.setItem('badge', 0);
}

// Recupera el valor actual de badge
let badgeCount = parseInt(localStorage.getItem('badge')) || 0;
console.log(`Badge inicial: ${badgeCount}`); // Salida: Badge inicial: 0

// Función para contar productos en el carrito
function contarProductos() {
    let totalProductos = 0;
    for (const key in carrito) {
        totalProductos += carrito[key].cantidad;
    }
    document.getElementById('abrir-carrito').textContent = `${totalProductos}`;
    return totalProductos;
}

// Función para actualizar el badge ///
function actualizarBadge(nuevoValor) {
    badgeCount = nuevoValor;
    localStorage.setItem('badge', badgeCount);
    console.log(`Badge actualizado: ${badgeCount}`); // Muestra el nuevo valor
}

// Mostrar la ventana del carrito y actualizar contenido
function actualizarCarrito() {
    const contenidoCarrito = document.querySelector('.contenido-ventana-carrito');
    contenidoCarrito.innerHTML = `
        <div class="margen-ventana">
            <h1>Carrito de compra</h1>
    `;
    let total = 0;
    for (const key in carrito) {
        const item = carrito[key];
        const subtotal = item.precio.replace(/\$|,/g, '') * item.cantidad;
        total += subtotal;
        contenidoCarrito.innerHTML += `
            <div class="img-detalles-producto-carrito">
                <div class="box-contenido-carrito">
                    <img src="${item.imagen}" style="width: 50px; height: 50px; border-radius: 100%;">
                    <h3>${item.nombre} (${item.color})</h3>
                </div>
                <div class="box-contenido-info-carrito">
                    <p>Precio: ${item.precio}</p><br>
                    <label for="cantidad">Cantidad:</label>
                    <input type="number" value="${item.cantidad}" min="0" max="100" step="1" disabled>
                    <button class="eliminar-producto" data-key="${key}">Eliminar</button>

                </div>
            </div>
            <hr>
        `;
    }
    contenidoCarrito.innerHTML += `
        <div class="img-detalles-producto-carrito">
            <strong>Total: $${total.toFixed(2)}</strong>
            <button>Realizar compra</button>
        </div>
    `;

    // Agregar evento para eliminar productos
    document.querySelectorAll('.eliminar-producto').forEach(button => {
        button.addEventListener('click', function() {
            const key = this.getAttribute('data-key');
            delete carrito[key];
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarCarrito();
            contarProductos(); // Actualizar el contador

        });
    });

    contarProductos(); // Actualizar el contador al abrir el carrito
    actualizarBadge(contarProductos()); // Actualiza el badge
}

// Agregar producto al carrito
document.querySelectorAll('a[data-nombre]').forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault();
        const nombre = item.getAttribute('data-nombre');
        const precio = item.getAttribute('data-precio');
        const imagen = item.getAttribute('data-imagen');

        // Mostrar ventana flotante
        document.querySelector('.contenido-ventana h3').textContent = nombre;
        document.querySelector('.contenido-ventana p').textContent = precio;
        document.querySelector('.img-detalles-producto img').src = imagen;
        document.getElementById('ventana-galaxy').style.display = 'block';

        // Agregar al carrito al hacer clic en el botón
        document.querySelector('.contenido-ventana button').onclick = function() {
            const color = document.getElementById('colores').value;
            const cantidad = parseInt(document.getElementById('cantidad').value, 10);
            if (cantidad > 0) {
                const key = `${nombre}-${color}`;
                if (carrito[key]) {
                    carrito[key].cantidad += cantidad;
                } else {
                    carrito[key] = {
                        nombre,
                        cantidad,
                        precio,
                        imagen,
                        color // Añadir color al carrito
                    };
                }
                localStorage.setItem('carrito', JSON.stringify(carrito));
                alert('Producto agregado al carrito');
                contarProductos(); // Actualizar el contador
            } else {
                alert('Por favor selecciona una cantidad válida');
            }
        };
    });
});

// Abrir carrito
document.getElementById('abrir-carrito').addEventListener('click', function() {
    actualizarCarrito();
    document.getElementById('abrir-ventana-carrito').style.display = 'block';
});

// Cerrar ventana del carrito al hacer clic fuera
window.addEventListener('click', function(event) {
    const carritoVentana = document.getElementById('abrir-ventana-carrito');
    if (event.target === carritoVentana) {
        carritoVentana.style.display = 'none';
    }
});

// Inicializar el contador al cargar la página
contarProductos();




