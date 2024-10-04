$(document).ready(function() {
    $('#uploadForm').on('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        // Crear un nuevo FormData con el formulario
        var formData = new FormData(this); 
        
        //const tipoUsuario = $("#tipoUsuario").val(); // Obtenemos la opcion seleccionada
        //formData.append('tipoUsuario', tipoUsuario); // Agregamos el dato en el form
        var tipoUser = $("#tipoUsuario").val();

        var respuestaServidor = {};
        if(tipoUser == "comprador" || tipoUser == "empresa"){
            $.ajax({
                url: '../persistencia/login.php',
                type: 'POST',
                data: formData,
                contentType: false, // No establecer el tipo de contenido
                processData: false, // No procesar los datos (FormData se encarga)
                dataType: 'json', // Asegurarse de que la respuesta sea interpretada como JSON
                success: function(data) {
                    if (data.success) {
                        $("#mensaje").css("color", "green").html("Inicio de sesión exitoso");
                        redirigir(tipoUser);
                    } else {
                        $("#mensaje").css("color", "red").html("Usuario o contraseña incorrectos");
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error('Error en la solicitud:', textStatus, errorThrown);
                    $('#mensaje').css("color", "red").html('<p>Error al obtener el usuario</p>');
                }
            });
        }else{
            $('#mensaje').css("color", "red").html('<p>Debe seleccionar el tipo de usuario</p>');
        }
    });
});


function redirigir(tipoUser) {
    const loader = document.getElementById('loader'); // Obtenemos el elemento
    loader.style.display = 'flex'; // Mostramos
    
    if(tipoUser === "comprador"){
        setTimeout(function() {
            window.location.href = "../interfaz/";
        }, 2000);
    }else{
        setTimeout(function() {
            window.location.href = "../interfaz/empresa.html";
        }, 2000);
    }
    // Esperar 2 segundos antes de redirigir
}