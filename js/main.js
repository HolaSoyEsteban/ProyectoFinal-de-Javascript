// Funciones        --- ordenado en orden alfabetico

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

// Alertas de libreria Toastify para cuando se agrega un producto
function alertaDeProductoAgregado(){
    Toastify({
        text: "Producto Agregado",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
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

    mostrarPrecioFinal(productosDelCarrito);
}

function mostrarPrecioFinal(losProductosDelCarrito){
    const total = losProductosDelCarrito.reduce( (acc, producto) => {
        return acc + (producto.precio * producto.cantidad);
    }, 0);
    
    const precioSinIva = document.getElementById("montoTotalSinIVA");
    precioSinIva.innerHTML = "";
    const precioSinIvaTexto = document.createElement("p");
    precioSinIvaTexto.innerHTML = `$ ${total}`;
    precioSinIva.append(precioSinIvaTexto);

    const precioConIva = document.getElementById("montoTotalConIVA");
    precioConIva.innerHTML = "";
    const precioConIvaTexto = document.createElement("p");
    precioConIvaTexto.innerHTML = `$ ${total * 1.21}`;
    precioConIva.append(precioConIvaTexto);
}

function realizarLaCompra(){
    const botonComprar = document.getElementById("Comprar");
    botonComprar.addEventListener("click", () => {
        const carritoLocalStorage = localStorage.getItem("carrito");

        if (carritoLocalStorage !== null){
            // Alerta de libreria SweetAlert2
            Swal.fire({
                title: 'Desea comprar los productos del carrito?',
                showDenyButton: true,
                confirmButtonText: 'Confirmar',
                denyButtonText: `Cancelar`,
              }).then((result) => {
                if (result.isConfirmed) {
                    setTimeout(() => {
                        localStorage.removeItem("carrito");
                        location.reload();
                    },2000);

                    Swal.fire('Has realizado la compra con exito!', '', 'success')
                } else if (result.isDenied) {
                  Swal.fire('La compra aún no se realizó', '', 'info')
                }
            })
        }  
    })
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

function vaciarCarrito(){
    const botonVaciar = document.getElementById("Vaciar");
    botonVaciar.addEventListener("click", () => {
        const carritoLocalStorage = localStorage.getItem("carrito");

        if (carritoLocalStorage !== null){
            Swal.fire({
                title: 'Desea eliminar los productos del carrito?',
                showDenyButton: true,
                confirmButtonText: 'Confirmar',
                denyButtonText: `Cancelar`,
              }).then((result) => {
                if (result.isConfirmed) {
                    setTimeout(() => {
                        localStorage.removeItem("carrito");
                        location.reload();
                    },2000);
                    
                    Swal.fire('Productos eliminados!', '', 'success')
                } else if (result.isDenied) {
                  Swal.fire('Aun conserva los productos en el carrito', '', 'info')
                }
            })
        }
    });
}

// ------------ Inicio del programa -----------------------
const carrito = carritoDelLocalStorage();

vaciarCarrito();
realizarLaCompra();
mostrarCarritoEnElDOM(carrito);

fetch("../js/productos.json")
    .then( (respuestaDelServidor) => {
        return respuestaDelServidor.json();                        // Aplicamos el método .json para acceder a su contenido
    })
    .then( (resolviendoLaPromesaQueNosDevuelve) => {
        renderizarProductosEnElHTML(resolviendoLaPromesaQueNosDevuelve);
    });