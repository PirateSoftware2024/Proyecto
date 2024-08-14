$(document).ready(function() {
    $('#uploadForm').on('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        // Crear un nuevo FormData con el formulario
        var formData = new FormData(this); 
        
        // Variable para almacenar la respuesta del servidor
        var respuestaServidor = {};
        $.ajax({
            url: '../persistencia/obtenerUsuario.php',
            type: 'POST',
            data: formData,
            contentType: false, // No establecer el tipo de contenido
            processData: false, // No procesar los datos (FormData se encarga)
            dataType: 'json', // Asegurarse de que la respuesta sea interpretada como JSON
            success: function(data) {
                if (data.success) {
                    $("#mensaje").css("color", "green").html("Inicio de sesión exitoso");
                } else {
                    $("#mensaje").css("color", "red").html("Usuario o contraseña incorrectos");
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error en la solicitud:', textStatus, errorThrown);
                $('#result').html('<p>Error al obtener el usuario.</p>');
            }
        });
    });
});

/*function tomarDatos(){
    const username = $("#username").val();
    const password = $("#password").val();

    verificar(username, password);
}

function verificar(username, password){
    let user = "pepito";
    let pass = 123;

    if(user == username && pass == password){
        $("#mensaje").css("color", "green").html("Inicio de sesión exitoso");
    }else{
        $("#mensaje").css("color", "red").html("Usuario o contraseña incorrectos");
    }
}*/