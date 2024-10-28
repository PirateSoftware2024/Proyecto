
let productos = [];
// Obtenemos productos de la BD
function cargarDatos(){
    fetch('../persistencia/producto/producto.php?accion=obtenerTodosProductos')
    .then(response => response.text())
    .then(data => {
        //Pasamos datos a JSON
        const jsonData = JSON.parse(data);
        productos = jsonData; // Guardamos productos
        actualizar();
    });
}

let empresas = [];
function obtenerEmpresas(){
    fetch('../persistencia/empresa/empresa.php?accion=obtenerTodas')
    .then(response => response.text())
    .then(data => {
        //Pasamos datos a JSON
        const jsonData = JSON.parse(data);
        empresas = jsonData; // Guardamos productos
        actualizarEmpresa();
    });
}

function actualizarEmpresa() {
    $("#filas4").empty(); // Limpiar las filas anteriores

    // Generar filas para cada producto
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
    .then(response => response.json())  // Procesar la respuesta como JSON
    .then(data => {
        if (data.success) {
            alert('Empresa eliminada exitosamente');
            obtenerEmpresas();
            // Aquí puedes agregar el código para actualizar la interfaz, como eliminar la fila de la tabla
        } else {
            alert(data.error);  // Opcional: muestra el mensaje de error en una alerta
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });
}

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
    .then(response => response.json())  // Procesar la respuesta como JSON
    .then(data => {
        if (data.success) {
            alert('Usuario eliminado exitosamente');
            cargarDatosUsuario();
            // Aquí puedes agregar el código para actualizar la interfaz, como eliminar la fila de la tabla
        } else {
            alert(data.error);  // Opcional: muestra el mensaje de error en una alerta
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });
}

function buscarPorNombre() {
    let dato = $("#buscarUsuario1").val(); // Mantener 'dato'
    fetch(`../persistencia/usuario/usuario.php?dato=${dato}&accion=buscarPorNombre`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())  // Procesar la respuesta como JSON
    .then(data => {
        if (data.success) {
            usuarios = data.data;
            actualizarUsuarios();
            // Aquí puedes agregar el código para actualizar la interfaz, como eliminar la fila de la tabla
        } else {
            alert(data.error);  // Opcional: muestra el mensaje de error en una alerta
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });
}

function buscarPorNombreEmpresa() {
    let dato = $("#buscarEmpresa").val(); // Mantener 'dato'
    fetch(`../persistencia/empresa/empresa.php?dato=${dato}&accion=buscarPorNombre`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())  // Procesar la respuesta como JSON
    .then(data => {
        if (data.success) {
            empresas = data.data;
            actualizarEmpresa();
            // Aquí puedes agregar el código para actualizar la interfaz, como eliminar la fila de la tabla
        } else {
            alert(data.error);  // Opcional: muestra el mensaje de error en una alerta
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
    
    $("#filas").on("click", ".boton-eliminar", eliminarProducto); // Controlador de eventos que 
    $("#filas").on("click", ".boton-editar", mostrarDatos);   // responde a los clicks en cualquier elemento con la     
    $("#filas").on("click", ".boton-modificar", modificar);   // clase .boton-"accion" que esté dentro del elemento con id "filas".
    $("#filas").on("click", ".boton-cancelar", cancelar);   // clase .boton-"accion" que esté dentro del elemento con id "filas".
    $("#filas4").on("click", ".eliminarEmpresa", eliminarEmpresa);   // clase .boton-"accion" que esté dentro del elemento con id "filas".
    $("#filas3").on("click", ".eliminarUsuario", eliminarComprador);   // clase .boton-"accion" que esté dentro del elemento con id "filas".
    cargarCategorias();
    $("#formulario").submit(function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto    
    });

    $(document).on('click', '.modificarEmpresa', function () {
        $('#cuadroInformacion').fadeIn();
        $('body').addClass('modal-open');
        idUsuario = $(this).data("id");
        const empresa = empresas.find(empresa => Number(empresa.idEmpresa) === idUsuario); // Buscamos el producto

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
        const usuario = usuarios.find(usuario => Number(usuario.idUsuario) === idUsuario); // Buscamos el producto

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

    $('#enviarEmpresa').click(function() {
        $('#cuadroInformacionComprador').fadeOut();
        $('body').removeClass('modal-open');
    });

    $('#enviarComprador').click(function() {
        $('#cuadroInformacionComprador').fadeOut();
        $('body').removeClass('modal-open');
    });

    $("#nom").click(function (){
        let nombre = $("#nombreComprador").val();
        modificarUsuario(nombre, "nombre", "usuario");
    });
    $("#ape").click(function (){
        let apellido = $("#apellidoComprador").val();
        modificarUsuario(apellido, "apellido", "usuario");
    });
    $("#tel").click(function (){
        let telefono = $("#telefonoComprador").val();
        modificarUsuario(telefono, "telefono", "usuario");
    });
    $("#fech").click(function (){
        let fecha = $("#fechaComprador").val();
        modificarUsuario(fecha, "fechaNac", "usuario");
    });
    $("#mail").click(function (){
        let correo = $("#correoComprador").val();
        modificarUsuario(correo, "correo", "usuario");
    });

    ///////////////////////////////////////////////////
    $("#nomEm").click(function (){
        let nombre = $("#nombreEmpresa").val();
        modificarUsuario(nombre, "nombre", "empresa");
    });
    $("#rut").click(function (){
        let rut = $("#rutEmpresa").val();
        modificarUsuario(rut, "rut","empresa");
    });
    $("#nCuenta").click(function (){
        let nCuenta = $("#numeroCuenta").val();
        modificarUsuario(nCuenta, "numeroCuenta", "empresa");
    });
    $("#mail").click(function (){
        let correo = $("#correoEmpresa").val();
        modificarUsuario(correo, "correo", "empresa");
    });
    $("#tel").click(function (){
        let telefono = $("#telefonoEmpresa").val();
        modificarUsuario(telefono, "telefono","empresa");
    });
});

let idUsuario;
function modificarUsuario(dato, columna, tabla) {
    fetch('../persistencia/usuario/usuario.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            columna: columna, // Almacenamos el nombre de la columna a modificar
            dato: dato,
            accion: 'modificar',
            tabla: tabla,
            idUsuario: idUsuario
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
            cargarDatosUsuario();
            obtenerEmpresas();
        } else {
            alert("Error al modificar el dato: " + (data.error || ''));
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
        alert('Ocurrió un error: ' + error.message); // Muestra el error al usuario
    });
}

function buscarStock() {
    let stock = $("#buscarProducto").val();
    
    // Verificar si es un número válido
    if (isNaN(stock)) {
        alert("Debe ingresar un número!");
    } else {
        // Realizar la llamada fetch para buscar productos por stock
        fetch('../persistencia/producto/producto.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                stock: stock, 
                accion: "productoStock"  // Aquí defines la acción que será procesada en el backend
            })
        })
        .then(response => response.json())  // Procesar la respuesta como JSON
        .then(data => {
            // Verificar si la respuesta fue exitosa
            if (data.success) {
                productos = data.datos; // Una vez leido los datos acutalizamos
                actualizar();
            } else {
                console.error('Error al buscar el stock:', data.datos);
                alert(data.datos);  // Mostrar el mensaje de error en un alert
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

    $('.boton-editar').css("background-color", "rgb(230, 206, 27)"); // Cambia el color de fondo a rojo
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
    .then(response => response.json())  // Procesar la respuesta como JSON
    .then(data => {
        // Verificar si la respuesta fue exitosa
        if (data.success) {
            productos = data.datos; // Una vez leido los datos acutalizamos
            actualizar();
        } else {
            console.error('Error al buscar el producto:', data.datos);
            alert(data.datos);  // Mostrar el mensaje de error en un alert
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

    if(validacion(nombre, descripcion, precio)){
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
            } else {
                alert("Error: "+data.error);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error en la solicitud:', textStatus, errorThrown);
            $('#result').html('<p>Error al subir la imagen.</p>');
        }
    });
}else{
    alert("Hay campos erroneos");
}   
event.preventDefault(); // Evitar el envío del formulario por defecto
});


let categorias = [];
function cargarCategorias(){
    fetch('../persistencia/producto/producto.php?accion=categorias')
    .then(response => response.text())
    .then(data => {
        //Pasamos datos a JSON
        const jsonData = JSON.parse(data);
        categorias = jsonData; // Una vez leido los datos acutalizamos
        // Generamos categorias
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

// Función para generar las filas de la tabla
function actualizar() {
    $("#filas").empty(); // Limpiar las filas anteriores

    $("#nombre").val(''); // Limpiamos los campos (input)
    $("#descripcion").val('');
    $("#precio").val('');
    $("#stock").val('');

    // Generar filas para cada producto
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
        $("#filas").append(fila); // Agregamos fila que almacena los tr(table row) para generar la lineas
    }
    $(".boton-modificar").attr("disabled", "disabled"); // Deshabilitamos los botones "modificar".
    $(".boton-cancelar").attr("disabled", "disabled"); // Deshabilitamos los botones "modificar".
}


let idBoton; // Almacenaremos el id del producto
let index;  // Almacenaremos el indice del producto

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
    
    $("#nombre").css("border-color", "green"); // Cambiamos border color del input
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
    
    
    $('.boton-modificar[data-id="' + idBoton + '"]').removeAttr("disabled"); // Habilitamos el boton "Modificar"
    $('.boton-cancelar[data-id="' + idBoton + '"]').removeAttr("disabled"); // Habilitamos el boton "Modificar"
    
    $('.boton-editar').css("background-color", "#7a6713"); // Cambia el color de fondo a rojo
    $('.boton-eliminar').css("background-color", "#711512"); // Cambia el color de fondo a rojo
    $('.boton-modificar[data-id="' + idBoton + '"]').css("background-color", "#2ecc71"); // Cambia el color de fondo a rojo
    $('.boton-cancelar[data-id="' + idBoton + '"]').css("background-color", "#0a20e4"); // Cambia el color de fondo a rojo
    
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
    // Almacenmos los nuevos datos en las variables
    idBoton = $(this).data("id");

    let nombre = $("#nombre").val(); 
    let descripcion = $("#descripcion").val();
    let precio = Number($("#precio").val());
    let stock = Number($("#stock").val());

    if(validacion(nombre, descripcion, precio)){
         // Modificamos los datos del producto
        //Modificamos en BD
        modificarProducto(idBoton, nombre, descripcion, precio, stock); 

        actualizar();
        habilitarBotones();
        $(".boton-modificar").attr("disabled", "disabled");
    }else{
        alert("Los datos son erroneos");
    }
}

function validacion(nombre, descripcion, precio){
    if(verificarTexto(nombre)){
        $("#nombre").css("border-color", "red");
        return false;
    }
    $("#nombre").css("border-color", "#ccc");

    if(descripcion.length < 10 || descripcion.length > 20){
        $("#descripcion").css("border-color", "red");
        return false;
    }
    $("#descripcion").css("border-color", "#ccc");

    
    if(isNaN(precio) || precio < 1) {
        $("#precio").css("border-color", "red");
        return false;
    }
    $("#precio").css("border-color", "#ccc");

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
    .then(response => response.json())  // Procesar la respuesta como JSON
    .then(data => {
        if (data.success) {
            console.log('Producto eliminado exitosamente');
            eliminarFila(idProducto);
            // Aquí puedes agregar el código para actualizar la interfaz, como eliminar la fila de la tabla
        } else {
            alert(data.error);  // Opcional: muestra el mensaje de error en una alerta
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
            // El idCarrito o idUsuario no existe
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
            // El idCarrito o idUsuario no existe
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
        usuarios = jsonData; // Una vez leido los datos acutalizamos
        actualizarUsuarios();
    });
}

function actualizarUsuarios() {
    $("#filas3").empty(); // Limpiar las filas anteriores

    // Generar filas para cada producto
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