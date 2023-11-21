const containerProducts = document.getElementById('container-products');
const modal = document.getElementById('ventana-modal');
const carrito = document.getElementById('carrito');
const totalCarrito = document.getElementById('total');
const btnClose = document.getElementsByClassName('close')[0];
const containerCart = document.querySelector('.modal-body');
const iconMenu = document.getElementById('icon-menu');
const contenedorProductos = document.querySelector('.contenedor-carrito');
const cantidadProductos = document.querySelector('.count-products');
let productosCarrito = [];

class Producto {
    constructor(imagen, nombre, precio, id) {
        this.imagen = imagen;
        this.nombre = nombre;
        this.precio = precio;
        this.id = id;
        this.cantidad = 1;
        this.subtotal = 0;
    }

    obtenerTotal() {
        this.subtotal = this.precio * this.cantidad;
    }
};

cargarEventos();

function cargarEventos() {
    iconMenu.addEventListener('click', showMenu);

    document.addEventListener('DOMContentLoaded', () => {
        renderizarProductos();
    });

    containerProducts.addEventListener('click', agregarProducto);

    carrito.onclick = function () {
        modal.style.display = 'block';
    };

    btnClose.onclick = function () {
        ocultarModal();
    };

    window.onclick = function () {
        if (event.target == modal) {
            ocultarModal();
        }
    };
};

function agregarProducto(e) {
    e.preventDefault();
    console.log('Producto Agregado');

    if (e.target.classList.contains('agregar-carrito')) {
        const productoAgregado = e.target.parentElement;
        // console.log(productoAgregado);

        alertProducto('success', 'producto agregado', '#34b555');
        leerDatosProducto(productoAgregado);
    };
};

function ocultarModal() {
    modal.style.display = 'none';
};

function showMenu() {
    let navBar = document.getElementById('navigation-bar');

    if (navBar.className === 'navigation-bar') {
        navBar.className += ' responsive';
    } else {
        navBar.className = 'navigation-bar';
    }
};

const renderizarProductos = () => {
    productos.forEach((producto) => {
        const divCard = document.createElement('div');
        divCard.classList.add('card');
        divCard.innerHTML = `
                            <img src="./img/${producto.img}" alt="${producto.nombre}" />
                            <h4>${producto.nombre}</h4>
                            <p>$${producto.precio}</p>
                            <a id="${producto.id}" class="boton agregar-carrito" href="#">Agregar</a>
                            `;

        containerProducts.append(divCard);
    });
};

renderizarProductos();