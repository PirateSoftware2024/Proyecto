$(document).ready(function() {
    $("#obtenerUsuario").click( obtenerTicketsUser);
    $("#obtenerBack").click(obtenerTicketsBack);
    $(document).on("click", ".ingresarRespuesta", function() {
        const idTicket = $(this).data("id"); // Obtiene el ID del ticket
        const texto = $(this).closest("tr").find("textarea").val(); // Obtiene el valor del textarea en la misma fila
        
        if(!texto.trim()){ // .trim() elimina espacios al principio y al final
            alert("Debe ingresar texto!");
            return;
        }

        respuesta(idTicket, texto);
    });

    $(document).on("click", ".eliminarTicket", function() {
        const idTicket = $(this).data("id"); // Obtiene el ID del ticket
        
        eliminarTicket(idTicket);
    });

    $('#formTicket').on('submit', function(event) {
        event.preventDefault();
        let validar = $('#ingresoTicket').val();
        const formData = {
            ingresoTicket: $('#ingresoTicket').val(),
        };

        if(!validar.trim()){ // .trim() elimina espacios al principio y al final
            alert("Debe ingresar texto!");
            return;
        }
        $.ajax({
            url: '../persistencia/tickets/ingresarTicket.php',
            type: 'POST',
            data: formData,
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    alert("Ticket enviado!");
                    $("#ingresoTicket").val("");
                } else {
                    alert(response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error("Error en la solicitud AJAX:", xhr.responseText);
                alert("Ocurrió un error al enviar el ticket. Por favor, intenta nuevamente.");
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
                alert(jsonData.message);
                $("#filaTicketsUsuario").empty();
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
                <td>${ticket.tipo}</td>
                <td>${ticket.fecha}</td>
                <td>${ticket.envio}</td>
                <td><textarea id="textArea" data-id="${ticket.id}"></textarea></td>
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
    fetch('../persistencia/tickets/ingresarTicket.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            respuesta: texto,
            idTicket: idTicket
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("¡Respuesta enviada con éxito!");
            obtenerTicketsBack();
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
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            idTicket: idTicket
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("¡Ticket eliminado con éxito!");
            obtenerTicketsBack();
            obtenerTicketsUser();
        } else {
            alert("Hubo un error al eliminar el ticket.");
        }
    })
    .catch(error => {
        console.error("Error en la solicitud PUT:", error);
    });   
}

