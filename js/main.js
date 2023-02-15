// Funciones

function agregandoCarritoALLocalStorage(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregandoProductosAlCarrito(productoParaAgregar){
    const indiceProductoExisteONo = carrito.findIndex((productoDelCarrito) => {
        return productoDelCarrito.nombre === productoParaAgregar.nombre
    })
    if (indiceProductoExisteONo != -1){
        carrito[indiceProductoExisteONo].cantidad++;
    }else{
        carrito.push({
            nombre: productoParaAgregar.nombre,
            precio: productoParaAgregar.precio,
            cantidad: 1,
        });
    }

    agregandoCarritoALLocalStorage()
    mostrarCarritoEnElDOM(carrito)
}

function alertaDeProductoAgregado(){
    Toastify({
        text: "Producto Agregado",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        className: "paraAlertas",
        style: {
          background: "linear-gradient(to right, #ffe4b5, #91520174)",
        }
      }).showToast();
}

function carritoDelLocalStorage(){
    let carrito = [];
    const carritoLocalStorage = localStorage.getItem("carrito");

    if (carritoLocalStorage !== null){
        carrito = JSON.parse(carritoLocalStorage);
    }
    return carrito;
}

function mostrarCarritoEnElDOM(productosDelCarrito){
    const contenidoDelCarritoEnElDOM = document.getElementById("contenidoDelCarrito");
    contenidoDelCarritoEnElDOM.innerHTML = "";

    for (const producto of productosDelCarrito){
        const detalleProducto = document.createElement("div");
        detalleProducto.classList.add("contenidoDelDetalle");

        const nombreProducto = document.createElement("p");
        nombreProducto.innerHTML = `Nombre: ${producto.nombre}`;
        detalleProducto.append(nombreProducto);

        const precioProducto = document.createElement("p");
        precioProducto.innerHTML = `Precio: $${producto.precio}`;
        detalleProducto.append(precioProducto);

        const cantidadProducto = document.createElement("p");
        cantidadProducto.innerHTML = `Cantidad: `;
        const valorCantidadProducto = document.createElement("p");
        valorCantidadProducto.innerHTML = `${producto.cantidad}`;
        detalleProducto.append(cantidadProducto,valorCantidadProducto);

        const precioTotalProducto = document.createElement("p");
        precioTotalProducto.innerHTML = `Precio Total: $${producto.precio * producto.cantidad}`;
        detalleProducto.append(precioTotalProducto);

        contenidoDelCarritoEnElDOM.append(detalleProducto);
    }
}

function renderizarProductosEnElHTML(Productos) {
    const listadoDeProductosAlHTML = document.getElementById("todosLosProductos");
    listadoDeProductosAlHTML.innerHTML = "";

    for (const producto of Productos){
        const divVistaTarjeta = document.createElement("div");
        divVistaTarjeta.className = "productoVistaTarjeta";

        const divImagenProducto = document.createElement("div");
        divImagenProducto.className = "imagenProducto";
        const img = document.createElement("img");
        img.src = `${producto.imagen}`;
        img.alt = `${producto.nombre}`;

        const pNombreProducto = document.createElement("p");
        pNombreProducto.innerHTML = `${producto.nombre}`;

        const divPrecio = document.createElement("div");
        divPrecio.className = "precios";
        const pPrecio = document.createElement("p");
        pPrecio.innerHTML = `$${producto.precio}`;

        const divBotonDeAgregarAlCarrito = document.createElement("div");
        divBotonDeAgregarAlCarrito.className = "botonDeAgregarAlCarrito";
        divBotonDeAgregarAlCarrito.addEventListener("click", () => {
            agregandoProductosAlCarrito(producto);
            alertaDeProductoAgregado();
        });
        const pTextoBotonCarrito = document.createElement("p");
        pTextoBotonCarrito.innerHTML = "Agregar al carrito";

        divImagenProducto.append(img);
        divPrecio.append(pPrecio);
        divBotonDeAgregarAlCarrito.append(pTextoBotonCarrito);

        divVistaTarjeta.append(divImagenProducto,pNombreProducto,divPrecio,divBotonDeAgregarAlCarrito);
        listadoDeProductosAlHTML.append(divVistaTarjeta);
    }
}

function VaciarCarrito(){
    const botonVaciar = document.getElementById("Vaciar");
    botonVaciar.addEventListener("click", () => {
        localStorage.clear();
        location.reload();
    });
}

const carrito = carritoDelLocalStorage();

VaciarCarrito();
mostrarCarritoEnElDOM(carrito);


fetch("../js/productos.json")
    .then( (respuestaDelServidor) => {
        return respuestaDelServidor.json();                        // Aplicamos el método .json para acceder a su contenido
    })
    .then( (resolviendoLaPromesaQueNosDevuelve) => {
        renderizarProductosEnElHTML(resolviendoLaPromesaQueNosDevuelve);
    });