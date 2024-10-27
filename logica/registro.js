$(document).ready(function() {
    $('#uploadForm').on('submit', function(event) {
        event.preventDefault(); // Evita el envío del formulario por defecto
        // Crear un nuevo FormData con el formulario
        let nombre = $("#nombre").val();
        let apellido = $("#apellido").val();
        let telefono = Number($("#telefono").val());
        let correo =  $("#email").val();
        let password = $("#password").val();
        let fecha = $("#fecha").val();
        let calle = $("#calle").val();
        let esquina = $("#esquina").val();
        let localidad = $("#localidad").val();
        let departamento = $("#departamentos").val();
        let nPuerta = $("#nPuerta").val();
        let nApartamento = $("#nApartamento").val();
        let cPostal = $("#cPostal").val();
        let indicaciones = $("#indicaciones").val();
        if(validacion(nombre, apellido, telefono, correo, password, fecha, localidad, departamento, calle, nPuerta, nApartamento, cPostal, esquina)){
        var formData = new FormData(this); 
        formData.append('accion', 'registrar');
        registrar(formData);
        }
    });
});

function registrar(formData) {
    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
    $.ajax({
        url: '../persistencia/usuario/usuario.php',
        type: 'POST',
        data: formData,
        contentType: false, // No establecer el tipo de contenido
        processData: false, // No procesar los datos (FormData se encarga)
        dataType: 'json', // Asegurarse de que la respuesta sea interpretada como JSON
        success: function(data) {
            if (data.success) {
                $("#result").html("Usuario registrado con éxito!");
                limpiarCampos();
            } else {
                $("#result").html(data.error); // Mostrar el error del PHP si no tuvo éxito
            }
        },
        error: function(jqXHR) {
            // Intentar obtener el mensaje de error devuelto por el PHP
            let errorMsg = "Ocurrió un error en la solicitud.";
            if (jqXHR.responseJSON && jqXHR.responseJSON.error) {
                errorMsg = jqXHR.responseJSON.error; // Mensaje de error desde PHP
            }
            $("#result").html(errorMsg); // Mostrar el error en la interfaz
        }
    });
}

function validacion(nombre, apellido, telefono, correo, password, fecha, localidad, departamento, calle, nPuerta, nApartamento, cPostal, esquina){
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
        $("#result").html("El telefono ingresado no existe"); //Verificar luego
        $("#telefono").css("border-color", "red");
        return false;
    }
    $("#telefono").css("border-color", "#ddd");

    if(!fecha){
        $("#result").html("Por favor, ingrese su fecha de nacimiento.");
        $("#fecha").css("border-color", "red");
        return false;
    }
    $("#fecha").css("border-color", "#ddd");

    if(esMayorDe18(fecha)){
        $("#result").html("Edad no valida");
        $("#fecha").css("border-color", "red");
        return false;
    }
    $("#fecha").css("border-color", "#ddd");

    var re = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|yahoo\.com)$/i; 
    if(!re.test(correo)){
        $("#email").css("border-color", "red");
        return false;
    }
    $("#email").css("border-color", "#ddd");

    if(password.length > 20 || password.length < 10){//Hacer esto con todas las variables de texto
        $("#result").html("La contraseña debe contener de 10 a 20 caracteres");
        $("#password").css("border-color", "red");
        return false;
    }
    $("#password").css("border-color", "#ddd");

    if(verificarTexto(departamento)){
        $("#departamentos").css("border-color", "red");
        return false;
    }
    $("#departamentos").css("border-color", "#ddd");

    if(verificarTexto(localidad)){
        $("#localidad").css("border-color", "red");
        return false;
    }
    $("#localidad").css("border-color", "#ddd");

    if(verificarTexto(calle)){
        $("#calle").css("border-color", "red");
        return false;
    }
    $("#calle").css("border-color", "#ddd");

    if(verificarTexto(esquina)){
        $("#esquina").css("border-color", "red");
        return false;
    }
    $("#esquina").css("border-color", "#ddd");

    if(nPuerta < 1){
        $("#nPuerta").css("border-color", "red");
        return false;
    }
    $("#nPuerta").css("border-color", "#ddd");

    if(nApartamento < 1){
        $("#nApartamento").css("border-color", "red");
        return false;
    }
    $("#nApartamento").css("border-color", "#ddd");

    if(cPostal < 11000 || cPostal > 97000){
        alert("El codigo postal no existe");
        $("#cPostal").css("border-color", "red");
        return false;
    }
    $("#cPostal").css("border-color", "#ddd");
    
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
}

function obtenerEdad(fechaNacimiento) {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    // Calcular la diferencia en años
    let edad = hoy.getFullYear() - fechaNac.getFullYear(); //Restamos año actual (2024) y año ingresado
    // Ajustar la edad si el cumpleaños no ha ocurrido este año
    const mesActual = hoy.getMonth(); // Mes actual
    const diaActual = hoy.getDate(); // Dia actual
    const mesNac = fechaNac.getMonth(); // Mes ingresado
    const diaNac = fechaNac.getDate(); // Dia ingresado

    // Si el mes o el dia actual son menores a los ingresados
    // le restamos 1 a edad ya que aun no ha cumplido años
    if (mesActual < mesNac || (mesActual === mesNac && diaActual < diaNac)) {
        edad--;
    }

    return edad;
}

function esMayorDe18(fechaNacimiento) {
    let edad = obtenerEdad(fechaNacimiento);
    return edad <= 18 || edad >= 100 || edad == "NaN";
}

function limpiarCampos(){
    let campos = ["nombre", "apellido", "telefono", "fecha", "email", "password", "localidad", "departamento", "calle", "nPuerta", "nApartamento", "cPostal", "esquina", "indicaciones"];
    for(let i=0;i<6;i++){
        $("#"+campos[i]).val("");
    }
}