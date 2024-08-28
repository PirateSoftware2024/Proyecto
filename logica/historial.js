/* Array para almacenar las ordenes.
   Busca en el localStorage si exite el item "orden" 
   lo convierte en JSON y lo almacena, de lo contrario crea un array ordenes
   lo mismo con orden.
*/
//let ordenes = JSON.parse(localStorage.getItem('orden')) || [];

document.addEventListener('DOMContentLoaded', function() {
    generarHistorial();

});

function mostrarHistorial(){
    ordenesListas.forEach(orden  => $("#orderHistory").append(orden));
}


let ordenes = [];
function generarHistorial() {
    idUsuario = 1;
    fetch('../persistencia/historial.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: idUsuario })
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        ordenes = data.data;  // Una vez leido los datos actualizamos
        console.log(ordenes);
        mostrar();
    } else {
        console.error('Error:', data.error);
    }
})
.catch(error => {
    console.error('Error en la solicitud:', error);
});
}


let ordenesListas = [];
function mostrar() {
    let elementoHtml = '';
    let total = 30;
    // Recorrer cada orden en el array de órdenes
    for (let i = 0; i < ordenes.length; i++) {
        const order = ordenes[i];
        const proximoProducto = ordenes[i + 1];

        let subtotal = order.precio * order.cantidad;
        if (Number(order.idCarrito) !== Number(proximoProducto?.idCarrito)) {
            total += subtotal;
            elementoHtml += `
            <li class="order-item">
                <span>${order.nombre} (x${order.cantidad})</span>
                <span>$${subtotal.toFixed(2)}</span>
            </li>`;
            elementoHtml += '</ul>';
            let html = `
            <div class="order">
                <h2>Pedido #${order.id}</h2>
                <p>Fecha: ${order.fecha}</p>
                ${elementoHtml}
                <div class="total">Total: $${total.toFixed(2)}</div>
            </div>`;
            ordenesListas.push(html);
            elementoHtml ="";
            total=30;
        } else {
            total += subtotal;
            elementoHtml += `
            <li class="order-item">
                <span>${order.nombre} (x${order.cantidad})</span>
                <span>$${subtotal.toFixed(2)}</span>
            </li>`;
        }
    }
    mostrarHistorial();
}