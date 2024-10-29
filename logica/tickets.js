$(document).ready(function() {
    obtenerTicketsBack();
    obtenerTicketsUser();
    $(document).on("click", ".ingresarRespuesta", function() {
        const idTicket = $(this).data("id"); // Obtiene el ID del ticket
        const texto = $(this).closest("tr").find("textarea").val(); // Obtiene el valor del textarea en la misma fila
        
        respuesta(idTicket, texto);
    });

    $(document).on("click", ".eliminarTicket", function() {
        const idTicket = $(this).data("id"); // Obtiene el ID del ticket
        
        eliminarTicket(idTicket);
    });

    $('#formTicket').on('submit', function(event) {
        event.preventDefault();
        
        const formData = {
            ingresoTicket: $('#ingresoTicket').val(),
        };

        $.ajax({
            url: '../persistencia/tickets/ingresarTicket.php',
            type: 'POST',
            data: formData,
            success: function(response) {
                alert("Ticket enviado!");
                $("#ingresoTicket").val("");
            },
            error: function(xhr, status, error) {
                console.error('Error en la solicitud AJAX:', error);
            }
        });
    });
});

let tickets;
function obtenerTicketsBack(){
    fetch('../persistencia/tickets/obtenerTicket.php?accion=obtenerTodos')
    .then(response => response.text())
    .then(data => {
        const jsonData = JSON.parse(data);
        if (jsonData.success) {
            tickets = jsonData.result;
            actualizarBack();
        } else {
            console.error("Error al obtener los tickets.");
        }
    })
}

let ticketsUser;
function obtenerTicketsUser() {
    fetch('../persistencia/tickets/obtenerTicket.php?accion=obtenerRespuestas')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const jsonData = JSON.parse(data);
            if (jsonData.success) {
                ticketsUser = jsonData.result;
                console.log(ticketsUser);
                actualizarUser();
            } else {
                alert(jsonData.message); // Cambia data.message a jsonData.message
            }
        })
}

function actualizarBack(){
    $("#filaTickets").empty(); // Limpiar las filas anteriores

    // Generar filas para cada producto
    for (let i = 0; i < tickets.length; i++) {
        const ticket = tickets[i];
        let fila = $(`
            <tr>
                <td>${ticket.id}</td>
                <td>${ticket.idUsuario}</td>
                <td>${ticket.fecha}</td>
                <td>${ticket.envio}</td>
                <td><textarea rows="5" cols="33" data-id="${ticket.id}"></textarea></td>
                <td>
                <button class="eliminarTicket" data-id="${ticket.id}"><i class="bi bi-trash-fill"></i></button>
                <button class="ingresarRespuesta" data-id="${ticket.id}"><i class="bi bi-file-earmark-check"></i></button>
                </td>
            </tr>
        `);
        $("#filaTickets").append(fila);
    }
}

function actualizarUser(){
    $("#filaTicketsUsuario").empty(); // Limpiar las filas anteriores

    // Generar filas para cada producto
    for (let i = 0; i < ticketsUser.length; i++) {
        const ticket = ticketsUser[i];
        let fila = $(`
            <tr>
                <td>${ticket.id}</td>
                <td>${ticket.idUsuario}</td>
                <td>${ticket.fecha}</td>
                <td>${ticket.envio}</td>
                <td>${ticket.respuesta}</td>
                <td>
                    <button class="eliminarTicket" data-id="${ticket.id}"><i class="bi bi-trash-fill"></i></button>
                </td>
            </tr>
        `);
        $("#filaTicketsUsuario").append(fila);
    }
}

function respuesta(idTicket, texto){
     // Realizar la solicitud PUT con fetch
    fetch('../persistencia/tickets/ingresarTicket.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json', // Especifica el tipo de contenido
        },
        body: JSON.stringify({ // Convierte los datos a formato JSON
            respuesta: texto,
            idTicket: idTicket
        })
    })
    .then(response => response.json()) // Parsear la respuesta a JSON
    .then(data => {
        if (data.success) {
            alert("¡Respuesta enviada con éxito!");
            // Opcional: Actualiza la tabla o UI según sea necesario
            obtenerTicketsBack(); // Llama a tu función para actualizar los tickets
        } else {
            alert("Hubo un error al enviar la respuesta.");
        }
    })
    .catch(error => {
        console.error("Error en la solicitud PUT:", error);
    });   
}

function eliminarTicket(idTicket){
    fetch('../persistencia/tickets/ingresarTicket.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json', // Especifica el tipo de contenido
        },
        body: JSON.stringify({ // Convierte los datos a formato JSON
            idTicket: idTicket
        })
    })
    .then(response => response.json()) // Parsear la respuesta a JSON
    .then(data => {
        if (data.success) {
            alert("¡Ticket eliminado con éxito!");
            // Opcional: Actualiza la tabla o UI según sea necesario
            obtenerTicketsBack(); // Llama a tu función para actualizar los tickets
            obtenerTicketsUser();
        } else {
            alert("Hubo un error al eliminar el ticket.");
        }
    })
    .catch(error => {
        console.error("Error en la solicitud PUT:", error);
    });   
}

