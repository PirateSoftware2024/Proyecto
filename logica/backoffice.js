//holaaa
let productos = [];
// Obtenemos productos de la BD
function cargarDatos(){
    fetch('../persistencia/producto/producto.php?accion=productos')
    .then(response => response.text())
    .then(data => {
        //Pasamos datos a JSON
        const jsonData = JSON.parse(data);
        productos = jsonData; // Guardamos productos
        actualizar();
    });
}


$(document).on('change', '.cambioEstado', function() {
    const valor = $(this).val();
    const idPaquete = $(this).data('id'); //Este id sera necesario para modificar el dato en la tabla detalle_pedido
    const columna = $(this).data('columna');
    console.log(valor);
    modificarEstado(idPaquete, valor, columna)
});

function modificarEstado(idPaquete, valor, columna) {
    fetch('../persistencia/pedidos/pedidos.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            id: idPaquete, 
            dato: valor,
            columna: columna
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Estado modificado!");  // Mostrar mensaje en caso de éxito
            obtenerEnvios();
        } else {
            alert('Ocurrió un error al modificar el estado.'); // Mostrar alerta en caso de error
            console.error('Error del servidor:', data.message); 
        }
    })
    .catch(error => {
        alert('Modificado con exito.'); 
        console.error('Error al modificar el estado:', error);
    });
}

