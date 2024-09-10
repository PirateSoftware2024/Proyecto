let usuarios = [];

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
        if ($("#password").attr("type") === "password") {
            // Cambiamos el tipo del input a texto
            $("#password").attr("type", "text");
            $(this).text("Ocultar");
        } else {
            // Cambia el tipo a contraseña
            $("#password").attr("type", "password");
            $(this).text("Mostrar");
        }
    });
});


function modificar(input, boton) {
    if($(`#${input}`).attr("disabled")){// Evalua el estado del boton
        $(`#${input}`).attr("disabled", false);// Habilita el boton
        $(`#${boton}`).text("Aceptar");// Cambia el texto del boton por "Aceptar"
    }else{
        console.log("Paso");
        $(`#${input}`).attr("disabled", true);
        $(`#${boton}`).text("Editar");
        tomarDato(input);
    }
}

function cargarDatos(){
    fetch('../persistencia/datosUsuario.php')
    .then(response => response.text())
    .then(data => {
        console.log('Datos recibidos:', data);
        //Pasamos datos a JSON
        const jsonData = JSON.parse(data);
        usuarios = jsonData; // Una vez leido los datos acutalizamos
        actualizar();
    });
    
}

// Función para generar las filas de la tabla
function actualizar() {
    let usuario = usuarios[0];
    console.log(usuario.password);
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

    modificarProducto(1, dato, input);
}

function modificarProducto(idUser, dato, columna) {
    console.log("id: "+idUser+" dato: "+dato+"  columna: "+columna);
    fetch('../persistencia/modificarUsuario.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            idUser : idUser,
            columna : columna, //Almacenamos el nombre de la columna a modificar
            dato : dato
        })
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });
}