// Variables que llaman a los elementos en los HTML
const modoOscuro = document.querySelector('.botonModoOscuro');
const body = document.querySelector('body');
const header = document.querySelector('header');
const tarjetas = document.querySelectorAll('.productoVistaTarjeta');
const main = document.querySelector('main');
const titulos = document.querySelector('h1');

// Verifica el modo almacenado en el Local Storage
const currentMode = localStorage.getItem('darkMode');
if (currentMode === 'on') {
  body.classList.add('dark-mode');
  modoOscuro.classList.add('dark-mode');
  header.classList.add('dark-mode');
  main.classList.add('dark-mode');
  titulos.classList.add('dark-mode');

  for (const producto of tarjetas) {
    producto.classList.add('dark-mode');
    }
}

// Agrega el evento click al botón del modo oscuro
modoOscuro.addEventListener("click", () => {
    body.classList.toggle('dark-mode');
    modoOscuro.classList.toggle('dark-mode');
    header.classList.toggle('dark-mode');
    main.classList.toggle('dark-mode');
    titulos.classList.toggle('dark-mode');

    for (const producto of tarjetas) {
        producto.classList.toggle('dark-mode');
    }
  
  
  // Actualiza el modo almacenado en el Local Storage
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'on');
  } else {
    localStorage.setItem('darkMode', 'off');
  }
});