function buscarPaquete() {
    let dato = $("#idEnvioBack").val(); 
    if (dato.length < 1) {
        alert("Debe ingresar un id");
    } else {
        fetch(`../persistencia/pedidos/pedidos.php?dato=${dato}&accion=obtenerPorId`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse response as JSON
            })
            .then(jsonData => {
                if (!jsonData.success) { // Check for success flag
                    console.error(jsonData.message);
                    alert(jsonData.message); // Show error message if package not found
                    return;
                }

                // Retrieve the data correctly
                envios = jsonData.data;
                console.log("Paquete encontrado:", envios);

                // Ensure the function exists and can display the data
                if (typeof mostrarPedidoBuscado === 'function') {
                    mostrarPedidoBuscado(envios); // Pass data to the display function
                } else {
                    console.warn("mostrarPedidoBuscado function not found or not defined.");
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
}


///////////////////////////////////////////////////
let envios = [];
function obtenerEnvios(){
    fetch('../persistencia/pedidos/pedidos.php?accion=pedidos')
    .then(response => response.text())
    .then(data => {
        //Pasamos datos a JSON
        const jsonData = JSON.parse(data);
        envios = jsonData; // Guardamos productos
        actualizarPedidos();
    });
}
function mostrarPedidoBuscado(){
    $("#filasVentas").empty();
    let estadoActual = envios.estadoEnvio;
    let envioActual = envios.tipoEntrega;

    let selectEnvios;
    if(envioActual == "Domicilio"){
        selectEnvios = `<option value="direccion" disabled selected>${envioActual}</option>
                            <option value="centro de recogida">Centro de recogida</option>`;
    }else{
        selectEnvios = `<option value="centro de recogida" disabled selected>${envioActual}</option>
        <option value="domicilio">Domicilio</option>`;
    }
    
    let estadosFiltrados = {};
    for (let clave in estados) {
        if (estados[clave] !== estadoActual) {
            estadosFiltrados[clave] = estados[clave];
        }
    }


    
    let selectEstados = `<option value="a" disabled selected>${estadoActual}</option>`;
    for (let clave in estadosFiltrados) {
        selectEstados += `<option value="${clave}">${estadosFiltrados[clave]}</option>`;
    }

        let fila = $(`
            <tr>
                <td>${envios.idPaquete}</td>
                <td>${envios.idCarrito}</td>
                <td>${envios.idUsuario}</td>
                <td>${envios.idDireccion}</td>
                <td>${envios.fecha}</td>
                <td> 
                    <select class="cambioEstado" data-columna="estadoEnvio" data-id="${envios.idPaquete}">
                        ${selectEstados}
                    </select>
                </td>
                <td> 
                    <select class="cambioEstado" data-columna="tipoEntrega" data-id="${envios.idPaquete}">
                        ${selectEnvios}
                    </select>
                </td>
                <td>
                    <button class="eliminarEnvio" data-id="${envios.idPaquete}"><i class="bi bi-trash-fill"></i></button>
                </td>
            </tr>
        `);
        $("#filasVentas").append(fila);
    }

    let estados = {
        "pendiente": "Pendiente",
        "esperando productos": "Esperando productos",
        "en depósito": "En depósito",
        "en camino": "En camino",
        "cancelado": "Cancelado",
        "entregado": "Entregado"
    };

function actualizarPedidos() {
    $("#filasVentas").empty();

for (let i = 0; i < envios.length; i++) {
    const envio = envios[i];
    let estadoActual = envio.estadoEnvio;
    let envioActual = envio.tipoEntrega;

    let selectEnvios;
    if(envioActual == "Domicilio"){
        selectEnvios = `<option value="direccion" disabled selected>${envioActual}</option>
                            <option value="centro de recogida">Centro de recogida</option>`;
    }else{
        selectEnvios = `<option value="centro de recogida" disabled selected>${envioActual}</option>
        <option value="domicilio">Domicilio</option>`;
    }
   
    let estadosFiltrados = {};
    for (let clave in estados) {
        if (estados[clave] !== estadoActual) {
            estadosFiltrados[clave] = estados[clave];
        }
    }



    let selectEstados = `<option value="a" disabled selected>${estadoActual}</option>`;
    for (let clave in estadosFiltrados) {
        selectEstados += `<option value="${clave}">${estadosFiltrados[clave]}</option>`;
    }

        let fila = $(`
            <tr>
                <td>${envio.idPaquete}</td>
                <td>${envio.idCarrito}</td>
                <td>${envio.idUsuario}</td>
                <td>${envio.idDireccion}</td>
                <td>${envio.fecha}</td>
                <td> 
                    <select class="cambioEstado" data-columna="estadoEnvio" data-id="${envio.idPaquete}">
                        ${selectEstados}
                    </select>
                </td>
                <td> 
                    <select class="cambioEstado" data-columna="tipoEntrega" data-id="${envio.idPaquete}">
                        ${selectEnvios}
                    </select>
                </td>
                <td>
                    <button class="eliminarEnvio" data-id="${envio.idPaquete}"><i class="bi bi-trash-fill"></i></button>
                </td>
            </tr>
        `);
        $("#filasVentas").append(fila);
    }
}

let empresas = [];
function obtenerEmpresas(){
    fetch('../persistencia/empresa/empresa.php?accion=obtenerTodas')
    .then(response => response.text())
    .then(data => {
   
        const jsonData = JSON.parse(data);
        empresas = jsonData;
        actualizarEmpresa();
    });
}

function actualizarEmpresa() {
    $("#filas4").empty(); 

 
    for (let i = 0; i < empresas.length; i++) {
        const empresa = empresas[i];
        let fila = $(`
            <tr>
                <td>${empresa.idEmpresa}</td>
                <td>${empresa.nombre}</td>
                <td>${empresa.rut}</td>
                <td>${empresa.numeroCuenta}</td>
                <td>${empresa.correo}</td>
                <td>${empresa.telefono}</td>
                <td>
                <button class="eliminarEmpresa" data-id="${empresa.idEmpresa}"><i class="bi bi-trash-fill"></i></button>
                <button class="modificarEmpresa" data-id="${empresa.idEmpresa}"><i class="bi bi-check-circle"></i></button>
                </td>
            </tr>
        `);
        $("#filas4").append(fila);
    }
}

function eliminarEmpresa(){
    let idEmpresa = $(this).data("id");
    fetch('../persistencia/empresa/empresa.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            id: idEmpresa
        })
    })
    .then(response => response.json())  
    .then(data => {
        if (data.success) {
            alert('Empresa eliminada exitosamente');
            obtenerEmpresas();
    
        } else {
            alert(data.error);  
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });
}
function eliminarEnvio() {
    let idPaquete = $(this).data("id");  
    fetch('../persistencia/pedidos/pedidos.php', {  
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            id: idPaquete
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Envio eliminado exitosamente');
            obtenerEnvios();  
        } else {
            alert(data.message);  
        }
    })
    .catch(error => {
        console.error('Error al eliminar el envio:', error);
    });
}

