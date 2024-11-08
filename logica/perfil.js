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
        tabla = "usuario";
        $('#datosDireccion').hide();
        $('#datosPersonales').show();
        $("#btnDatosPersonales").text("Dirección");
        $("#btnDatosPersonales").attr("id", "btnDatosDireccion");
    });
});

let tabla = "usuario";

function modificar(input, boton) {
    if($(`#${input}`).attr("disabled")) { // Evalúa el estado del botón
        $(`#${input}`).attr("disabled", false); // Habilita el botón
        $(`#${boton}`).text("Aceptar"); // Cambia el texto del botón por "Aceptar"
    } else {
        // ACA: Validaciones para cada campo antes de llamar a tomarDato
        let valor = $(`#${input}`).val().trim(); // Eliminar espacios en blanco al inicio y al final

        switch (input) {
            case "nombre":
                if (valor.length < 2) {
                    alert("El nombre debe tener al menos 2 caracteres.");
                    return; // Salir si no es válido
                } else if (/\d/.test(valor)) {
                    alert("El nombre no debe contener números.");
                    return; // Salir si no es válido
                } else if (valor.length === 0) { // Comprobar si está vacío o solo espacios
                    alert("El nombre no puede estar vacío.");
                    return; // Salir si no es válido
                }
                break;
            case "apellido":
                if (valor.length < 2) {
                    alert("El apellido debe tener al menos 2 caracteres.");
                    return; // Salir si no es válido
                } else if (/\d/.test(valor)) {
                    alert("El apellido no debe contener números.");
                    return; // Salir si no es válido
                } else if (valor.length === 0) { // Comprobar si está vacío o solo espacios
                    alert("El apellido no puede estar vacío.");
                    return; // Salir si no es válido
                }
                break;
            case "telefono":
                if (!/^\d{8}$/.test(valor)) {
                    alert("El teléfono debe tener 8 dígitos.");
                    return; // Salir si no es válido
                }
                break;
            case "fechaNac":
                if (!valor) {
                    alert("La fecha de nacimiento no puede estar vacía.");
                    return; // Salir si no es válido
                }
                break;
            case "correo":
                if (!/\S+@\S+\.\S+/.test(valor)) {
                    alert("Por favor, ingrese un correo electrónico válido.");
                    return; // Salir si no es válido
                }
                break;
            case "departamento":
            case "localidad":
                    case "calle":
                    case "esquina":
                        if (!valor.trim()) { // Verifica que no esté vacío o solo espacios
                            alert(`${input.charAt(0).toUpperCase() + input.slice(1)} no puede estar vacío.`);
                            return; // Salir si no es válido
                        }
                    break;
                case "numeroPuerta":
                    if (valor.length < 1 || /^\s*$/.test(valor)) {
                        alert("El número de puerta no puede estar vacío.");
                        return;
                    }
                    break;
                case "numeroApto":
                    if (valor && (isNaN(valor) || valor <= 0)) {
                        alert("El número de apartamento debe ser un número positivo o puede estar vacío.");
                        return;
                    }
                    break;
            case "cPostal":
                if (!/^\d{5}$/.test(valor)) {
                    alert("El código postal debe tener 5 dígitos.");
                    return; // Salir si no es válido
                }
                break;
            default:
                break;
        }

        $(`#${input}`).attr("disabled", true);
        $(`#${boton}`).text("Editar");
        tomarDato(input);
    }
}

function cargarDatos(){
    fetch('../persistencia/usuario/usuario.php?accion=datosUsuario')
    .then(response => response.text())
    .then(data => {
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
        return response.json(); 
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
            console.error(data.message);
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