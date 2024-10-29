$(document).ready(function () {
    $("#listar").click(obtenerOferta);

    $(document).on("click", ".eliminarOferta", function() {
        const idOferta = $(this).data("id");
        eliminar(idOferta);
    });

    // Función para manejar el envío del formulario
    $('#ofertaForm').on('submit', function (event) {
        event.preventDefault(); // Prevenir el envío del formulario por defecto

        // Obtener los valores del formulario
        const descuento = $('#descuento').val();
        const fechaExpiracion = $('#fechaExpiracion').val();
        const nombre = $('#nombre').val();

        // Enviar una solicitud AJAX al servidor
        $.ajax({
            url: '../persistencia/ofertas/ofertas.php', // Cambia esta URL a la que necesites
            method: 'POST',
            data: {
                nombre: nombre,
                descuento: descuento,
                fechaExpiracion: fechaExpiracion
            },
            success: function (response) {
                // Manejar la respuesta del servidor
                if (response.success) {
                    alert('Oferta agregada exitosamente.');
                    obtenerOferta(); // Actualiza la lista de ofertas
                } else {
                    alert(response.message); // Mensaje de error
                }
            },
            error: function () {
                alert('Error al enviar la oferta. Por favor, inténtelo de nuevo.');
            }
        });
    });
});



    function eliminar(idOferta){
        fetch('../persistencia/ofertas/ofertas.php', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json', // Especifica el tipo de contenido
            },
            body: JSON.stringify({ // Convierte los datos a formato JSON
                idOferta: idOferta
            })
        })
        .then(response => response.json()) // Parsear la respuesta a JSON
        .then(data => {
            if (data.success) {
                alert("Oferta eliminada con éxito!");
                // Opcional: Actualiza la tabla o UI según sea necesario
                obtenerOferta();
            } else {
                alert("Hubo un error al eliminar la oferta.");
            }
        })
        .catch(error => {
            console.error("Error en la solicitud PUT:", error);
        });   
    }



let oferta;
function obtenerOferta() {
    fetch('../persistencia/ofertas/ofertas.php?accion=obtener')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la red');
            }
            return response.json(); // Cambiado a .json() para analizar directamente
        })
        .then(jsonData => {
            if (jsonData.success) {
                oferta = jsonData.result;
                actualizarOfertas();
            } else {
                $("#ofertasList").empty(); // Limpiar las filas anteriores
                alert(jsonData.message); // Usa jsonData para obtener el mensaje
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            alert('Error al obtener las ofertas. Por favor, inténtelo de nuevo.');
        });
}


function actualizarOfertas() {
    $("#ofertasList").empty(); // Limpiar las filas anteriores
    let fila = $(`
        <tr>
            <td>${oferta.nombre}</td>
            <td>${oferta.descuento}</td>
            <td>${oferta.fecha_expiracion}</td>
            <td><button class="eliminarOferta" data-id="${oferta.id}"><i class="bi bi-trash-fill"></i></button></td>
        </tr>
    `);
    $("#ofertasList").append(fila);
}

