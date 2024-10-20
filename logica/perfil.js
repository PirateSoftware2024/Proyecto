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
    
    $(document).on('click', '#modfiContra', function () {
        let contra = $("#password").val();
        if(nuevaContrasena == contra){
            alert("La contraseña deber ser distinta a la actual");
        }else if(contra.length<1){
            alert("La contraseña no puede estar vacia");
        }else{
            tomarDato("password");
        }
    });

    let nuevaContrasena;
    $(document).on('click', '#guardarContra', function () {
        nuevaContrasena = $('#nuevaContra').val();

        if (nuevaContrasena) {
            validareContra(nuevaContrasena);
        } else {
            alert('Por favor, ingrese su contraseña.');
        }
    });


    $("#contra").click(function() {
        $('#cuadroInformacion').fadeIn();
        $('body').addClass('modal-open');
    });

    $('#cerrarCuadro').click(function() {
        $('#cuadroInformacion').fadeOut();
        $('body').removeClass('modal-open');
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
            columna: columna, // Almacenamos el nombre de la columna a modificar
            dato: dato,
            accion: 'modificar'
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor'); // Lanza un error si la respuesta no es ok
        }
        return response.json(); // Asegúrate de parsear como JSON
    })
    .then(data => {
        if (data.success) {
            alert("Dato modificado correctamente!");
            actualizarPage();
        } else {
            alert("Error al modificar el dato: " + (data.error || ''));
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
        alert('Ocurrió un error: ' + error.message); // Muestra el error al usuario
    });
}


function validareContra(contra) {
    fetch('../persistencia/usuario/usuario.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contra: contra,
            accion: 'verificarContra'
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.json(); // Parsear la respuesta como JSON
    })
    .then(data => {
        if (data.success) {
            alert("Contraseña correcta!");
            nuevaContra();
        } else {
            console.error(data.message); // Contraseña incorrecta o error
            // Mostrar el mensaje de error al usuario
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
        alert('Ocurrió un error al intentar verificar la contraseña. Inténtalo de nuevo.');
    });
}


function nuevaContra(){
    const htmlContent = `
        <h3>Cambiar Contraseña</h3>
        <label for="nuevaContra">Ingrese nueva contraseña:</label>
        <input type="password" id="password" placeholder="Ingrese contraseña">
        <button id="modfiContra">Modificar</button><br><br>
    `;
    $("#modificarContra").html(htmlContent);
}


function actualizarPage(){
    
    const actual = `
        <h3>Cambiar Contraseña</h3>
        <label for="nuevaContra">Ingrese contraseña actual:</label>
        <input type="password" id="nuevaContra" placeholder="Ingrese contraseña">
        <button id="guardarContra">Continuar</button><br><br>
    `;
    $("#modificarContra").html(actual);

    $('#cerrarCuadro').click()
}