////////////////////////////////////////////////////////////////
function eliminarComprador(){
    let idUsuario = $(this).data("id");
    fetch('../persistencia/usuario/usuario.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            id: idUsuario
        })
    })
    .then(response => response.json())  
    .then(data => {
        if (data.success) {
            alert('Usuario eliminado exitosamente');
            cargarDatosUsuario();
        
        } else {
            alert(data.error);
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });
}

function buscarPorNombre() {
    let dato = $("#buscarUsuario1").val();
    fetch(`../persistencia/usuario/usuario.php?dato=${dato}&accion=buscarPorNombre`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            usuarios = data.data;
            actualizarUsuarios();

        } else {
            alert(data.error);
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });
}

function buscarPorNombreEmpresa() {
    let dato = $("#buscarEmpresa").val();
    fetch(`../persistencia/empresa/empresa.php?dato=${dato}&accion=buscarPorNombre`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            empresas = data.data;
            actualizarEmpresa();
            
        } else {
            alert(data.error);
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });
}

/* Asegura que el código dentro de la función 
   se ejecutará solo después de que el DOM 
   del documento esté completamente cargado
*/
$(document).ready(function() {
    $("#buscarPaquete").click(buscarPaquete);
    $("#obtenerEnvios").click(obtenerEnvios);
    $("#botonBuscar").click(buscarPorNombre);
    $("#botonBuscarNombre").click(buscarProducto);
    $("#botonStock").click(buscarStock);
    $("#botonTodos").click(cargarDatos);
    $("#buscarPedido").click(pedidoBuscar);
    $("#botonFecha").click(buscarPorFecha);
    $("#botonUsuarioTodos").click(cargarDatosUsuario);
    $("#botonTodosEmpresa").click(obtenerEmpresas);
    $("#filas5").on("click", ".boton-eliminar-reseña", eliminarReseña);
    $("#botonReseñas").click(cargarDatosReseñas);
    $("#botonBuscarEmpresa").click(buscarPorNombreEmpresa);
    $("#cancelarEmpresa").click(function () {
        $("#filas4").empty();
    })
    $("#cancelarUsuario").click(function () {
        $("#filas3").empty();
    })
    $("#filasVentas").on("click", ".eliminarEnvio", eliminarEnvio); 
    $("#filas").on("click", ".boton-eliminar", eliminarProducto); 
    $("#filas").on("click", ".boton-editar", mostrarDatos);    
    $("#filas").on("click", ".boton-modificar", modificar);  
    $("#filas").on("click", ".boton-cancelar", cancelar);   
    $("#filas4").on("click", ".eliminarEmpresa", eliminarEmpresa);   
    $("#filas3").on("click", ".eliminarUsuario", eliminarComprador);   
    cargarCategorias();
    $("#formulario").submit(function(event) {
    event.preventDefault(); 
    });

    $(document).on('click', '.modificarEmpresa', function () {
        $('#cuadroInformacion').fadeIn();
        $('body').addClass('modal-open');
        
        idUsuario = $(this).data("id");
        const empresa = empresas.find(empresa => Number(empresa.idEmpresa) === idUsuario);
        
        $("#nombreEmpresa").val(empresa.nombre);
        $("#rutEmpresa").val(empresa.rut);
        $("#numeroCuenta").val(empresa.numeroCuenta);
        $("#correoEmpresa").val(empresa.correo);
        $("#telefonoEmpresa").val(empresa.telefono);
    
    });

    $(document).on('click', '.modificarUsuario', function () {
        $('#cuadroInformacionComprador').fadeIn();
        $('body').addClass('modal-open');

        idUsuario = $(this).data("id");
        const usuario = usuarios.find(usuario => Number(usuario.idUsuario) === idUsuario);

        $("#nombreComprador").val(usuario.nombre);
        $("#apellidoComprador").val(usuario.apellido);
        $("#telefonoComprador").val(usuario.telefono);
        $("#correoComprador").val(usuario.correo);
        $("#fechaComprador").val(usuario.fechaNac);
    
    });

    $('#cerrarCuadro').click(function() {
        $('#cuadroInformacion').fadeOut();
        $('body').removeClass('modal-open');
    });

    $('#cerrarCuadroComprador').click(function() {
        $('#cuadroInformacionComprador').fadeOut();
        $('body').removeClass('modal-open');
    });


    $("#nom").click(function (){
        let nombre = $("#nombreComprador").val();
        if (nombre.length < 2) {
            alert("El nombre debe tener al menos 2 caracteres.");
            return; // Salir si no es válido
        } else if (/\d/.test(nombre)) {
            alert("El nombre no debe contener números.");
            return; // Salir si no es válido
        } else if (nombre.length === 0) { // Comprobar si está vacío o solo espacios
            alert("El nombre no puede estar vacío.");
            return; // Salir si no es válido
        }
        modificarUsuario(nombre, "nombre", "usuario");
    });
    $("#ape").click(function (){
        let apellido = $("#apellidoComprador").val();
        if (apellido.length < 2) {
            alert("El apellido debe tener al menos 2 caracteres.");
            return; // Salir si no es válido
        } else if (/\d/.test(apellido)) {
            alert("El apellido no debe contener números.");
            return; // Salir si no es válido
        } else if (apellido.length === 0) { // Comprobar si está vacío o solo espacios
            alert("El apellido no puede estar vacío.");
            return; // Salir si no es válido
        }
        modificarUsuario(apellido, "apellido", "usuario");
    });
    $("#tel").click(function (){
        let telefono = $("#telefonoComprador").val();
        if (!/^\d{8}$/.test(telefono)) {
            alert("El teléfono debe tener 8 dígitos.");
            return; // Salir si no es válido
        }
        modificarUsuario(telefono, "telefono", "usuario");
    });
    $("#fech").click(function (){
        let fecha = $("#fechaComprador").val();
        if (!fecha) {
            alert("La fecha de nacimiento no puede estar vacía.");
            return; // Salir si no es válido
        }
        modificarUsuario(fecha, "fechaNac", "usuario");
    });
    $("#mail").click(function (){
        let correo = $("#correoComprador").val();
        if (!/\S+@\S+\.\S+/.test(correo)) {
            alert("Por favor, ingrese un correo electrónico válido.");
            return; // Salir si no es válido
        }
        modificarUsuario(correo, "correo", "usuario");
    });

    ///////////////////////////////////////////////////
    $("#nomEm").click(function (){
        let nombre = $("#nombreEmpresa").val();
        if (nombre.length < 2) {
            alert("El nombre debe tener al menos 2 caracteres.");
            return; // Salir si no es válido
        } else if (/\d/.test(nombre)) {
            alert("El nombre no debe contener números.");
            return; // Salir si no es válido
        } else if (nombre.length === 0) { // Comprobar si está vacío o solo espacios
            alert("El nombre no puede estar vacío.");
            return; // Salir si no es válido
        }
        modificarUsuario(nombre, "nombre", "empresa");
    });
    $("#rut").click(function (){
        let rut = $("#rutEmpresa").val();
        if (!rut || isNaN(rut) || rut.length != 9) {
            alert("Por favor, ingrese el RUT.");
            return;
        }
        modificarUsuario(rut, "rut","empresa");
    });
    $("#nCuenta").click(function (){
        let nCuenta = $("#numeroCuenta").val();
        if (!nCuenta || isNaN(nCuenta) || nCuenta.length < 10 || nCuenta.length > 12) {
            alert("Por favor, ingrese el número de cuenta.");
            return;
        }
        modificarUsuario(nCuenta, "numeroCuenta", "empresa");
    });
    $("#mailEmpresa").click(function (){
        let correo = $("#correoEmpresa").val();
        if (!/\S+@\S+\.\S+/.test(correo)) {
            alert("Por favor, ingrese un correo electrónico válido.");
            return; // Salir si no es válido
        }
        modificarUsuario(correo, "correo", "empresa");
    });
    $("#telEmpresa").click(function (){
        let telefono = $("#telefonoEmpresa").val();
        if (!/^\d{8}$/.test(telefono)) {
            alert("El teléfono debe tener 8 dígitos.");
            return; // Salir si no es válido
        }
        modificarUsuario(telefono, "telefono","empresa");
    });


    //////////////////////////////////////////////////////
    
});

