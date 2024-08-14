$(document).ready(function() {
    $('#uploadForm').on('submit', function(event) {
        event.preventDefault(); // Evita el envío del formulario por defecto
        // Crear un nuevo FormData con el formulario
        var formData = new FormData(this); 

        $.ajax({
            url: '../persistencia/registroUsuario.php',
            type: 'POST',
            data: formData,
            contentType: false, // No establecer el tipo de contenido
            processData: false, // No procesar los datos (FormData se encarga)
            dataType: 'json', // Asegurarse de que la respuesta sea interpretada como JSON
            success: function(data) {
                console.log('Respuesta del servidor:', data);
                if (data.success) {
                    $('#result').html('<p>Usuario registrado con éxito!</p>');
                } else {
                    $('#result').html('<p>Error al registrar el usuario: ' + data.error + '</p>');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error en la solicitud:', textStatus, errorThrown);
                $('#result').html('<p>Error al registrar el usuario.</p>');
            }
        });
    });
});

/*function ingresar(formData){
        //let nom = $("#nom").val();
        //let desc = $("#desc").val();
        console.log(formData+"  Aca esta");
        $.ajax({
            url: '../persistencia/registroUsuario.php',
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
}
function validacion(nombre, apellido, calle, barrio, correo, password, numeroPuerta, codigoPostal, telefono, edad){
    if(verificarTexto(nombre)){
        $("#nombre").css("border-color", "red");
        return false;
    }
    $("#nombre").css("border-color", "#ddd");

    if(verificarTexto(apellido)){
        $("#apellido").css("border-color", "red");
        return false;
    }
    $("#apellido").css("border-color", "#ddd");

    if(telefono > 99999999 || telefono < 90000000){
        alert("El telefono ingresado no existe"); //Verificar luego
        $("#telefono").css("border-color", "red");
        return false;
    }
    $("#telefono").css("border-color", "#ddd");

    if(edad <18){
        alert("La edad debe ser mayor a 18");
        $("#edad").css("border-color", "red");
        return false;
    }
    $("#edad").css("border-color", "#ddd");

    if(verificarTexto(barrio)){
        $("#barrio").css("border-color", "red");
        return false;
    }
    $("#barrio").css("border-color", "#ddd");

    if(verificarTexto(calle)){
        $("#calle").css("border-color", "red");
        return false;
    }
    $("#calle").css("border-color", "#ddd");

    if(numeroPuerta < 1){
        $("#numeroPuerta").css("border-color", "red");
        return false;
    }
    $("#numeroPuerta").css("border-color", "#ddd");

    if(codigoPostal < 11000 || codigoPostal > 97000){
        alert("El codigo postal no existe");
        $("#codigoPostal").css("border-color", "red");
        return false;
    }
    $("#codigoPostal").css("border-color", "#ddd");

    var re = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|yahoo\.com)$/i; 
    if(!re.test(correo)){
        $("#email").css("border-color", "red");
        return false;
    }
    $("#email").css("border-color", "#ddd");

    if(password.length > 20 || password.length < 10){//Hacer esto con todas las variables de texto
        alert("La contraseña debe contener de 10 a 20 caracteres");
        $("#password").css("border-color", "red");
        return false;
    }
    $("#password").css("border-color", "#ddd");

    return true;
}

function verificarTexto(cadena){
    if(cadena.length < 1){
        return true;
    }

    for(var i = 0; i < cadena.length; i++) {
        //"!isNan" (is Not a Number) 
        if(!isNaN(cadena[i])) {
            return true;
        }
    }
    return false;
}*/