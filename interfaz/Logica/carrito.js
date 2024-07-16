/* Array para almacenar los productos del carrito.
   Busca en el localStorage si exite el item "carrito" 
   lo convierte en JSON y lo almacena, de lo contrario crea un array productos
   lo mismo con orden.
*/
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let orden = JSON.parse(localStorage.getItem('orden')) || [];

$(document).ready(function() {      
    mostrarProductosEnCarrito();
    $("#cartContainer").on("click", ".boton-eliminar", eliminar);     // Controlador de eventos que
    $("#cartContainer").on("click", ".boton-mas", sumarCantidad);     // responde a los clicks en cualquier elemento con la     
    $("#cartContainer").on("click", ".boton-menos", restarCantidad);  // clase .boton-"accion" que esté dentro del elemento con id "cartContainer".
    $("#comprar").click(comprar);
});

    // Función para mostrar los productos en el carrito
    function mostrarProductosEnCarrito() {
    // Vacia el contenedor antes de agregar los productos
    $("#cartContainer").empty();

    // Recorrer el array carrito y creamos un div
    for (let i = 0; i < carrito.length; i++) {
        const producto = carrito[i];
        let precio = producto.price * producto.cantidad;
        const $productCard = $(`
        <div class="product-card">
            <img src="${producto.image}" width="125" height="125">
            <h3>${producto.name}</h3>
            <div class="price">$${precio}</div>
            <p>Cantidad: ${producto.cantidad}</p>
            <button class="boton-eliminar" data-id="${producto.id}">Eliminar</button>
            <button class="boton-mas" data-id="${producto.id}">+</button>
            <button class="boton-menos" data-id="${producto.id}">-</button>
        </div>`);
        // Agregar el producto al contenedor del carrito
        $("#cartContainer").append($productCard);
    }
}

// Funcion para eliminar productos del carrito
function eliminar() {
    const idBoton = $(this).data("id");

    // Filtrar el carrito para eliminar el producto con el ID correspondiente
    const index = carrito.findIndex(producto => producto.id === idBoton);
    carrito.splice(index, 1);

    // Actualizar localStorage y volver a renderizar el carrito
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarProductosEnCarrito();
}

// Funcion para aumentar la cantidad de un producto en el carrito
function sumarCantidad() {
    const idBoton = $(this).data("id");
    const index = carrito.findIndex(producto => producto.id === idBoton);
    carrito[index].cantidad++;
    
    // Actualizar localStorage y volver a renderizar el carrito
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarProductosEnCarrito();
}

function restarCantidad() {
    const idBoton = $(this).data("id");
    const index = carrito.findIndex(producto => producto.id === idBoton);

    if(carrito[index].cantidad > 1){
        carrito[index].cantidad--;
        // Actualizar localStorage y volver a renderizar el carrito
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarProductosEnCarrito();
    }else{
        alert("La cantidad no puede ser menor a 1");
    }
}

// Funcion para comprar y generar un ticket de compra 
function comprar() {
    let datosOrden = [];
    // Recorrer el carrito para construir los datos de la orden
    for (let i = 0; i < carrito.length; i++) {
        const producto = carrito[i];
        datosOrden.push({
            name: producto.name,
            price: producto.price,
            cantidad: producto.cantidad
        });
}

    // Crear la orden con los datos recopilados
    orden.push({
        id: "id de la orden",
        titulo: "Orden Numero",
        date: '2024-11-20',
        productos: datosOrden
    });


    // Convertir la orden a JSON y guardar en localStorage
    const ordenJSON = JSON.stringify(orden);
    localStorage.setItem('orden', ordenJSON);
}
