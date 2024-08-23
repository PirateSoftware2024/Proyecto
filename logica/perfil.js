
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
        modificar("contraseña", "contra");
    });
    $("#verContraseña").click(function (){
        if ($("#contraseña").attr("type") === "password") {
            // Cambiamos el tipo del input a texto
            $("#contraseña").attr("type", "text");
            $(this).text("Ocultar");
        } else {
            // Cambia el tipo a contraseña
            $("#contraseña").attr("type", "password");
            $(this).text("Mostrar");
        }
    });
});


function modificar(input, boton) {
    if($(`#${input}`).attr("disabled")){
        $(`#${input}`).attr("disabled", false);
        $(`#${boton}`).text("Aceptar");
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
        console.log('Datos JSON:', jsonData);
        usuarios = jsonData; // Una vez leido los datos acutalizamos
        actualizar();
    });
    
}

// Función para generar las filas de la tabla
function actualizar() {
    let usuario = usuarios[0];
<<<<<<< HEAD
    console.log(usuario.password);
=======
>>>>>>> 4a936129e1927df03bb185b193dd95b921d6b95a
    $("#nombre").val(usuario.nombre);
    $("#apellido").val(usuario.apellido);
    $("#telefono").val(usuario.telefono);
    $("#fechaNac").val(usuario.fechaNac);
    //$("#departamentos").html(usuario.departamento);
    //$("#barrio").html(usuario.barrio);
    //$("#calleUsuario").html(usuario.calle);
    //$("#numeroPuerta").html(usuario.nPuerta);
    //$("#codigoPostal").html(usuario.cPostal);
    $("#correo").val(usuario.correo);
<<<<<<< HEAD
    $("#contraseña").val(usuario.password);
=======
    $("#contraseña").val(usuario.contraseña);
>>>>>>> 4a936129e1927df03bb185b193dd95b921d6b95a
}

// Función para tomar los datos del formulario
function tomarDato(input) {
    console.log("Buenas aaaa");
    let dato;
    if(input == "telefono"){
        dato = Number($("#telefono").val());
    }else{
        dato = $(`#${input}`).val();
    }

    modificarProducto(1, dato, input);

    /*if(validacion(nombre, descripcion, precio)){
        // Llamamos a la funcion agregar y agregamos sus atributos
        agregar(nombre, descripcion, precio); 
    }else{
        alert("Hay campos erroneos");
    }*/
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