let idUsuario;
function modificarUsuario(dato, columna, tabla) {
    fetch('../persistencia/usuario/usuario.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            columna: columna,
            dato: dato,
            accion: 'modificar',
            tabla: tabla,
            idUsuario: idUsuario
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
            alert("Dato modificado correctamente!");
            cargarDatosUsuario();
            obtenerEmpresas();
        } else {
            alert(data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Ocurrió un error al procesar la solicitud.");
    });
}


function buscarStock() {
    let stock = $("#buscarProducto").val();
    
    if (isNaN(stock)) {
        alert("Debe ingresar un número!");
    } else {
        fetch('../persistencia/producto/producto.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                stock: stock, 
                accion: "productoStock"
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                productos = data.datos;
                actualizar();
            } else {
                console.error('Error al buscar el stock:', data.datos);
                alert(data.datos);
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
    }
}

function cancelar(){
    habilitarBotones();
    $("#categoria").val(productos[index].nombre).prop('disabled', false);
    $("#oferta").val(productos[index].descripcion).prop('disabled', false);
    $("#imagen").prop('disabled', false);
    $("#condicion").val(productos[index].condicion).prop('disabled', false);

    $('.boton-editar').css("background-color", "rgb(230, 206, 27)");
    $('.boton-eliminar').css("background-color", "rgb(212, 21, 21)");

    actualizar();
    $("#nombre").css("border-color", "#ccc");   
    $("#descripcion").css("border-color", "#ccc");
    $("#precio").css("border-color", "#ccc");
}
function buscarProducto(){
    let nombre = $("#buscarProducto").val();
    fetch('../persistencia/producto/producto.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            nombre: nombre,
            accion: "productoNombre"
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            productos = data.datos
            actualizar();
        } else {
            console.error('Error al buscar el producto:', data.datos);
            alert(data.datos);
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });
}
/////////////////////////////////////////
$('#uploadForm').on('submit', function(event) {
    let nombre = $("#nombre").val();
    let descripcion = $("#descripcion").val();
    let precio = Number($("#precio").val());
    let stock = $("#stock").val();
    let oferta = $("#oferta").val();
    let categoria = $("#categoria").val();
    let condicion = $("#condicion").val();

    if (validacion(nombre, descripcion, precio, stock, oferta, categoria, condicion)) {
        var formData = new FormData(this);
        formData.append('accion', 'agregar');

    $.ajax({
        url: '../persistencia/producto/producto.php',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function(data) {
            if (data.success) {
                alert("Producto publicado!")
                    // Limpiar los campos del formulario
                    $('#nombre').val('');
                    $('#descripcion').val('');
                    $('#precio').val('');
                    $('#stock').val('');
                    $('#oferta').val('');
                    $('#categoria').val('');
                    $('#condicion').val('');
                    $('#imagen').val(''); // Limpia el campo de la imagen si es necesario
            } else {
                alert("Error: "+data.error);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error en la solicitud:', textStatus, errorThrown);
            $('#result').html('<p>Error al subir la imagen.</p>');
        }
    });
}
event.preventDefault();
});
///////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////
function validacion(nombre, descripcion, precio, stock, oferta, categoria, condicion) {
    let valido = true;

    // Validación de nombre (no debe estar vacío)
    if (!nombre) {
        $("#nombre").css("border-color", "red");
        valido = false;
    } else {
        $("#nombre").css("border-color", "#ccc");
    }

    // Validación de descripción (debe estar entre 10 y 20 caracteres si tiene contenido)
    if (descripcion && (descripcion.length < 10 || descripcion.length > 20)) {
        $("#descripcion").css("border-color", "red");
        valido = false;
    } else {
        $("#descripcion").css("border-color", "#ccc");
    }

    // Validación de precio (debe ser un número positivo)
    if (isNaN(precio) || precio < 1 || precio > 999999) {
        $("#precio").css("border-color", "red");
        valido = false;
    } else {
        $("#precio").css("border-color", "#ccc");
    }

    // Validación de stock (debe ser un número positivo)
    if (isNaN(stock) || stock < 1 || stock > 999) {
        $("#stock").css("border-color", "red");
        valido = false;
    } else {
        $("#stock").css("border-color", "#ccc");
    }

    // Validación de oferta (debe ser un número entre 0 y 100 si está presente)
    if (oferta !== "Si" && oferta !== "No") {
        $("#oferta").css("border-color", "red");
        valido = false;
    } else {
        $("#oferta").css("border-color", "#ccc");
    }

    // Validación de categoría (no debe estar vacía)
    if (!categoria) {
        $("#categoria").css("border-color", "red");
        valido = false;
    } else {
        $("#categoria").css("border-color", "#ccc");
    }

    // Validación de condición (debe ser "Nuevo" o "Usado")
    if (condicion !== "Nuevo" && condicion !== "Usado") {
        $("#condicion").css("border-color", "red");
        valido = false;
    } else {
        $("#condicion").css("border-color", "#ccc");
    }

    // Verificación de imagen
    const imagen = document.getElementById("imagen").files[0];
    if (!imagen) {
        $("#imagen").css("border-color", "red");
        alert("Por favor, sube una imagen.");
        valido = false;
    } else {
        $("#imagen").css("border-color", "#ccc");
    }
    
    return valido;
}


/////////////////////////////////////////////
let categorias = [];
function cargarCategorias(){
    fetch('../persistencia/producto/producto.php?accion=categorias')
    .then(response => response.text())
    .then(data => {
        const jsonData = JSON.parse(data);
        categorias = jsonData; 
        actualizarCategorias();
    });
}

function actualizarCategorias(){
    for (let i = 0; i < categorias.length; i++) {
        const categoria = categorias[i];
        const $categoriaButton = $(`<option value="${categoria.nombre}">${categoria.nombre}</option>`);
        $("#categoria").append($categoriaButton);
    }
}


function actualizar() {
    $("#filas").empty();

    $("#nombre").val('');
    $("#descripcion").val('');
    $("#precio").val('');
    $("#stock").val('');


    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];
        let fila = $(`
            <tr>
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.precio}</td>
                <td>
                <button class="boton-eliminar" data-id="${producto.id}">Eliminar</button>
                <button class="boton-editar" data-id="${producto.id}">Editar</button>
                <button class="boton-modificar" data-id="${producto.id}">Modificar</button>
                <button class="boton-cancelar" data-id="${producto.id}">Cancelar</button>
                </td>
            </tr>
        `);
        $("#filas").append(fila);
    }
    $(".boton-modificar").attr("disabled", "disabled");
    $(".boton-cancelar").attr("disabled", "disabled");
}


