
let productos = [];
// Obtenemos productos de la BD
function cargarDatos(){
    fetch('../persistencia/obtenerProductos.php')
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
    $("#agregar").click(tomarDatos);
    $("#botonBuscarNombre").click(buscarProducto);
    $("#botonStock").click(buscarStock);
    $("#botonTodos").click(cargarDatos);
    $("#botonTodos2").click(cargarDatosPedido);
    $("#buscarPedido").click(pedidoBuscar);
    $("#botonFecha").click(buscarPorFecha);
    $("#botonUsuarioTodos").click(cargarDatosUsuario);
    $("#filas").on("click", ".boton-eliminar", eliminarProducto); // Controlador de eventos que 
    $("#filas").on("click", ".boton-editar", mostrarDatos);   // responde a los clicks en cualquier elemento con la     
    $("#filas").on("click", ".boton-modificar", modificar);   // clase .boton-"accion" que esté dentro del elemento con id "filas".
    $("#formulario").submit(function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto    
    });
});

function buscarStock(){
    let stock = $("#buscarProducto").val();
    if(isNaN(stock)){
        alert("Debe ingresar un numero!");
    }else{
    fetch('../persistencia/buscarPorStock.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stock: stock })
    })
    .then(response => response.text())
    .then(data => {
        console.log('Datos recibidos:', data);
        //Pasamos datos a JSON
        const jsonData = JSON.parse(data);

        console.log('Datos JSON:', jsonData);
        productos = jsonData; // Una vez leido los datos acutalizamos
        actualizar();
    });
}
}

function buscarProducto(){
    let nombre = $("#buscarProducto").val();

    fetch('../persistencia/buscarPorNombre.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: nombre })
    })
    .then(response => response.text())
    .then(data => {
        console.log('Datos recibidos:', data);
        //Pasamos datos a JSON
        const jsonData = JSON.parse(data);

        console.log('Datos JSON:', jsonData);
        productos = jsonData; // Una vez leido los datos acutalizamos
        actualizar();
    });
}
// Función para agregar un producto
function agregar(nombre, descripcion, precio) {
    // Utilizamos push para agregar nuevos productos
    fetch('../persistencia/agregarProducto.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre: nombre,
            descripcion: descripcion,
            precio: precio
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Si el producto se agregó correctamente, actualizar la lista
        cargarDatos();
        } else {
            console.error('Error al agregar el producto:', data.error);
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });
}


// Función para tomar los datos del formulario
function tomarDatos() {
    let nombre = $("#nombre").val();
    let descripcion = $("#descripcion").val();
    let precio = Number($("#precio").val());

    if(validacion(nombre, descripcion, precio)){
        // Llamamos a la funcion agregar y agregamos sus atributos
        agregar(nombre, descripcion, precio); 
    }else{
        alert("Hay campos erroneos");
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
                </td>
            </tr>
        `);
        $("#filas").append(fila); // Agregamos fila que almacena los tr(table row) para generar la lineas
    }
    $(".boton-modificar").attr("disabled", "disabled"); // Deshabilitamos los botones "modificar".
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

    $('.boton-modificar[data-id="' + idBoton + '"]').removeAttr("disabled"); // Habilitamos el boton "Modificar"
}   



function cancelarBotones(){
    $(".boton-eliminar").attr("disabled", "disabled");
    $(".boton-editar").attr("disabled", "disabled");
    $("#agregar").attr("disabled", "disabled");
}

function habilitarBotones(){
    $(".boton-eliminar").removeAttr("disabled", "disabled");
    $(".boton-editar").removeAttr("disabled", "disabled");
    $("#agregar").removeAttr("disabled", "disabled");
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
    $("#nombre").css("border-color", "black");

    if(descripcion.length < 10 || descripcion.length > 20){
        $("#descripcion").css("border-color", "red");
        return false;
    }
    $("#descripcion").css("border-color", "black");

    
    if(isNaN(precio) || precio < 1) {
        $("#precio").css("border-color", "red");
        return false;
    }
    $("#precio").css("border-color", "black");
    
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
    fetch('../persistencia/eliminarProducto.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: idProducto })
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
    fetch('../persistencia/modificarProducto.php', {
        method: 'POST',
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
    })
    .catch(error => {
        alert('Ocurrió un error inesperado al intentar modificar el producto.');
    });
}

function buscarPorFecha(){
    let fecha = $("#fechaPedido").val();
    fetch('../persistencia/obtenerPedidoFecha.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fecha : fecha
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
    fetch('../persistencia/buscarPedido.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            dato : dato
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
    fetch('../persistencia/obtenerPedidos.php')
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
    fetch('../persistencia/obtenerDatosUsuario.php')
    .then(response => response.text())
    .then(data => {
        console.log('Datos recibidos:', data);
        //Pasamos datos a JSON
        const jsonData = JSON.parse(data);

        console.log('Datos JSON:', jsonData);
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
                <td>${usuario.password}</td>
                <td>${usuario.fechaNac}</td>
                <td>
                <button class="boton-eliminar-usuario" data-id="${usuario.idUsuario}">Eliminar</button>
                <button class="boton-editar-usuario" data-id="${usuario.idUsuario}">Editar</button>
                <button class="boton-modificar-usuario" data-id="${usuario.idUsuario}">Modificar</button>
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
    fetch('../persistencia/obtenerUsuariosAValidar.php')
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
                <td>${usuario.idUsuario}</td>
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
    console.log("Entreeeee");
    let opcion = $("#selectValidacion").val();
    let idUsuario = $(this).data("id");

    // Enviar los datos al archivo PHP
    fetch('../persistencia/validarUsuario.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: idUsuario,
            opcion: opcion
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