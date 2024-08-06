/* Array para almacenar los productos.
   Busca en el localStorage si exite el item "productos" 
   lo convierte en JSON y lo almacena, de lo contrario crea un array productos
*/
let productos = [];
function buscarDatos(){
    fetch('../persistencia/obtenerProductos.php')
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

/* Asegura que el código dentro de la función 
   se ejecutará solo después de que el DOM 
   del documento esté completamente cargado
*/
$(document).ready(function() {
    $("#agregar").click(tomarDatos);
    $("#botonBuscar").click(buscarProducto);
    $("#botonTodos").click(buscarDatos);
    $("#filas").on("click", ".boton-eliminar", eliminarFila); // Controlador de eventos que 
    $("#filas").on("click", ".boton-editar", mostrarDatos);   // responde a los clicks en cualquier elemento con la     
    $("#filas").on("click", ".boton-modificar", modificar);   // clase .boton-"accion" que esté dentro del elemento con id "filas".
    $("#formulario").submit(function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto    
    });
});

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
function agregar(id, nombre, descripcion, precio) {
    // Utilizamos push para agregar nuevos productos
    productos.push({ id: id, nombre: nombre, descripcion: descripcion, precio: precio });
    actualizar();
}

function validacion(nombre, descripcion, precio){
    if(verificarTexto(nombre)){
        $("#nombre").css("border-color", "red");
        return false;
    }
    $("#nombre").css("border-color", "black");

    if(descripcion.length > 50){
        $("#descripcion").css("border-color", "red");
        return false;
    }
    $("#descripcion").css("border-color", "black");

    if (isNaN(precio) || precio < 1) {
        $("#precio").css("border-color", "red");
        return false;
    }
    $("#precio").css("border-color", "black");
    
    return true;
}

// Función para tomar los datos del formulario
function tomarDatos() {
    let nombre = $("#nombre").val();
    let descripcion = $("#descripcion").val();
    let precio = Number($("#precio").val());

    if(validacion(nombre, descripcion, precio)){
        // Llamamos a la funcion agregar y agregamos sus atributos
        let id = generarId();
        agregar(id, nombre, descripcion, precio); 
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
    //let productosJSON = JSON.stringify(productos);      // Convertimos el array productos en
    //localStorage.setItem('productos', productosJSON);   // JSON para setearlo en el localStorage con el nick "productos"
}

let idBoton; // Almacenaremos el id del producto
let index;  // Almacenaremos el indice del producto

function eliminarFila(){
    idBoton = $(this).data("id"); // Guardamos el id del producto utilizando data(atributo personalizado)

    // Busca en el array productos un producto que tenga el mismo id y guarda su indice
    index = productos.findIndex(producto => Number(producto.id) === idBoton);
    //Pasamos producto.id a numero ya que viene como texto
    // Eliminamos producto
    productos.splice(index, 1);
    eliminarProducto(idBoton);
    /* Ejemplo: 
    Queremos eliminar el producto con id 3:
    id=1, 2, 3, 4, 5 => El indice del 3 es 2 =>
    Por ende eliminara 1 elemento a partir del incice 2 =>
    productos.splice(2, 1); */ 
    
    // Actualizar localStorage
    //let productosJSON = JSON.stringify(productos);
    //localStorage.setItem('productos', productosJSON);
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

function modificar(){
    // Almacenmos los nuevos datos en las variables
    idBoton = $(this).data("id");
    let nombre = $("#nombre").val(); 
    let descripcion = $("#descripcion").val();
    let precio = Number($("#precio").val());

    if(validacion(nombre, descripcion, precio)){
         // Modificamos los datos del producto
        productos[index].nombre = nombre;
        productos[index].descripcion = descripcion;
        productos[index].precio = precio;
        
        //Modificamos en BD
        modificarProducto(idBoton, nombre, descripcion, precio); 

        actualizar();
        habilitarBotones();
        $(".boton-modificar").attr("disabled", "disabled");
    }else{
        alert("Los datos son erroneos");
    }
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

function generarId(){
    let id; // Almacenaremos el id del producto 
    if(productos.length > 0){
        id = productos[productos.length -1].id + 1; // Obtenemos el id del ultimo producto agregado
    }else{
        id = 1; // Asigna 1 si el array está vacío  
    }
    return id;
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

function eliminarProducto(idProducto) {
    fetch('../persistencia/eliminarProducto.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: idProducto })
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });
}

function modificarProducto(idProducto, nombre, descripcion, precio) {
    console.log("Se ha enviado");
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
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });
}