let idBoton;
let index; 

function eliminarFila(idBoton){
    index = productos.findIndex(producto => Number(producto.id) === idBoton);
    productos.splice(index, 1);
    actualizar();
}

function mostrarDatos(){
    //Cancelamos botones
    cancelarBotones();

    idBoton = $(this).data("id");
    index = productos.findIndex(producto => Number(producto.id) === idBoton);
    
    $("#nombre").css("border-color", "green");
    $("#descripcion").css("border-color", "green");
    $("#precio").css("border-color", "green");
    $("#stock").css("border-color", "green");

    // Seteamos datos del producto en los input
    $("#nombre").val(productos[index].nombre);
    $("#descripcion").val(productos[index].descripcion);
    $("#precio").val(productos[index].precio);
    $("#stock").val(productos[index].stock);
    
    $("#categoria").val(productos[index].nombre).prop('disabled', true);
    $("#oferta").val(productos[index].descripcion).prop('disabled', true);
    $("#imagen").prop('disabled', true);
    $("#condicion").val(productos[index].condicion).prop('disabled', true);
    
    
    $('.boton-modificar[data-id="' + idBoton + '"]').removeAttr("disabled"); 
    $('.boton-cancelar[data-id="' + idBoton + '"]').removeAttr("disabled"); 
    
    $('.boton-editar').css("background-color", "#7a6713"); 
    $('.boton-eliminar').css("background-color", "#711512"); 
    $('.boton-modificar[data-id="' + idBoton + '"]').css("background-color", "#2ecc71"); 
    $('.boton-cancelar[data-id="' + idBoton + '"]').css("background-color", "#0a20e4");
    
    alert("Al finalizar presione 'Modificar' en el producto seleccionado!");
    $("html, body").animate({ scrollTop: 0 }, "slow");
}   

