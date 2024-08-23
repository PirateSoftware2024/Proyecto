$(document).ready(function() {
<<<<<<< HEAD
    cargarCategorias();
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

let categorias = [];
function cargarCategorias(){
    console.log("asdasd");
    fetch('../persistencia/obtenerCategorias.php')
    .then(response => response.text())
    .then(data => {
        //Pasamos datos a JSON
        const jsonData = JSON.parse(data);
        categorias = jsonData; // Una vez leido los datos acutalizamos
        // Generamos categorias
        console.log(jsonData);
        actualizarCategorias();
    });
}

function actualizarCategorias(){
    for (let i = 0; i < categorias.length; i++) {
        const categoria = categorias[i];
        const $categoriaButton = $(`<option value="${categoria.nombre}">${categoria.nombre}</option>`);
        $("#categoria").append($categoriaButton);
    }
}
=======
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
>>>>>>> 4a936129e1927df03bb185b193dd95b921d6b95a
