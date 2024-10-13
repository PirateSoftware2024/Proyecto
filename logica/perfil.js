let usuario = [];

$(document).ready(function() {
    cargarDatos();
    $("#nom").click(function (){
        modificar("nombre", "nom");
    });
    $("#ape").click(function (){
        modificar("apellido", "ape");
    });
    $("#tel").click(function (){
        modificar("telefono", "tel");
    });
    $("#fech").click(function (){
        modificar("fechaNac", "fech");
    });
    $("#mail").click(function (){
        modificar("correo", "mail");
    });
    $("#contra").click(function (){
        modificar("password", "contra");
    });
    $("#verContraseña").click(function (){
        
    });
});


function modificar(input, boton) {
    if($(`#${input}`).attr("disabled")){// Evalua el estado del boton
        $(`#${input}`).attr("disabled", false);// Habilita el boton
        $(`#${boton}`).text("Aceptar");// Cambia el texto del boton por "Aceptar"
    }else{
        $(`#${input}`).attr("disabled", true);
        $(`#${boton}`).text("Editar");
        tomarDato(input);
    }
}

function cargarDatos(){
    fetch('../persistencia/usuario/usuario.php?accion=datosUsuario')
    .then(response => response.text())
    .then(data => {
        //Pasamos datos a JSON
        const jsonData = JSON.parse(data);
        usuario= jsonData; // Una vez leido los datos acutalizamos
        actualizar();
    });
    
}

// Función para generar las filas de la tabla
function actualizar() {
    $("#nombre").val(usuario.nombre);
    $("#apellido").val(usuario.apellido);
    $("#telefono").val(usuario.telefono);
    $("#fechaNac").val(usuario.fechaNac);
    $("#correo").val(usuario.correo);
    $("#password").val(usuario.password);
}

// Función para tomar los datos del formulario
function tomarDato(input) {
    let dato;
    if(input == "telefono"){
        dato = Number($("#telefono").val());
    }else{
        dato = $(`#${input}`).val();
    }

    modificarUsuario(dato, input);
}

function modificarUsuario(dato, columna) {
    fetch('../persistencia/usuario/usuario.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            columna : columna, //Almacenamos el nombre de la columna a modificar
            dato : dato,
            accion: 'modificar'
        })
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });
}