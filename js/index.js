const carrito = [];

const mercado = [
    { imagen: '🥚', codigo: 1, nombre: 'Cubeta de Huevos', precio: 20000 },
    { imagen: '🥛', codigo: 2, nombre: 'Paca de Leche entera Alquería por 12 und', precio: 30000 },
    { imagen: '🥖', codigo: 3, nombre: 'Pan bimbo blanco', precio: 10000 },
    { imagen: '🍚', codigo: 4, nombre: 'Arroz diana x 5000g', precio: 23000 }
];

const electrodomesticos = [
    { imagen: '🖥️', codigo: 1, nombre: 'Televisor lg 50 pulgadas', precio: 1800000 },
    { imagen: '🖱️', codigo: 2, nombre: 'Lavadora Samsung', precio: 1200000 },
    { imagen: '👕', codigo: 3, nombre: 'Plancha de ropa black & decker', precio: 70000 },
    { imagen: '🥤', codigo: 4, nombre: 'Licuadora 1,25 lt roja oster', precio: 175000 }
];

class Compra {
    constructor(carritoDeCompras) {
        this.carrito = carritoDeCompras;
    }
    obtenerSubtotal() {
        if (this.carrito.length > 0) {
            return this.carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
        }
    }
}

function escogerProductos() {
    alert('🛒🛒🛒 Bienvenido al Supermercado ILASS-Aprovecha los mejores precios🛒🛒🛒');
    alert('Marca 1:  si quieres comprar mercado🍎🍗🥚, o marca 2: si quieres comprar electrodomesticos🖥️🛠️🛁');
    let tipoProducto = parseInt(prompt('1 o 2'));
    if (tipoProducto === 1) {
        alert('ESCOGISTE MERCADO:🍎, \n Vamos a escoger los alimentos que necesita tu hogar');
        comprarMercado();
    } else if (tipoProducto === 2) {
        alert('ESCOGISTE ELECTRODOMESTICOS:🖥️,  Vamos a escoger los Electrodomesticos que quieres para tu Hogar 🏡');
        comprarElectrodomesticos();
    }
}

function buscarProductoMercado(codigo) {
    let productoSeleccionado = mercado.find((comida) => comida.codigo === codigo);
    return productoSeleccionado;
}

function comprarMercado() {
    let codigo = prompt('EMPECEMOS. ¿Qué producto de la sección mercado deseas añadir al carrito?, dime el código \n (Escoge del HTML)');
    let subtotal = 0; // Declarar subtotal aquí y establecerlo en 0 al inicio de la función
    while (codigo !== null) { // Continuar hasta que el usuario cancele
        let productoElegido = buscarProductoMercado(parseInt(codigo));
        if (productoElegido !== undefined) {
            let cantidad = 0;
            while (cantidad <= 0) {
                cantidad = parseInt(prompt(`¿Cuántos de "${productoElegido.nombre}" deseas comprar?`));
                if (isNaN(cantidad) || cantidad <= 0) {
                    alert('Cantidad ingresada no válida. Por favor, ingresa una cantidad válida.');
                }
            }

            // Añadir la cantidad comprada al producto
            productoElegido.cantidad = cantidad;

            // Actualizar subtotal con el costo total de este producto
            subtotal += productoElegido.precio * cantidad;

            carrito.push(productoElegido);

            alert(`Has agregado ${cantidad} de "${productoElegido.nombre}"${productoElegido.imagen} \n Por un valor de $${productoElegido.precio * cantidad}`);
        } else {
            alert("⛔️ Error en el código de prenda ingresado. Refresca para comenzar de nuevo.");
            break;
        }
        codigo = prompt('¿Deseas agregar otro producto al mercado? Ingresa el código o cancela.');
    }

    if (carrito.length > 0) { // Verificar si se compraron productos
        const shop = new Compra(carrito);
        let mensajeProductos = 'Has comprado los siguientes productos:\n';

        carrito.forEach(producto => {
            mensajeProductos += `${producto.nombre}${producto.imagen} (x${producto.cantidad}): $${producto.precio * producto.cantidad}\n`;
        });

        alert(`El costo total de los productos es de $${subtotal}\n${mensajeProductos}`);
    }
}







function buscarProductoElectrodomesticos(codigo) {
    let productoSeleccionado = electrodomesticos.find((electros) => electros.codigo === codigo);
    return productoSeleccionado;
}

function comprarElectrodomesticos() {
    let productosComprados = []; // Almacenar productos comprados con su cantidad
    let subtotal = 0; // Inicializar el subtotal en 0

    while (true) {
        let codigo = prompt('¿Qué producto de la sección electrodomésticos deseas añadir al carrito?, dime el código \n (Escoge del HTML)');
        let productoElegido = buscarProductoElectrodomesticos(parseInt(codigo));

        if (productoElegido !== undefined) {
            let cantidad = parseInt(prompt(`¿Cuántos ${productoElegido.nombre}${productoElegido.imagen} deseas comprar?`));
            if (!isNaN(cantidad) && cantidad > 0) {
                productosComprados.push({ producto: productoElegido, cantidad });
                subtotal += productoElegido.precio * cantidad;
                alert(`Has agregado ${cantidad} ${productoElegido.nombre}${productoElegido.imagen} \n Por un valor de $${productoElegido.precio * cantidad}`);
            } else {
                alert('Cantidad no válida. Debes ingresar un número mayor que 0.');
            }
        } else {
            alert("⛔️ Error en el código de producto ingresado. Refresca para comenzar de nuevo.");
        }

        let respuesta = confirm('¿Quieres agregar otro producto al mercado?');
        if (!respuesta) {
            let mensajeProductos = 'Has comprado los siguientes productos:\n';

            productosComprados.forEach(({ producto, cantidad }) => {
                mensajeProductos += `${cantidad} ${producto.nombre}${producto.imagen}: $${producto.precio * cantidad}\n`;
            });

            alert(`El costo total de los productos es de $${subtotal}\n${mensajeProductos}`);
            break;
        }
    }
}
