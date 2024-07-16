/* Array para almacenar las ordenes.
   Busca en el localStorage si exite el item "orden" 
   lo convierte en JSON y lo almacena, de lo contrario crea un array ordenes
   lo mismo con orden.
*/
let ordenes = JSON.parse(localStorage.getItem('orden')) || [];

document.addEventListener('DOMContentLoaded', function() {
    generarHistorial();
});

function mostrarHistorial(html){
    $("#orderHistory").append(html);
    const productosJSON = JSON.stringify(ordenes);
    localStorage.setItem('orden', productosJSON);
}

function generarHistorial() {
    let html = '';

    // Recorrer cada orden en el array de órdenes
    for (let i = 0; i < ordenes.length; i++) {
        const order = ordenes[i];
        let total = 0;
        let elementoHtml = '<ul class="order-items">';
        
        // Recorrer cada producto en la orden actual
        for (let j = 0; j < order.productos.length; j++) {
            const item = order.productos[j];
            
            // Calcula el subtotal del producto y agregarlo al total del pedido
            const subtotal = item.price * item.cantidad;
            total += subtotal;
            
            // Agregar el producto a la lista de elementos 
            elementoHtml += `
                <li class="order-item">
                    <span>${item.name} (x${item.cantidad})</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </li>`;
        }
        
        // Cerramos la lista
        elementoHtml += '</ul>';
        html += `
            <div class="order">
                <h2>Pedido #${order.id}</h2>
                <p>Fecha: ${order.date}</p>
                ${elementoHtml}
                <div class="total">Total: $${total.toFixed(2)}</div>
            </div>
        `;
    }
    mostrarHistorial(html);
}
