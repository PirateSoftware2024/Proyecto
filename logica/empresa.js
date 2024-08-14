$(document).ready(function() {
    $('#uploadForm').on('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        var formData = new FormData(this); // Crear un nuevo FormData con el formulario
        //let nom = $("#nom").val();
        //let desc = $("#desc").val();
        console.log(formData+"  Aca esta");
        $.ajax({
            url: '../persistencia/agregarProducto.php',
            type: 'POST',
            data: formData,
            contentType: false, // No establecer el tipo de contenido
            processData: false, // No procesar los datos (FormData se encarga)
            success: function(data) {
                console.log('Respuesta del servidor:', data);
                if (data.success) {
                    $('#result').html('<p>Imagen subida con éxito!</p>');
                } else {
                    $('#result').html('<p>Error al subir la imagen: ' + data.error + '</p>');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error en la solicitud:', textStatus, errorThrown);
                $('#result').html('<p>Error al subir la imagen.</p>');
            }
        });
    });
});