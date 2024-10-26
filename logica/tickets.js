$(document).ready(function() {
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