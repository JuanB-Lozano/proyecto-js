const containerProducts = document.getElementById('container-products');
const modal = document.getElementById('ventana-modal');
const carrito = document.getElementById('carrito');
const totalCarrito = document.getElementById('total');
const btnClose = document.getElementsByClassName('close')[0];
const containerCarrito = document.querySelector('.modal-body');
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
        cargarCarritoLS();
        mostrarProductosCarrito();
    });

    containerProducts.addEventListener('click', addProduct);
    containerCarrito.addEventListener('click', eliminarProducto);

    carrito.onclick = function () {
        modal.style.display = 'block';
    };

    btnClose.onclick = function () {
        ocultarModal();
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            ocultarModal();
        }
    };
};

function eliminarProducto(e) {
    if (e.target.classList.contains('eliminar-producto')) {
        const productoId = parseInt(e.target.getAttribute('id'));
        //console.log(productoId);

        productosCarrito = productosCarrito.filter((producto) => producto.id !== productoId);
        carritoLocalStorage();
        mostrarProductosCarrito();
    }
};

function cargarCarritoLS() {
    productosCarrito = JSON.parse(localStorage.getItem('productosLS')) || [];
};

function addProduct(e) {
    e.preventDefault();
    

    if (e.target.classList.contains('agregar-carrito')) {
        const productoAgregado = e.target.parentElement;
        console.log(productoAgregado);

        productoInfo(productoAgregado);
    };
};

function productoInfo(producto) {
    console.log(producto);

    const infoProducto = new Producto(
        producto.querySelector('img').src,
        producto.querySelector('h4').textContent,
        Number(producto.querySelector('p').textContent.replace('$', '')),
        parseInt(producto.querySelector('a').getAttribute('id'))
    );
    
    infoProducto.obtenerTotal();
    addCarrito(infoProducto);

    // console.log(infoProducto);
};

function addCarrito(addedProduct) {
    // console.log(addedProduct);
    // console.log(productosCarrito);

    const adentroCarrito = productosCarrito.some((producto) => producto.id === addedProduct.id);

    if (adentroCarrito) {
        const productos = productosCarrito.map((producto) => {
            if (producto.id === addedProduct.id) {
                producto.cantidad++;
                producto.subtotal = producto.precio * producto.cantidad;

                return producto;
            } else {
                return producto;
            };
        });

        productosCarrito = productos;
    } else {
        productosCarrito.push(addedProduct);
    }

    console.log(productosCarrito);
    carritoLocalStorage();
    mostrarProductosCarrito();
};

function carritoLocalStorage() {
    localStorage.setItem('productosLS', JSON.stringify(productosCarrito));
};

function mostrarProductosCarrito() {
    limpiarCart();

    productosCarrito.forEach((producto) => {
        const { imagen, nombre, precio, cantidad, subtotal, id } = producto;

        const div = document.createElement('div');
        div.classList.add('contenedor-producto');
        div.innerHTML = `
                         <img src="${imagen}" width="100">
                         <P>${nombre}</P>
                         <P>$${precio}</P>
                         <P>${cantidad}</P>
                         <P>$${subtotal}</P>
                         <a href="#" class="eliminar-producto" id="${id}"> X </a>
                        `
        containerCarrito.append(div);
    });

    mostrarCantidadItems();
    calcularTotal();
};

function calcularTotal() {
    let total = productosCarrito.reduce((precioTotal, producto) => precioTotal + producto.subtotal, 0);

    totalCarrito.innerHTML = `Total a Pagar: $ ${total} `;
};

function mostrarCantidadItems() {
    let contarItems;

    if (productosCarrito.length > 0) {
        contenedorProductos.style.display = 'flex';
        contenedorProductos.style.alignItems = 'center';
        cantidadProductos.style.display = 'flex';
        contarItems = productosCarrito.reduce((cantidad, producto) => cantidad + producto.cantidad, 0);
        cantidadProductos.innerText = `${contarItems}`;
    } else {
        contenedorProductos.style.display = 'block';
        cantidadProductos.style.display = 'none';
    }
};

function limpiarCart() {
    while (containerCarrito.firstChild){
        containerCarrito.removeChild(containerCarrito.firstChild)
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