function cancelarBotones(){
    $(".boton-eliminar").attr("disabled", "disabled");
    $(".boton-editar").attr("disabled", "disabled");
    $("#boton").attr("disabled", "disabled");
}

function habilitarBotones(){
    $(".boton-eliminar").removeAttr("disabled", "disabled");
    $(".boton-editar").removeAttr("disabled", "disabled");
    $("#boton").removeAttr("disabled", "disabled");
}

function modificar(){
    idBoton = $(this).data("id");

    let nombre = $("#nombre").val(); 
    let descripcion = $("#descripcion").val();
    let precio = Number($("#precio").val());
    let stock = $("#stock").val();

    // Validación de nombre (no debe estar vacío)
    if (!nombre) {
        $("#nombre").css("border-color", "red");
        return;
    } else {
        $("#nombre").css("border-color", "#ccc");
    }

    // Validación de descripción (debe estar entre 10 y 20 caracteres si tiene contenido)
    if (descripcion && (descripcion.length < 10 || descripcion.length > 20)) {
        $("#descripcion").css("border-color", "red");
        return;
    } else {
        $("#descripcion").css("border-color", "#ccc");
    }

    // Validación de precio (debe ser un número positivo)
    if (isNaN(precio) || precio < 1 || precio > 999999) {
        $("#precio").css("border-color", "red");
        return;
    } else {
        $("#precio").css("border-color", "#ccc");
    }

    // Validación de stock (debe ser un número positivo)
    if (!stock || isNaN(stock) || stock < 1 || stock > 999) {
        $("#stock").css("border-color", "red");
        return;
    } else {
        $("#stock").css("border-color", "#ccc");
    }

    modificarProducto(idBoton, nombre, descripcion, precio, stock); 

    actualizar();
    habilitarBotones();
    $(".boton-modificar").attr("disabled", "disabled");
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

function eliminarProducto() {
    idProducto = $(this).data("id");
    fetch('../persistencia/producto/producto.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            id: idProducto,
            accion: "producto"
        })
    })
    .then(response => response.json()) 
    .then(data => {
        if (data.success) {
            console.log('Producto eliminado exitosamente');
            eliminarFila(idProducto);
    
        } else {
            alert(data.error);
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });
}


