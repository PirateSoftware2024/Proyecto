$(document).ready(function() {
    obtenerVentas();
    obtenerProductos();
    cargarCategorias();


    $("#filasProductos").on("click", ".boton-editar", redirigir);
    $("#filasProductos").on("click", ".boton-modificar", modificar);
    $("#actualizarProductos").click(obtenerProductos);

    // ####################################################################################
    $("#filasProductos").on("click", ".boton-reseña", function () {
        console.log("Holaa");
        $('#cuadroInformacion').fadeIn();
        $('body').addClass('modal-open');
        let idBoton = Number($(this).data("id"));  // Convertimos el data-id a número
        obtenerReseñas(idBoton);
    });

    $('#cerrarCuadro').click(function() {
        $('#cuadroInformacion').fadeOut();
        $('body').removeClass('modal-open');
    });
    
    $('#uploadForm').on('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        var formData = new FormData(this); // Crear un nuevo FormData con el formulario
        //let nom = $("#nom").val();
        //let desc = $("#desc").val();
        console.log(formData+"  Aca esta");
        $.ajax({
            url: '../persistencia/agregarProducto.php',
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
    });
});

function obtenerVentas(){
    fetch('../persistencia/ventasEmpresa.php')
    .then(response => response.text())
    .then(data => {
        //Pasamos datos a JSON
        const jsonData = JSON.parse(data);
        const datosVentas = jsonData;
        ventas(datosVentas);
    });
}

let datosProductos = [];
function obtenerProductos(){
    fetch('../persistencia/obtenerProductosEmpresa.php')
    .then(response => response.text())
    .then(data => {
        //Pasamos datos a JSON
        const jsonData = JSON.parse(data);
        datosProductos = jsonData;
        productos();
    });
}


function productos(){
    $("#filasProductos").empty(); // Limpiar las filas anteriores
    for (let i = 0; i < datosProductos.length; i++) {
        const producto = datosProductos[i];
        let fila = $(`
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.precio}</td>
                <td>${producto.stock}</td>
                <td>${producto.oferta}</td>
                <td>${producto.condicion}</td>
                <td>${producto.categoria}</td>
                <td><img src="${producto.file_path}" width=50 height=50></td>
                <td>
                    <button class="boton-eliminar" data-id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
                    <button class="boton-editar" data-id="${producto.id}"><i class="bi bi-pencil-fill"></i></button>
                    <button class="boton-modificar" data-id="${producto.id}" disabled><i class="bi bi-check-circle"></i></button>
                    <button class="boton-reseña" data-id="${producto.id}"><i class="bi bi-three-dots-vertical"></i></button>
                </td>
            </tr>
    `);
        $("#filasProductos").append(fila);
    }
    $(".boton-modificar").attr("disabled", "disabled"); // Deshabilitamos los botones "modificar".
}

function ventas(ventas){
$("#filasVentas").empty(); // Limpiar las filas anteriores
for (let i = 0; i < ventas.length; i++) {
    const venta = ventas[i];
    let fila = $(`
        <tr>
            <td>${venta.idCarrito}</td>
            <td>${venta.nomUsuario}</td>
            <td>${venta.nomProducto}</td>
            <td>${venta.cantidad}</td>
            <td>${venta.total}</td>
            <td>${venta.idPaquete}</td>
            <td>${venta.fecha}</td>
        </tr>
`);
    $("#filasVentas").append(fila);
}
}
/*
SELECT c.idCarrito, u.nombre, p.nombre, a.cantidad, a.cantidad * a.precio Total, c.idPaquete, c.fecha
FROM almacena a
JOIN producto p ON p.id = a.id
JOIN carrito c ON c.idCarrito = a.idCarrito
JOIN usuario u ON u.idUsuario = c.idUsuario
WHERE c.estadoCarrito = 'Confirmado' AND idEmpresa = 1;
*/

let categorias = [];
function cargarCategorias(){
    fetch('../persistencia/obtenerCategorias.php')
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

function redirigir() {
    const loader = document.getElementById('modificar'); // Obtenemos el elemento
    loader.style.display = 'block'; // Mostramos
    // Esperar 2 segundos antes de redirigir
    idBoton = $(this).data("id");
    index = datosProductos.findIndex(producto => Number(producto.id) === idBoton);
    mostrarDatos();
}


let idBoton; // Almacenaremos el id del producto
let index;  // Almacenaremos el indice del producto

function eliminarFila(idBoton){
    index = datosProductos.findIndex(producto => Number(producto.id) === idBoton);
    datosProductos.splice(index, 1);
    actualizar();
}

function mostrarDatos(){
    //Cancelamos botones
    cancelarBotones();
    $("#nombreProducto").css("border-color", "green"); // Cambiamos border color del input
    $("#descripcionProducto").css("border-color", "green");
    $("#precioProducto").css("border-color", "green");

    // Seteamos datos del producto en los input
    $("#nombreProducto").val(datosProductos[index].nombre);
    $("#descripcionProducto").val(datosProductos[index].descripcion);
    $("#precioProducto").val(datosProductos[index].precio);

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
    let nombre = $("#nombreProducto").val(); 
    let descripcion = $("#descripcionProducto").val();
    let precio = Number($("#precioProducto").val());

    if(validacion(nombre, descripcion, precio)){
         // Modificamos los datos del producto
        //Modificamos en BD
        modificarProducto(idBoton, nombre, descripcion, precio); 

        productos();
        habilitarBotones();
        $(".boton-modificar").attr("disabled", "disabled");
    }else{
        alert("Los datos son erroneos");
    }
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
            datosProductos[index].nombre = nombre;
            datosProductos[index].descripcion = descripcion;
            datosProductos[index].precio = precio;
            // Puedes actualizar la interfaz aquí si es necesario
        } else {
            // Si hubo un error en la modificación
            alert(data.error);
        }
    })
    .catch(error => {
        alert('Ocurrió un error inesperado al intentar modificar el producto.');
    });
    const loader = document.getElementById('modificar');
    loader.style.display = 'none'; // "Deshabilitamos" el section para que no este visible  
}

function validacion(nombre, descripcion, precio){
    if(verificarTexto(nombre)){
        $("#nombreProducto").css("border-color", "red");
        return false;
    }
    $("#nombreProducto").css("border-color", "black");

    if(descripcion.length < 10 || descripcion.length > 20){
        $("#descripcionProducto").css("border-color", "red");
        return false;
    }
    $("#descripcionProducto").css("border-color", "black");

    
    if(isNaN(precio) || precio < 1) {
        $("#precioProducto").css("border-color", "red");
        return false;
    }
    $("#precioProducto").css("border-color", "black");
    
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


let reseñas = [];
function obtenerReseñas(idProducto){
    fetch('../persistencia/obtenerReseñas.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: idProducto
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            let datos = data.reseñas;
            reseñas = datos;
            verMas(idProducto);
        } else {
            console.error('Error:', data.error);
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
}

function verMas(idBoton){
    const producto = datosProductos.find(producto => Number(producto.id) === idBoton);
    
    let reseñasProducto = "<ul>";
    // Con map convertimos cada elemenot del array en una cadena html, y se convierte en un array de cadenas
    // Con join('') concatenamos todas las cadenas en un solo string
    reseñasProducto += reseñas.map(reseña => `<li>${reseña}</li>`).join('');
    reseñasProducto += "</ul>";

    const $productCard = $(`
            <div class="reseñas">${reseñasProducto}</div>
    `);
    $("#infoProducto").html($productCard);
}   