let products = [];
let categorias = [];

function cargarDatos(){
    fetch('../persistencia/producto/producto.php?accion=productos')
    .then(response => response.text())
    .then(data => {
        //Pasamos datos a JSON
        const jsonData = JSON.parse(data);
        products = jsonData; // Una vez leido los datos acutalizamos
        actualizar();
    });
}

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
        const $categoriaButton = $(`<button class="nav-button" data-id="${categoria.nombre}">${categoria.nombre}</button>`);
        $(".navbar").append($categoriaButton);
    }
}
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-menu').classList.toggle('active');
});

function buscar() {
    const nombre = $("#buscarProducto").val();
    fetch(`../persistencia/producto/producto.php?accion=buscar&dato=${nombre}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.text())
    .then(data => {
        // Pasamos datos a JSON
        const jsonData = JSON.parse(data);

        // Verificamos si no hay productos
        if (jsonData === false) {
            alert('No hay productos disponibles.'); // Mostrar alerta si no hay productos
        } else {
            
            products = jsonData; // Una vez leído los datos, actualizamos
            actualizar(); // Asegúrate de que esta función esté definida
        }
    })
    .catch(error => {
        console.error('Error al buscar el producto:', error);
    });
}

function buscarProductosCategoria(){
    const nombre = $(this).data("id");
    fetch('../persistencia/producto/producto.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            nombre: nombre, 
            accion: "productoCategoria"
        })
    })
    .then(response => response.text())
    .then(data => {
        //Pasamos datos a JSON
        const jsonData = JSON.parse(data);

        
        products = jsonData; // Una vez leido los datos acutalizamos
        actualizar();
    });
}

/////////////////////////////////////////////////////////////
function pantallaCarga() {
    const loader = document.getElementById('loader'); // Obtenemos el elemento
    loader.style.display = 'flex'; // Mostramos
    // Convertir el carrito actual a JSON y guardar en localStorage
    carrito = [];
    const productosJSON = JSON.stringify(carrito);
    localStorage.setItem('carrito', productosJSON);
    setTimeout(function() {
    window.location.href = "../interfaz/logout.php";
        }, 2000);
}
/////////////////////////////////////////////////////////////

$(document).ready(function() {
    obtenerOferta();
    cargarCategorias(); //Obtenemos categorias de la BD
    cargarDatos(); // Obtenemos productos de la BD
    nuevoCarrito();// Verificamos si el usuario tiene un  carrito "Pendiente", si es asi obtenemos los productos
    $("#salir").click(pantallaCarga);
    $("#productContainer").on("click", ".boton-producto", añadir);
    $("#cuadroInformacion").on("click", ".boton-producto", añadir);
    $("#productContainer").on("click", ".boton-reseña", function() {
        $('#cuadroInformacion').fadeIn();
        $('body').addClass('modal-open');
        const idBoton = Number($(this).data("id"));  // Convertimos el data-id a número
        obtenerReseñas(idBoton);
    });

    $("#nav-bar").on("click", ".nav-button", buscarProductosCategoria);
    $("#btnBuscar").click(buscar);

    $("#right-arrow").on("click", function() {
        $(".navbar").animate({scrollLeft: '+=150px'}, 300);
    });
    
    $("#left-arrow").on("click", function() {
        $(".navbar").animate({scrollLeft: '-=150px'}, 300);
    });
    
    // Cuadro ver mas
    $('#cerrarCuadro').click(function() {
        $('#cuadroInformacion').fadeOut();
        $('body').removeClass('modal-open');
    });

    $("#productosVistos").click(productosVistos);
});

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

function productosVistos() {
    fetch('../persistencia/producto/producto.php?accion=obtenerProductosVistos', {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => { 
        if (data.success) {
            products = data.resultados;
            actualizar();
        } else {
            alert(data.message); // Muestra un mensaje si no hay productos vistos
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
}


let reseñas = [];
function verMas(idBoton){
    fetch('../persistencia/producto/producto.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: idBoton,
            accion: "productoVisto"
        })
    });

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
            <div class="image-container">
                <img src="../persistencia/assets/${producto.file_path}" width=150 heigth=150>
            </div>
            <div class="reseñas">${reseñasProducto}</div>
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <div class="price">$${producto.precio}</div>
            <button class="boton-producto" data-id="${producto.id}">Añadir al carrito</button>
    `);
    $("#infoProducto").html($productCard);
}   