function modificarProducto(idProducto, nombre, descripcion, precio, stock) {
    fetch('../persistencia/producto/producto.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: idProducto,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            stock: stock,
            accion: "modificarBackoffice"
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Producto modificado con éxito");
            productos[index].nombre = nombre;
            productos[index].descripcion = descripcion;
            productos[index].precio = precio;
            productos[index].stock = stock;
            actualizar();
        } else {
            alert(data.error);
        }
        $("#categoria").val(productos[index].nombre).prop('disabled', false);
        $("#oferta").val(productos[index].descripcion).prop('disabled', false);
        $("#imagen").prop('disabled', false);
        $("#condicion").val(productos[index].condicion).prop('disabled', false);
    })
    .catch(error => {
        alert('Ocurrió un error inesperado al intentar modificar el producto.');
    });
}

function buscarPorFecha(){
    let fecha = $("#fechaPedido").val();
    fetch('../persistencia/pedidos/pedidos.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fecha : fecha,
            accion : "obtenerPedidoFecha"
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            pedidos = data;
            actualizarPedidos();
        }
    })
}

function pedidoBuscar(){
    let dato = Number($("#buscarOrden").val());
    fetch('../persistencia/pedidos/pedidos.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            dato : dato,
            accion : "buscarPedido"
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            pedidos = data;
            actualizarPedidos();
        }
    })
}

