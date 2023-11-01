const paquetes = [
	{ id: 1, nombre: 'Booster Packs Magic: The Gathering LoTR', precio: 2000 },
    { id: 2, nombre: 'Booster Packs Magic: The Gathering Kamigawa', precio: 1500 },
	{ id: 3, nombre: 'Booster Packs One Piece Legends', precio: 1000 },
    { id: 4, nombre: 'Booster Packs One Piece Romance Dawn', precio: 800},
];

console.log("Productos: ", paquetes);

let guest ;
const guestEstilo = /^[A-Za-z]+$/;
do {
    guest = prompt('Ingrese su Nombre');
}while(!guestEstilo.test(guest) || guest === null);

alert('Bienvenido a mi proyecto ' + guest);
console.log('Buen Dia ' + guest);

//Listado de Paquetes

let listaPaquetes = "Lista de Paquetes:\n\n";

for (const paquete of paquetes) {
    listaPaquetes += `${paquete.nombre}\nPrecio: $${paquete.precio}\n\n`;
};

alert(listaPaquetes);


//Pedido de cuantos paquetes y Carrito de Compra

const compra = [];

for (const paquete of paquetes) {
    const cantidad = parseInt(prompt(`¿Cuántos ${paquete.nombre} desea agregar a su compra?`));
    if (!isNaN(cantidad) && cantidad > 0) {
        compra.push({
            paquete: paquete,
            cantidad: cantidad,
        });
    }
};

console.log("Pedido:", compra);

let carrito = 'Su carrito:\n';

for (const obj of compra) {
    const total = obj.cantidad * obj.paquete.precio;
    const pedido = `${obj.cantidad} x ${obj.paquete.nombre}: $${total}\n`;
    console.log(pedido);
    carrito += pedido;
};
alert(carrito);

//Info de Contacto y Envio

let telefono;
const telEstilo = /^[0-9]+$/;
do {
    telefono = prompt('Ingrese su número de Teléfono');
} while (!telEstilo.test(telefono) || telefono === null);

let email;
do {
    email = prompt('Ingrese su Email');
} while(email == '' || email == null);

let infoEnvio = 'Nombre: ' + guest + '\nTelefono: ' + telefono + '\nEmail: ' + email;
alert(infoEnvio);


//Carrito Final
let precioFinal = 0;

for (const obj of compra) {
    const total = obj.cantidad * obj.paquete.precio;
    precioFinal += total;
};

let carritoFinal = 'Resumen del Pedido:\n\n';

for (const obj of compra) {
    const total = obj.cantidad * obj.paquete.precio;
    const pedido = `${obj.cantidad} x ${obj.paquete.nombre}: $${total}\n`;
    carritoFinal += pedido;
};

carritoFinal += `\nPrecio Final de su Compra: $${precioFinal}\n\n`;
carritoFinal += `Información de Entrega \n${infoEnvio}`;

console.log(carritoFinal);
alert(carritoFinal);

