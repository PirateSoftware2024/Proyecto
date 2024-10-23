$(document).ready(function() {
    obtenerVentas();
    obtenerProductos();
    cargarCategorias();


    $("#filasProductos").on("click", ".boton-editar", redirigir);
    $("#filasProductos").on("click", ".boton-modificar", modificar);
    $("#filasProductos").on("click", ".boton-eliminar", eliminarProducto);
    $("#actualizarProductos").click(obtenerProductos);

    // ####################################################################################
    $("#filasProductos").on("click", ".boton-reseña", function () {
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
        formData.append('accion', 'agregar'); // Agregar el parámetro 'accion' para que entre en el switch
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
    });


   // Cambia el event listener para la clase
    $(document).on('change', '.cambioEstado', function() {
        const valor = $(this).val();
        const idPaquete = $(this).data('id'); //Este id sera necesario para modificar el dato en la tabla detalle_pedido

        if (valor == "cancelado"){
            modificarEstado(idPaquete, "Cancelado"); // Llama a tu función para actualizar
        }else if(valor == "enviado"){
            modificarEstado(idPaquete, "Enviado a depósito");
        }else if(valor == "preparacion"){
            modificarEstado(idPaquete, "En preparación");
        }else{
            alert("Error al seleccionar una opcion!");
        }
    });
});

function modificarEstado(idPaquete, valor) {
    fetch('../persistencia/empresa/empresa.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            id: idPaquete,  // Asegúrate de que estás pasando el ID correcto
            valor: valor
        })
    })
    .then(response => response.json())  // Parsear la respuesta como JSON
    .then(data => {
        if (data.success) {
            alert(data.message);  // Mostrar mensaje en caso de éxito
            location.reload();
        } else {
            console.error('Error del servidor:', data.message);  // Mostrar error en consola
        }
    })
    .catch(error => {
        console.error('Error al modificar el estado:', error);  // Manejar errores de la solicitud
    });
}


let datosVentas;
function obtenerVentas(){
    fetch('../persistencia/empresa/empresa.php?accion=obtenerVentas')
    .then(response => response.text())
    .then(data => {
        //Pasamos datos a JSON
        const jsonData = JSON.parse(data);
        datosVentas = jsonData;
        ventas(datosVentas);
    });
}

let datosProductos = [];
function obtenerProductos(){
    fetch('../persistencia/empresa/empresa.php?accion=obtenerDatos')
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
                <td><img src="../persistencia/assets/${producto.file_path}" width=50 height=50></td>
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
    let estados = {
        "enviado": "Enviado a depósito",
        "cancelado": "Cancelado",
        "preparacion": "En preparación"
    };

    $("#filasVentas").empty(); // Limpiar las filas anteriores

    for (let i = 0; i < ventas.length; i++) {
        const venta = ventas[i];

        // Copiar el objeto estados para modificarlo por cada venta
        let estadosCopia = { ...estados };

        // Obtener el estado actual de la venta
        let estadoActual = venta.estado_preparacion;

        // Eliminar el estado actual del select
        for (let clave in estadosCopia) {
            if (estadosCopia[clave] === estadoActual) {
                delete estadosCopia[clave];
                break;
            }
        }

        // Crear el string de opciones para el select
        let selectEstados = `<option value="${estadoActual}" disabled selected>${estadoActual}</option>`;
        for (let clave in estadosCopia) {
            selectEstados += `<option value="${clave}">${estadosCopia[clave]}</option>`;
        }

        // Crear la fila y añadirla a la tabla
        let fila = $(`
            <tr>
                <td>${venta.idCarrito}</td>
                <td>${venta.idPaquete}</td>
                <td>${venta.nombre}</td>
                <td>${venta.idProducto}</td>
                <td>${venta.fecha}</td>
                <td>${venta.cantidad}</td>
                <td>${venta.total}</td>
                <td>
                    <select class="cambioEstado" data-id="${venta.id}">
                        ${selectEstados}
                    </select>
                </td>
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
    productos();
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
    let idProducto = $(this).data("id");
    fetch('../persistencia/producto/producto.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            id: idProducto,
            accion: "producto"  // Asegúrate de incluir la clave 'accion'
        })
    })
    .then(response => response.text())  // Cambia a .text() temporalmente para ver la respuesta cruda
    .then(data => {
        console.log(data);  // Verificar la respuesta sin procesar
        try {
            const jsonData = JSON.parse(data);  // Convertir a JSON si es válido
            if (jsonData.success) {
                alert('Producto eliminado exitosamente');
                eliminarFila(idProducto);
            } else {
                alert(jsonData.error);
            }
        } catch (error) {
            console.error('Error al procesar la respuesta como JSON:', error);
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
            datosProductos[index].nombre = nombre;
            datosProductos[index].descripcion = descripcion;
            datosProductos[index].precio = precio;
            obtenerProductos();
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
    fetch('../persistencia/producto/producto.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: idProducto,
            accion: "reseñasProducto"
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