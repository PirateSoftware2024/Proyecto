let usuario = [];

$(document).ready(function() {
    cargarDatos();
    $("#nom").click(function (){
        modificar("nombre", "nom");
    });
    $("#ru").click(function (){
        modificar("rut", "ru");
    });
    $("#tel").click(function (){
        modificar("telefono", "tel");
    });
    $("#mail").click(function (){
        modificar("correo", "mail");
    });
    
    $("#depa").click(function (){
        modificar("departamento", "depa");
    });
    $("#localia").click(function (){
        modificar("localidad", "localia");
    });
    $("#call").click(function (){
        modificar("calle", "call");
    });
    $("#esq").click(function (){
        modificar("esquina", "esq");
    });
    $("#nPue").click(function (){
        modificar("numeroPuerta", "nPue");
    });
    $("#nAp").click(function (){
        modificar("numeroApto", "nAp");
    });
    $("#cPos").click(function (){
        modificar("cPostal", "cPos");
    });
    $("#indi").click(function (){
        modificar("indicaciones", "indi");
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
    

    $(document).on('click', '#btnDatosDireccion', function () {
        tabla = "direcciones";
        $('#datosPersonales').hide();
        $('#datosDireccion').show();
        $("#btnDatosDireccion").text("Datos personales");
        $("#btnDatosDireccion").attr("id", "btnDatosPersonales");
    });

    $(document).on('click', '#btnDatosPersonales', function () {
        tabla = "empresa";
        $('#datosDireccion').hide();
        $('#datosPersonales').show();
        $("#btnDatosPersonales").text("Dirección");
        $("#btnDatosPersonales").attr("id", "btnDatosDireccion");
    });
});

let tabla = "empresa";

function modificar(input, boton) {
    console.log(tabla);
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
    fetch('../persistencia/empresa/empresa.php?accion=obtenerDatosEmpresa')
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
    $("#rut").val(usuario.rut);
    $("#telefono").val(usuario.telefono);
    $("#correo").val(usuario.correo);

    //Datos direccion
    $("#departamento").val(usuario.departamento);
    $("#localidad").val(usuario.localidad);
    $("#calle").val(usuario.calle);
    $("#esquina").val(usuario.esquina);
    $("#numeroPuerta").val(usuario.numeroPuerta);

    $("#numeroApto").val(usuario.numeroApto);
    $("#cPostal").val(usuario.cPostal);
    $("#indicaciones").val(usuario.indicaciones);
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
            accion: 'modificar',
            tabla: tabla
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