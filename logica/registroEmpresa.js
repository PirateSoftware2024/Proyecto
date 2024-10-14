$(document).ready(function() {
    $('#uploadForm').on('submit', function(event) {
        event.preventDefault(); // Evita el envío del formulario por defecto
        // Obtener valores de los campos
        let nombre = $("#nombre").val();
        let rut = $("#rut").val(); // Cambiado a cadena
        let numeroCuenta = $("#nCuenta").val(); // Cambiado a cadena
        let telefono = $("#telefono").val(); // Cambiado a cadena
        let calle = $("#calle").val();
        let esquina = $("#esquina").val();
        let localidad = $("#localidad").val();
        let departamento = $("#departamentos").val();
        let nPuerta = $("#nPuerta").val();
        let nApartamento = $("#nApartamento").val();
        let cPostal = $("#cPostal").val();
        let indicaciones = $("#indicaciones").val();
        let correo = $("#email").val();
        let password = $("#password").val();
        // Validar los campos
        if (validacion(nombre, rut, numeroCuenta, telefono, departamento, calle, correo, password)) {
            var formData = new FormData(this); 
            registrar(formData);
        }
    });
});

function registrar(formData) {
    $.ajax({
        url: '../persistencia/empresa/empresa.php',
        type: 'POST',
        data: formData,
        contentType: false, // No establecer el tipo de contenido
        processData: false, // No procesar los datos (FormData se encarga)
        dataType: 'json', // Asegurarse de que la respuesta sea interpretada como JSON
        success: function(data) {
            if (data.success) {
                $("#result").html("Empresa registrada con éxito!");
                limpiarCampos();
            } else {
                $("#result").html(data.error);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $("#result").html("Error al registrar la empresa");
        }
    });
}

function validacion(nombre, rut, numeroCuenta, telefono, departamento, calle, correo, password) {
    // Validación de nombre
    if (verificarTexto(nombre)) {
        $("#nombre").css("border-color", "red");
        $("#result").html("El nombre esta vacio o contiene numeros");
        return false;
    } else {
        $("#nombre").css("border-color", "#ddd");
    }

    // Validación de RUT
    if (rut.length !== 9) {
        $("#result").html("RUT no válido.");
        $("#rut").css("border-color", "red");
        return false;
    } else {
        $("#rut").css("border-color", "#ddd");
    }

    
    let numeroCuentaStr = numeroCuenta.toString(); // Convertir el número a cadena
    if (numeroCuentaStr.length < 8 || numeroCuentaStr.length > 12) {
        $("#result").html("Número de cuenta debe tener entre 8 y 12 dígitos.");
        $("#nCuenta").css("border-color", "red");
        return false;
    } else {
        $("#nCuenta").css("border-color", "#ddd");
    }

    let telefonoStr = telefono.toString(); // Convertir el número a cadena
    // Validación de teléfono
    if (telefonoStr.length < 8 || telefonoStr.length > 15) {
        $("#result").html("Teléfono debe tener entre 8 y 15 dígitos.");
        $("#telefono").css("border-color", "red");
        return false;
    } else {
        $("#telefono").css("border-color", "#ddd");
    }

    // Validación de departamento
    if (departamento === "") { // Verificar si el valor está vacío
        $("#departamentos").css("border-color", "red");
        $("#result").html("Departamento no puede estar vacío.");
        return false;
    } else {
        $("#departamentos").css("border-color", "#ddd");
    }

    // Validación de calle
    if (calle.length < 0) {
        $("#calle").css("border-color", "red");
        $("#result").html("Calle no puede estar vacío.");
        return false;
    } else {
        $("#calle").css("border-color", "#ddd");
    }

    
    

    
    // Validación de correo electrónico
    var re = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|yahoo\.com)$/i; 
    if (!re.test(correo)) {
        $("#email").css("border-color", "red");
        $("#result").html("Correo electrónico no válido.");
        return false;
    } else {
        $("#email").css("border-color", "#ddd");
    }

    // Validación de contraseña
    if (password.length < 10 || password.length > 20) {
        $("#result").html("La contraseña debe tener entre 10 y 20 caracteres.");
        $("#password").css("border-color", "red");
        return false;
    } else {
        $("#password").css("border-color", "#ddd");
    }

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

function limpiarCampos(){
    let campos = ["nombre", "rut", "nCuenta", "telefono", "departamentos", "calle", "numeroPuerta", "numeroApartamento", "correo", "password"];
    for(let i=0;i<10;i++){
        $("#"+campos[i]).val("");
    }
}