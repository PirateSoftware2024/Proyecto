let usuario = [];

$(document).ready(function() {
    cargarDatos();
    $("#nom").click(function (){
        modificar("nombre", "nom");
    });
    $("#ru").click(function (){
        modificar("rut", "ru");
    });
    $("#nCuenta").click(function (){
        modificar("numeroCuenta", "nCuenta");
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
                    return;
                } else if (/\d/.test(valor)) {
                    alert("El nombre no debe contener números.");
                    return;
                } else if (valor.length === 0) {
                    alert("El nombre no puede estar vacío.");
                    return;
                }
                modificarUsuario(valor, "nombre", "empresa");
                break;
    
            case "rut":
                if (!valor || isNaN(valor) || valor.length !== 9) {
                    alert("Por favor, ingrese un RUT válido de 9 dígitos.");
                    return;
                }
                modificarUsuario(valor, "rut", "empresa");
                break;
    
            case "numeroCuenta":
                if (!valor || isNaN(valor) || valor.length < 10 || valor.length > 12) {
                    alert("Por favor, ingrese un número de cuenta válido entre 10 y 12 dígitos.");
                    return;
                }
                modificarUsuario(valor, "numeroCuenta", "empresa");
                break;
    
            case "correo":
                if (!/\S+@\S+\.\S+/.test(valor)) {
                    alert("Por favor, ingrese un correo electrónico válido.");
                    return;
                }
                modificarUsuario(valor, "correo", "empresa");
                break;
    
            case "telefono":
                if (!/^\d{8}$/.test(valor)) {
                    alert("El teléfono debe tener 8 dígitos.");
                    return;
                }
                modificarUsuario(valor, "telefono", "empresa");
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
                alert("Campo no reconocido.");
                break;
        }

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
    $("#numeroCuenta").val(usuario.numeroCuenta);
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
        } else if (data.error === "El dato ya se encuentra registrado.") {
            alert("El dato ya se encuentra registrado");
        } else {
            alert(data.error || "Ocurrió un error inesperado");
        }
    })
    .catch(error => {
        console.error('Error de red o de conexión:', error);
        alert("Ocurrió un problema con la solicitud. Por favor, inténtalo de nuevo.");
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
        return response.json();
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