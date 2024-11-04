$(document).ready(function() {
    $('#uploadForm').on('submit', function(event) {
        event.preventDefault(); 
        let nombre = $("#nombre").val();
        let rut = $("#rut").val(); 
        let numeroCuenta = $("#nCuenta").val(); 
        let telefono = $("#telefono").val();
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
        if (validacion(nombre, rut, numeroCuenta, telefono, correo, password, localidad, departamento, calle, nPuerta, nApartamento, cPostal, esquina)) {
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
        contentType: false,
        processData: false,
        dataType: 'json',
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



function validacion(nombre, rut, numeroCuenta, telefono, correo, password, localidad, departamento, calle, nPuerta, nApartamento, cPostal, esquina){
    $("#result").html(" ");
    if(verificarTexto(nombre)){
        $("#nombre").css("border-color", "red");
        return false;
    }
    $("#nombre").css("border-color", "#ddd");

    // Validación de RUT
    if (rut.length !== 9) {
        $("#result").html("RUT no válido.");
        $("#rut").css("border-color", "red");
        return false;
    } else {
        $("#rut").css("border-color", "#ddd");
    }
    
    let numeroCuentaStr = numeroCuenta.toString();
    if (numeroCuentaStr.length < 8 || numeroCuentaStr.length > 12) {
        $("#result").html("Número de cuenta debe tener entre 8 y 12 dígitos.");
        $("#nCuenta").css("border-color", "red");
        return false;
    } else {
        $("#nCuenta").css("border-color", "#ddd");
    }

    var re = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|yahoo\.com)$/i; 
    if(!re.test(correo)){
        $("#email").css("border-color", "red");
        return false;
    }
    $("#email").css("border-color", "#ddd");

    if(password.length > 20 || password.length < 10){
        $("#result").html("La contraseña debe contener de 10 a 20 caracteres");
        $("#password").css("border-color", "red");
        return false;
    }
    $("#password").css("border-color", "#ddd");

    if(telefono > 99999999 || telefono < 90000000){
        $("#result").html("El telefono ingresado no existe");
        $("#telefono").css("border-color", "red");
        return false;
    }
    $("#telefono").css("border-color", "#ddd");

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

    if(nApartamento < 1 && nApartamento){
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
    if(cadena){
        if(cadena.length < 1){
            return true;
        }
    }else{
        return true;
    }
    return false;
}


function limpiarCampos(){
    let campos = ["nombre", "rut", "nCuenta", "telefono", "correo", "password", "localidad", "departamento", "calle", "nPuerta", "nApartamento", "cPostal", "esquina", "indicaciones"];
    for(let i=0;i<campos.length;i++){
        $("#"+campos[i]).val("");
    }
}