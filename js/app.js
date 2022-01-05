// Variables
const carrito = document.querySelector('#carrito');
const listaProductos = document.querySelector('#lista-productos');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const totalCarrito = document.querySelector('#total-carrito thead');
let articulosCarrito = [];


cargarEventlisteners();
function cargarEventlisteners() {
    // Cuando agregas un producto presionando "Agregar al Carrito";
    listaProductos.addEventListener('click', agregarProducto);

    // Elimina productos del carrito
    carrito.addEventListener('click', eliminarProducto);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    });
}


// Funciones
function agregarProducto(e) {
    e.preventDefault();

    if( e.target.classList.contains('agregar-carrito') ) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatosProducto(productoSeleccionado);
    }
}

function eliminarProducto(e) {    
    if( e.target.classList.contains('borrar-producto') ) {
        const productoId = e.target.getAttribute('data-id');

        // Eliminar del arreglo articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( producto => producto.id !== productoId );
        
        // Mando a imprimir el carrito
        carritoHTML();
    }
}

// Extrae los datos del producto haciendo traversing del DOM
function leerDatosProducto(producto) {

    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h4').textContent,
        precio: producto.querySelector('.precio span').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1       
    }

    // Revisar si un producto ya esta en el carrito
    const existe = articulosCarrito.some( producto => producto.id === infoProducto.id );
    if( existe ) {
        // Actualizar la cantidad
        const productos = articulosCarrito.map( producto => {
            if( producto.id === infoProducto.id ) {
                producto.cantidad++;                
            }
            return producto;
        });
        articulosCarrito = [...productos];
    }    
    else 
    {
        // Agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoProducto]; // hace una copia del carrito y le agrega el infoProducto
    }

    //console.log(articulosCarrito);

    carritoHTML();
}


// Muestra el Carrito de compras en el HTML
function carritoHTML() {

    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( producto => {
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width=100/>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${producto.id}"> X </a>
            </td>
        `;

        // Agrega el HTML del carrito en el tbody
        listaCarrito.appendChild(row);
    })

    calcularTotal();
}

// Elimina los productos del tbody
function limpiarHTML() {
    while( listaCarrito.firstChild ) {
        listaCarrito.removeChild(listaCarrito.firstChild);    
    }
    while( totalCarrito.firstChild ) {
        totalCarrito.removeChild(totalCarrito.firstChild);
    }    
}

function calcularTotal() {
    
    let total = 0;
    articulosCarrito.forEach( producto => {
        
        total += parseInt(producto.precio.split(' ')[1]) * parseInt(producto.cantidad);        
    } );
    console.log(total);
    const row = document.createElement('tr');
    row.innerHTML = `
        <th>Total: </th>
        <th>U$S ${total}</th>
    `;
    totalCarrito.appendChild(row);
}