$(document).ready(function() {
    obtenerEnvios();
});

let envios;
fetch('../persistencia/pedidos/pedidos.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        accion: "obtenerEnvios"
    })
})
.then(response => {
    // Imprimir el contenido de la respuesta
    return response.text(); // Cambiar a text() para ver el contenido
})
.then(text => {
    console.log("Respuesta del servidor:", text); // Muestra la respuesta en la consola
    const data = JSON.parse(text); // Intenta convertir a JSON
    if (data.success) {
        datos = data.productos;
        mostrarEnvios();
    } else {
        console.error('Error:', data.error);
    }
})
.catch(error => {
    console.error("Error de red:", error);
});

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

        let total = Number(envio.total); // Asegúrate de que sea un número
        let iva = total * 0.22; // Calcula el IVA
        let totalIva = total + iva + 30; // Total con IVA

        // Formatea totalIva a dos decimales
        let totalIvaFormateado = totalIva.toFixed(2); // Esto debería funcionar sin problemas

        const $productCard = $(`
            <div class="product-container">
                <ul>
                    <li>Envío #: ${envio.idPaquete}</li>
                    <li>Dirección: ${envio.localidad} ${envio.calle} ${envio.esquina} ${envio.numeroPuerta} ${envio.numeroApto} ${envio.cPostal}</li>
                    <li>Fecha: ${envio.fecha}</li>
                    <li>Total: $${totalIvaFormateado}</li>
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
                                <p>Precio: $${detalle.precio}</p>
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