///////////////////////////////
// Funcion para obtener y calcular ofertas
let oferta;
function obtenerOferta(){
    fetch('../persistencia/ofertas/ofertas.php?accion=obtener')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta de la red');
        }
        return response.json();
    })
    .then(jsonData => {
        if (jsonData.success) {
            oferta = jsonData.result.descuento;
            localStorage.setItem('oferta', oferta);
        }
    })
    .catch(error => {
        localStorage.removeItem('oferta');
    });
}
/////////////////////////////

function actualizar(){
    if(products.length < 1){
        alert("No hay productos...");
    }else{
        // Generamos las tarjetas de productos
        $("#productContainer").html("");
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            let productCard;
            if(product.oferta == "Si" && oferta){
                productCard = $(`
                    <div class="product-card">
                        <div class="image-container">
                            <img src="../persistencia/assets/${product.file_path}">
                        </div>
                        <h3>${product.nombre}</h3>
                        <p>${product.descripcion}</p>
                        <p class="oferta-texto">Oferta %${oferta}</p>
                        <div class="price">$${product.precio}</div>
                        <button class="boton-producto" data-id="${product.id}">Añadir al carrito</button>
                        <button class="boton-reseña" data-id="${product.id}">Ver más</button>
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
                        <button class="boton-producto" data-id="${product.id}">Añadir al carrito</button>
                        <button class="boton-reseña" data-id="${product.id}">Ver más</button>
                    </div>
                `);
            }
            $("#productContainer").append(productCard);
        }   
    }
}


function nuevoCarrito() {
    fetch('../persistencia/carrito/carrito.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Guardar los datos en el localStorage
            const productosJSON = JSON.stringify(data.productos);
            localStorage.setItem('carrito', productosJSON);
        } else {
            console.error('Error:', data.error);
        }
    })
    .catch(error => {
        
    });
}


let carrito = [];
/*function obtenerProductosCarrito(){
    fetch('../persistencia/obtenerCarrito.php')
    .then(response => response.text())
    .then(data => {
        //Pasamos datos a JSON
        const jsonData = JSON.parse(data);
        carrito = jsonData; // Una vez leido los datos acutalizamos
        const productosJSON = JSON.stringify(carrito);
        localStorage.setItem('carrito', productosJSON);
    });
}*/

function agregarOActualizarProductoEnCarrito(idProducto, cantidad, precio) {
    fetch('../persistencia/carrito/carrito.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: idProducto,
            cantidad: cantidad,
            precio: precio,
            accion: "actualizarProductosCarrito"
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log(data.message);
        } else {
            console.error('Error:', data.error);
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
}

function añadir(){ 
    const idBoton = Number($(this).data("id"));  // Convertimos el data-id a número
    const producto = products.find(producto => Number(producto.id) === idBoton); // Buscamos el producto

    if (!producto) {
        alert("Producto no encontrado con id: "+idBoton);
        return; // Si no se encuentra el producto, salimos de la función
    }

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let index = carrito.findIndex(producto => Number(producto.id) === idBoton); // Encontramos el índice del producto en el carrito

    if(index !== -1){
        // Si el producto ya está en el carrito, incrementamos su cantidad
        carrito[index].cantidad++;
    } else {
        // Si el producto no está en el carrito, lo agregamos
        producto.cantidad = 1; 
        carrito.push(producto);
        index = carrito.length - 1; // Actualizamos el índice al último producto añadido
    }

    // Convertir el carrito actual a JSON y guardar en localStorage
    const productosJSON = JSON.stringify(carrito);
    localStorage.setItem('carrito', productosJSON);

    agregarOActualizarProductoEnCarrito(carrito[index].id, carrito[index].cantidad, carrito[index].precio);
    modificarCarrito();
}


function modificarCarrito(){
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let total = 30; 
    let cantidad = 0;
    let iva = 0;
    // Recorrer cada producto en el carrito
    for (let j = 0; j < carrito.length; j++) {
        const item = carrito[j];
        let subtotal;
        if(item.oferta == "Si" && oferta){
            const descuentoIngresado = oferta / 100;
            subtotal = (item.precio - (item.precio * descuentoIngresado)) * item.cantidad;
        // Calcula el subtotal del producto y agregarlo al total del carrito
        }else{
            subtotal = item.precio * item.cantidad;
        }
        total += subtotal;
        cantidad += item.cantidad;
        iva += subtotal*0.22;
    }
    fetch('../persistencia/carrito/carrito.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cantidadProductos: cantidad,
            precioTotal: total+iva,
            accion: "actualizarCarrito"
        })
    })
    .then(response => {
        // Revisa si la respuesta es JSON
        return response.json().catch(error => {
            console.error('Respuesta no es JSON:', response);
            throw error;
        });
    })
    .then(data => {
        if (data.success) {
            console.log(data.message);
        } else {
            console.error('Error:', data.error);
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });    
}
