$(document).ready(function() {
    console.log("Holaa");
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
    console.log("GOLAA");
    $(".contenedor").html(""); // Limpia el contenedor antes de mostrar los envíos


    // Procesar envios usando un bucle for
    for (let i = 0; i < envios.length; i++) {
        const envio = envios[i];
        const $productCard = $(`
            <div class="product-container">
                <ul>
                    <li>Envío #: ${envio.idPaquete}</li>
                    <li>Dirección: ${envio.localidad} ${envio.calle} ${envio.esquina} ${envio.numeroPuerta} ${envio.numeroApto} ${envio.cPostal}</li>
                    <li>Fecha: ${envio.fecha}</li>
                    <li>Total: $${parseFloat(envio.total).toFixed(2)}</li>
                    <li>Estado Envío: ${envio.estadoEnvio}</li>
                </ul>
        `);

        // Verificar si 'detalles' existe en el objeto 'envio'
        if (detalles && Array.isArray(detalles)) {
            // Agregar detalles de productos relacionados a este envío usando un bucle for
            for (let j = 0; j < detalles.length; j++) {
                const detalle = detalles[j];
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
                        <div class="envio">Estado de preparación: ${detalle.estado_preparacion}</div>
                    </div>
                `);
                $productCard.append(detalleCard); // Agrega el detalle al contenedor de envío
            }
        } else {
            console.warn("No hay detalles para este envío o 'detalles' no es un array");
        }

        $(".contenedor").append($productCard); // Agrega el envío al contenedor principal
    }
}