let usuarios = [];
function cargarDatosUsuario(){
    fetch('../persistencia/usuario/usuario.php?accion=obtenerUsuarios')
    .then(response => response.text())
    .then(data => {
        const jsonData = JSON.parse(data);
        usuarios = jsonData;
        actualizarUsuarios();
    });
}

function actualizarUsuarios() {
    $("#filas3").empty();

    for (let i = 0; i < usuarios.length; i++) {
        const usuario = usuarios[i];
        let fila = $(`
            <tr>
                <td>${usuario.idUsuario}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.apellido}</td>
                <td>${usuario.telefono}</td>
                <td>${usuario.correo}</td>
                <td>${usuario.fechaNac}</td>
                <td>
                <button class="eliminarUsuario" data-id="${usuario.idUsuario}"><i class="bi bi-trash-fill"></i></button><br>
                <button class="modificarUsuario" data-id="${usuario.idUsuario}"><i class="bi bi-check-circle"></i></button>
                </td>
            </tr>
        `);
        $("#filas3").append(fila); // Agregamos fila que almacena los tr(table row) para generar la lineas
    }
    $(".boton-modificar").attr("disabled", "disabled"); // Deshabilitamos los botones "modificar".
    //let productosJSON = JSON.stringify(productos);      // Convertimos el array productos en
    //localStorage.setItem('productos', productosJSON);   // JSON para setearlo en el localStorage con el nick "productos"
}

// Reseñas
let reseñas = [];
function cargarDatosReseñas(){
    fetch('../persistencia/producto/producto.php?accion=reseñas')
    .then(response => response.text())
    .then(data => {
        //Pasamos datos a JSON
        const jsonData = JSON.parse(data);
        reseñas = jsonData; // Una vez leido los datos acutalizamos
        actualizarReseñas();
    });
}
function actualizarReseñas() {
    $("#filas5").empty();
    if(reseñas.length < 1){
        alert("No hay reseñas!");
    }else{
        for (let i = 0; i < reseñas.length; i++) {
            const reseña = reseñas[i];
            let fila = $(`
                <tr>
                    <td>${reseña.idReseña}</td>
                    <td>${reseña.idProducto}</td>
                    <td>${reseña.idUsuario}</td>
                    <td>${reseña.reseña}</td>
                    <td>
                    <button class="boton-eliminar-reseña" data-id="${reseña.idReseña}">Eliminar</button>
                    </td>
                </tr>
            `);
            $("#filas5").append(fila); // Agregamos fila que almacena los tr(table row) para generar la lineas
        }
    }
}

function eliminarReseña() {
    idReseña = $(this).data("id");
    fetch('../persistencia/producto/producto.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            id: idReseña, 
            accion: "reseña"
        })
    })
    .then(response => response.json())  // Procesar la respuesta como JSON
    .then(data => {
        if (data.success) {
            index = reseñas.findIndex(reseña => Number(reseña.idReseña) === idReseña);
            reseñas.splice(index, 1);
            alert("Reseña eliminada!");
            // Aquí puedes agregar el código para actualizar la interfaz, como eliminar la fila de la tabla
        } else {
            alert(data.error);  // Opcional: muestra el mensaje de error en una alerta
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });
}