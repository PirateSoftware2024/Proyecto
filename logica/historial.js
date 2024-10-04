/* Array para almacenar las ordenes.
   Busca en el localStorage si exite el item "orden" 
   lo convierte en JSON y lo almacena, de lo contrario crea un array ordenes
   lo mismo con orden.
*/
//let ordenes = JSON.parse(localStorage.getItem('orden')) || [];

let idBoton;
document.addEventListener('DOMContentLoaded', function() {
    generarHistorial();

    // -Codigo cuadrado boton "comprar"
    $("#orderHistory").on("click", ".reseña", function() {
        $('#cuadroInformacion').fadeIn();
        $('body').addClass('modal-open');
        idBoton = Number($(this).data("id"));
        reseña();
    });

    $('#cerrarCuadro').click(function() {
        $('#cuadroInformacion').fadeOut();
        $('body').removeClass('modal-open');
    });
});

function mostrarHistorial(){
    ordenesListas.forEach(orden  => $("#orderHistory").append(orden));
}


let ordenes = [];
function generarHistorial() {
    fetch('../persistencia/carrito/carrito.php', {
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        ordenes = data.data;  // Una vez leido los datos actualizamos
        console.log("aca estan las ordenes:" +ordenes);
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
        // !proximoProducto retorna true si proximoProducto es undefined o null
        if (!proximoProducto || Number(order.idCarrito) !== Number(proximoProducto.idCarrito)) {
            total += subtotal;
            elementoHtml += `
            <li class="order-item">
                <button class="reseña" data-id=${order.id} >Reseña</button> <span>${order.nombre} (x${order.cantidad})</span>
                <span>$${subtotal.toFixed(2)}</span>
            </li>`;
            elementoHtml += '</ul>';
            let html = `
            <div class="order">
                <h2>Pedido #${order.idCarrito}</h2>
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
                <button class="reseña" data-id=${order.id}>Reseña</button> <span>${order.nombre} (x${order.cantidad})</span>
                <span>$${subtotal.toFixed(2)}</span>
            </li>`;
        }
    }
    mostrarHistorial();
}

function reseña(){
    const $productCard = $(`
            <h3>Reseña</h3>
            <input type="text" id="reseña">
            <button id="botonReseña">Enviar</button>
        </div>
    `);
    $("#infoProducto").html($productCard);

    $("#botonReseña").click(enviarReseña);
}   

function enviarReseña() {
    let reseña = $("#reseña").val();
    fetch('../persistencia/producto/producto.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            idProducto: idBoton,
            reseña: reseña,
            accion: "reseñasAgregar"
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Reseña realizada con exito!")
            $('#cuadroInformacion').fadeOut();
            $('body').removeClass('modal-open');
        } else {
            console.error('Error:', data.error);
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });

}