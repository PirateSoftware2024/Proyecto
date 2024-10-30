$(document).ready(function() {
    obtenerProductos();

    // ####################################################################################
    $("#productContainer").on("click", ".boton-modificar", function () {
    $('#cuadroInformacion').fadeIn();
    $('body').addClass('modal-open');
    $("#modificar").show();
    cargarCategorias();
    idProducto = Number($(this).data("id"));  // Convertimos el data-id a número
    datosEnInput(idProducto);
});

   $("#productContainer").on("click", ".boton-reseña", function() {
    $('#cuadroInformacion').fadeIn();
    $('body').addClass('modal-open');
    $("#infoProducto").show();
    const idBoton = Number($(this).data("id"));  // Convertimos el data-id a número
    obtenerReseñas(idBoton);
});

$("#productContainer").on("click", ".boton-eliminar", function() {
    let idProducto = $(this).data("id");
    eliminarProducto(idProducto);
    obtenerProductos();
});

$('#cerrarCuadro').click(function() {
        $('#cuadroInformacion').fadeOut();
        $('body').removeClass('modal-open');
        obtenerProductos();
        $("#modificar").hide();
        $("#infoProducto").hide();
});

//////////////////////////////////////////
$("#nom").click(function (){
    modificar("nombre", "nom");
});
$("#desc").click(function (){
    modificar("descripcion", "desc");
});
$("#prec").click(function (){
    modificar("precio", "prec");
});
$("#sto").click(function (){
    modificar("stock", "sto");
});
$("#ofe").click(function (){
    modificar("oferta", "ofe");
});
$("#cat").click(function (){
    modificar("categoria", "cat");
});
$("#condi").click(function (){
    modificar("condicion", "condi");
});
//////////////////////////////
$("#formulario").submit(function(event) {
    event.preventDefault();
    console.log("id del producto:" + idProducto);
    
    var formData = new FormData(this); 
    formData.append('accion', 'modificarImg');
    formData.append('id', idProducto);

    $.ajax({
        url: '../persistencia/producto/producto.php',
        type: 'POST',  // Cambiamos de PUT a POST
        data: formData,
        contentType: false,  // No establecer el tipo de contenido
        processData: false,  // No procesar los datos (FormData se encarga)
        success: function(data) {
            if (data.success) {
                alert("Dato modificado!");
                obtenerProductos();
            } else {
                alert("Error: " + data.error);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error en la solicitud:', textStatus, errorThrown);
            $('#result').html('Error al subir la imagen.');
        }
    });
});
});

function modificar(input, boton) {
    if($(`#${input}`).attr("disabled")){// Evalua el estado del boton
        $(`#${input}`).attr("disabled", false);// Habilita el boton
        $(`#${boton}`).text("Aceptar");// Cambia el texto del boton por "Aceptar"
    }else{
        $(`#${input}`).attr("disabled", true);
        $(`#${boton}`).text("Editar");
        tomarDato(input);
    }
}

// Función para tomar los datos del formulario
function tomarDato(input) {

    let dato = $(`#${input}`).val();
    modificarProducto(dato, input);
}

let idProducto;
function modificarProducto(dato, columna) {
    fetch('../persistencia/producto/producto.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            columna: columna, // Almacenamos el nombre de la columna a modificar
            dato: dato,
            id: idProducto,
            accion: "modificar"
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
        } else {
            alert("Error al modificar el dato: " + (data.error || ''));
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
        alert('Ocurrió un error: ' + error.message); // Muestra el error al usuario
    });
}

let products = [];
function obtenerProductos() {
    fetch('../persistencia/empresa/empresa.php?accion=obtenerDatos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los productos del servidor');
            }
            return response.text();
        })
        .then(data => {
            // Convertimos los datos a JSON
            const jsonData = JSON.parse(data);

            // Verificar si jsonData contiene un error
            if (jsonData.error) {
                alert(jsonData.error); // Mostrar el mensaje de error en un alert
                return; // Detenemos la ejecución
            }

            // Si no hay error, asignamos los productos y actualizamos
            products = jsonData;
            actualizar();
        })
        .catch(error => {
            console.error('Error de red o de servidor:', error.message);
        });
}


function actualizar(){
        // Generamos las tarjetas de productos
        $("#productContainer").html("");
        let pocoStock = false;
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            let productCard;
            if(product.stock <= 5){
                pocoStock = true;
                productCard = $(`
                <div class="product-card">
                    <div class="image-container">
                        <img src="../persistencia/assets/${product.file_path}">
                    </div>
                    <h3>${product.nombre}</h3>
                    <p>${product.descripcion}</p>
                    <p class="oferta-texto">Stock: ${product.stock}</p>
                    <div class="price">$${product.precio}</div>
                    <button class="boton-modificar" data-id="${product.id}"><i class="bi bi-check-circle"></i></button>
                    <button class="boton-reseña" data-id="${product.id}"><i class="bi bi-three-dots-vertical"></i></button>
                    <button class="boton-eliminar" data-id="${product.id}"><i class="bi bi-trash-fill"></i></button>
                </div>
                `);
            }else{
                productCard = $(`
                    <div class="product-card">
                        <div class="image-container">
                            <img src="../persistencia/assets/${product.file_path}">
                        </div>
                        <h3>${product.nombre}</h3>
                        <p>${product.descripcion}</p>
                        <div class="price">$${product.precio}</div>
                        <button class="boton-modificar" data-id="${product.id}"><i class="bi bi-check-circle"></i></button>
                        <button class="boton-reseña" data-id="${product.id}"><i class="bi bi-three-dots-vertical"></i></button>
                        <button class="boton-eliminar" data-id="${product.id}"><i class="bi bi-trash-fill"></i></button>
                    </div>
                    `);
            }
            $("#productContainer").append(productCard);
        }   
        if(pocoStock){
            alert('Algunos productos tienen un stock bajo (menor o igual a 5).\nSi su producto tiene stock 0 no será visible en el catálogo.');
        }
    }

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

function datosEnInput(idBoton){
    const producto = products.find(producto => Number(producto.id) === idBoton);

    $("#nombre").val(producto.nombre);
    $("#descripcion").val(producto.descripcion);
    $("#precio").val(producto.precio);
    $("#stock").val(producto.stock);
    $("#oferta").val(producto.oferta);
    $("#categoria").val(producto.categoria);
    $("#condicion").val(producto.condicion);
    //$("#boton").val(producto.nombre);
}

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
            let datos = data.error;
            reseñas = datos;
            verMas(idProducto);
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
}

let reseñas = [];
function verMas(idBoton){
    const producto = products.find(producto => Number(producto.id) === idBoton);
    let reseñasProducto = "<ul>";
    if(reseñas === 'Sin reseñas'){
        reseñasProducto = 'Sin reseñas';
    }else{
        // Con map convertimos cada elemento del array en una cadena html, y se convierte en un array de cadenas
        // Con join('') concatenamos todas las cadenas en un solo string
        reseñasProducto += reseñas.map(reseña => `<li>${reseña}</li>`).join('');
        reseñasProducto += "</ul>";
    }

    const $productCard = $(`
            <h2 style="text-align: center;">Reseñas producto</h2><br><br>
            <div class="reseñas"">${reseñasProducto}</div>
    `);
    $("#infoProducto").html($productCard);
}  

function eliminarProducto(idProducto) {
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