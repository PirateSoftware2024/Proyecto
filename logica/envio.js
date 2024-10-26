$(document).ready(function() {
    obtenerEnvios();
});

let envios;
function obtenerEnvios() {
    fetch('../persistencia/pedidos/pedidos.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            accion: "obtenerEnvios"
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            datos = data.productos; // Asegúrate que aquí estás guardando la propiedad correcta
            console.log(datos);
            mostrarEnvios();
        } else {
            console.error('Error:', data.error);
        }
    })
    .catch(error => {
        console.error("Error de red:", error);
    });    
}

function mostrarEnvios() {

    let envios = datos.envios;
    let detalles = datos.detalles;
    $(".contenedor").html(""); // Limpia el contenedor antes de mostrar los envíos


     // Asociamos valores a claves para poder darle la clase y que el "Estado envio" tome los colores del mismo"
     const tipoEnvio = {"style='color: rgb(225, 117, 8);'": "Pendiente",
        "style='color: rgb(12, 65, 157);'":"Esperando productos", 
        "style='color: rgb(223, 40, 40);'":"Cancelado",
        "style='color: rgb(8, 87, 67);'":"En depósito",
        "style='color: rgb(26, 141, 16);'": "En camino"};

    // Procesar envios usando un bucle for
    for (let i = 0; i < envios.length; i++) {
        const envio = envios[i];
        let estadoActual = Object.keys(tipoEnvio).find(
            key => tipoEnvio[key] === envio.estadoEnvio
        );
        const $productCard = $(`
            <div class="product-container">
                <ul>
                    <li>Envío #: ${envio.idPaquete}</li>
                    <li>Dirección: ${envio.localidad} ${envio.calle} ${envio.esquina} ${envio.numeroPuerta} ${envio.numeroApto} ${envio.cPostal}</li>
                    <li>Fecha: ${envio.fecha}</li>
                    <li>Total: $${parseFloat(envio.total).toFixed(2)}</li>
                    <li ${estadoActual}>Estado Envío: ${envio.estadoEnvio}</li>
                </ul>
        `);


        // Asociamos valores a claves para poder darle la clase y que el "Estado envio" tome los colores del mismo"
        const tiposEstado = {"style='color: rgb(225, 117, 8);'": "Pendiente",
                            "style='color: rgb(223, 40, 40);'":"Cancelado", 
                            "style='color: rgb(26, 141, 16);'":"Enviado a depósito",
                            "style='color: rgb(12, 65, 157);'":"En preparación"};
            // Agregar detalles de productos relacionados a este envío usando un bucle for
            for (let j = 0; j < detalles.length; j++) {
                const detalle = detalles[j];
                if(detalle.idPaquete === envio.idPaquete){
                    let estadoActual = Object.keys(tiposEstado).find(
                        key => tiposEstado[key] === detalle.estado_preparacion
                    );

                    const detalleCard = $(`
                        <div class="product-card">
                            <div class="image-container">
                                <img src="../persistencia/assets/${detalle.file_path}" width="150" height="150" alt="Imagen producto">
                            </div>
                            <h3>${detalle.nombre}</h3>
                            <div class="precio">
                                <p>${detalle.descripcion}</p>
                                <p>Precio: $${parseFloat(detalle.precio).toFixed(2)}</p>
                                <p>Cantidad: ${detalle.cantidad}</p>
                            </div>
                            <div class="envio" ${estadoActual}>${detalle.estado_preparacion}</div>
                        </div>
                    `);
                    $productCard.append(detalleCard); // Agrega el detalle al contenedor de envío
             }
            }
        $(".contenedor").append($productCard); // Agrega el envío al contenedor principal
    }
}
