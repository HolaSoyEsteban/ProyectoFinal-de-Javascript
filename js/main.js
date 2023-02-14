// Funciones

/* 
    <div class="productoVistaTarjeta">
                    <div class="imagenProducto">
                        <img src="../img/productos/coleccionLibrosSherlockHolmes.jpg" alt="Libros de Sherlock Holmes">
                    </div>
                    
                    <div id="SagaSherlock">
                        
                    </div>
                    
                    <div class="botonDeAgregarAlCarrito">
                        <p>Agregar al carrito</p>
                    </div>
    </div>
*/ 


function agregandoCarritoALLocalStorage(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
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
    console.log(productosDelCarrito);
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

const carrito = carritoDelLocalStorage();
mostrarCarritoEnElDOM(carrito);

fetch("../js/productos.json")
    .then( (respuestaDelServidor) => {
        return respuestaDelServidor.json();                        // Aplicamos el método .json para acceder a su contenido
    })
    .then( (resolviendoLaPromesaQueNosDevuelve) => {
        renderizarProductosEnElHTML(resolviendoLaPromesaQueNosDevuelve);
    });