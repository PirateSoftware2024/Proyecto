
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

/* Asegura que el código dentro de la función 
   se ejecutará solo después de que el DOM 
   del documento esté completamente cargado
*/
$(document).ready(function() {
    $("#filas4").on("click", ".opcionValidar", subirValidacion);
    $("#botonValidar").click(validar);

    //$("#agregar").click(tomarDatos);
    $("#botonBuscarNombre").click(buscarProducto);
    $("#botonStock").click(buscarStock);
    $("#botonTodos").click(cargarDatos);
    $("#botonTodos2").click(cargarDatosPedido);
    $("#buscarPedido").click(pedidoBuscar);
    $("#botonFecha").click(buscarPorFecha);
    $("#botonUsuarioTodos").click(cargarDatosUsuario);
    $("#filas5").on("click", ".boton-eliminar-reseña", eliminarReseña);
    $("#botonReseñas").click(cargarDatosReseñas);
    $("#filas").on("click", ".boton-eliminar", eliminarProducto); // Controlador de eventos que 
    $("#filas").on("click", ".boton-editar", mostrarDatos);   // responde a los clicks en cualquier elemento con la     
    $("#filas").on("click", ".boton-modificar", modificar);   // clase .boton-"accion" que esté dentro del elemento con id "filas".
    $("#filas").on("click", ".boton-cancelar", cancelar);   // clase .boton-"accion" que esté dentro del elemento con id "filas".
    cargarCategorias();
    $("#formulario").submit(function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto    
    });
});

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
    var formData = new FormData(this); // Crear un nuevo FormData con el formulario
    formData.append('accion', 'agregar'); // Agregar el parámetro 'accion' para que entre en el switch
    formData.append('idEmpresa', '9'); // Agregar el parámetro 'accion' para que entre en el switch
    //let nom = $("#nom").val();
    //let desc = $("#desc").val();
    $.ajax({
        url: '../persistencia/producto/producto.php',
        type: 'POST',
        data: formData,
        contentType: false, // No establecer el tipo de contenido
        processData: false, // No procesar los datos (FormData se encarga)
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

    // Seteamos datos del producto en los input
    $("#nombre").val(productos[index].nombre);
    $("#descripcion").val(productos[index].descripcion);
    $("#precio").val(productos[index].precio);
    
    $("#categoria").val(productos[index].nombre).prop('disabled', true);
    $("#oferta").val(productos[index].descripcion).prop('disabled', true);
    $("#imagen").prop('disabled', true);
    $("#condicion").val(productos[index].condicion).prop('disabled', true);
    
    
    $('.boton-modificar[data-id="' + idBoton + '"]').removeAttr("disabled"); // Habilitamos el boton "Modificar"
    $('.boton-cancelar[data-id="' + idBoton + '"]').removeAttr("disabled"); // Habilitamos el boton "Modificar"
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

    if(validacion(nombre, descripcion, precio)){
         // Modificamos los datos del producto
        //Modificamos en BD
        modificarProducto(idBoton, nombre, descripcion, precio); 

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


function modificarProducto(idProducto, nombre, descripcion, precio) {
    fetch('../persistencia/producto/producto.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: idProducto,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Si la modificación fue exitosa
            alert("Producto modificado con éxito");
            productos[index].nombre = nombre;
            productos[index].descripcion = descripcion;
            productos[index].precio = precio;
            
            // Puedes actualizar la interfaz aquí si es necesario
        } else {
            // Si hubo un error en la modificación
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

let pedidos = [];
function cargarDatosPedido(){
    fetch('../persistencia/pedidos/pedidos.php')
    .then(response => response.text())
    .then(data => {
        //Pasamos datos a JSON
        const jsonData = JSON.parse(data);
        pedidos = jsonData; // Una vez leido los datos acutalizamos
        actualizarPedidos();
    });
}
function actualizarPedidos() {
    $("#filas2").empty(); // Limpiar las filas anteriores

    //$("#buscarProducto").val(''); // Limpiamos los campos (input)
    //$("#fechaPedido").val('');

    // Generar filas para cada producto
    for (let i = 0; i < pedidos.length; i++) {
        const pedido = pedidos[i];
        let fila = $(`
            <tr>
                <td>${pedido.idCarrito}</td>
                <td>${pedido.idUsuario}</td>
                <td>${pedido.fecha}</td>
                <td>${pedido.cantidadProductos}</td>
                <td>${pedido.precioTotal}</td>
                <td>${pedido.idPaquete}</td>
                <td>
                <button class="boton-eliminar" data-id="${pedido.idCarrito}">Eliminar</button>
                <button class="boton-editar" data-id="${pedido.idCarrito}">Editar</button>
                <button class="boton-modificar" data-id="${pedido.idCarrito}">Modificar</button>
                </td>
            </tr>
        `);
        $("#filas2").append(fila); // Agregamos fila que almacena los tr(table row) para generar la lineas
    }
    $(".boton-modificar").attr("disabled", "disabled"); // Deshabilitamos los botones "modificar".
    //let productosJSON = JSON.stringify(productos);      // Convertimos el array productos en
    //localStorage.setItem('productos', productosJSON);   // JSON para setearlo en el localStorage con el nick "productos"
}

let usuarios = [];
function cargarDatosUsuario(){
    fetch('../persistencia/usuario/usuario.php?accion=obtenerUsuarios')
    .then(response => response.text())
    .then(data => {
        console.log('Datos recibidos:', data);
        //Pasamos datos a JSON
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
                <button class="boton-eliminar" data-id="${usuario.idUsuario}">Eliminar</button>
                </td>
            </tr>
        `);
        $("#filas3").append(fila); // Agregamos fila que almacena los tr(table row) para generar la lineas
    }
    $(".boton-modificar").attr("disabled", "disabled"); // Deshabilitamos los botones "modificar".
    //let productosJSON = JSON.stringify(productos);      // Convertimos el array productos en
    //localStorage.setItem('productos', productosJSON);   // JSON para setearlo en el localStorage con el nick "productos"
}

let usuariosParaValidar = [];
function validar(){
    fetch('../persistencia//usuario/usuario.php?accion=usuariosValidar')
    .then(response => response.text())
    .then(data => {
        console.log('Datos recibidos:', data);
        //Pasamos datos a JSON
        const jsonData = JSON.parse(data);

        console.log('Datos JSON:', jsonData);
        usuariosParaValidar = jsonData; // Una vez leido los datos acutalizamos
        usuariosValidar();
    });
}

function usuariosValidar() {
    $("#filas4").empty(); // Limpiar las filas anteriores
    for (let i = 0; i < usuariosParaValidar.length; i++) {
        const usuario = usuariosParaValidar[i];
        let fila = $(`
            <tr>
                <td>${usuario.nombre}</td>
                <td>${usuario.apellido}</td>
                <td>${usuario.telefono}</td>
                <td>${usuario.correo}</td>
                <td>${usuario.fechaNac}</td>
                <td>
                    <select id="selectValidacion">
                        <option value="Si">Si</option>
                        <option value="No">No</option>
                    </select>
                </td>
                <td><button class="opcionValidar" data-id=${usuario.idUsuario}>Validar</button></td>
            </tr>
    `);
        $("#filas4").append(fila);
    }
}

function subirValidacion() {
    // Obtener la opción seleccionada y el idUsuario del botón
    let opcion = $("#selectValidacion").val();
    let idUsuario = $(this).data("id");

    // Enviar los datos al archivo PHP
    fetch('../persistencia/usuario/usuario.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            idUsuario: idUsuario,
            opcion: opcion,
            accion: "validar"
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Datos recibidos del servidor:', data);
        if (data.success) {
            alert('Validación exitosa');
            $("#filas4").empty();
        } else {
            alert('Error: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error al enviar los datos:', error);
    });
}

// Reseñas
let reseñas = [];
function cargarDatosReseñas(){
    fetch('../persistencia/producto/producto.php?accion=reseñas')
    .then(response => response.text())
    .then(data => {
        //Pasamos datos a JSON
        const jsonData = JSON.parse(data);
        console.log(jsonData);
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