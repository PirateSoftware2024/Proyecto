let products = [];
let categorias = [];

function cargarDatos(){
    fetch('../persistencia/obtenerProductos.php')
    .then(response => response.text())
    .then(data => {
        //Pasamos datos a JSON
        const jsonData = JSON.parse(data);
        products = jsonData; // Una vez leido los datos acutalizamos
        actualizar();
    });
}

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
        const $categoriaButton = $(`<button class="nav-button" data-id="${categoria.nombre}">${categoria.nombre}</button>`);
        $(".navbar").append($categoriaButton);
    }
}
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-menu').classList.toggle('active');
});

function buscar(){
    const nombre = $(this).data("id");
    fetch('../persistencia/productosCategoria.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: nombre })
    })
    .then(response => response.text())
    .then(data => {
        //Pasamos datos a JSON
        const jsonData = JSON.parse(data);

        console.log('Datos JSON:', jsonData);
        products = jsonData; // Una vez leido los datos acutalizamos
        actualizar();
    });
}

$(document).ready(function() {
    cargarCategorias();
    cargarDatos();
    nuevoCarrito();
    $("#productContainer").on("click", ".boton-producto", añadir);

    $("#nav-bar").on("click", ".nav-button", buscar);

    $("#right-arrow").on("click", function() {
        console.log('Right arrow clicked');
        $(".navbar").animate({scrollLeft: '+=150px'}, 300);
    });
    
    $("#left-arrow").on("click", function() {
        $(".navbar").animate({scrollLeft: '-=150px'}, 300);
    });    

});

function actualizar(){
    // Generamos las tarjetas de productos
    $("#productContainer").html("");
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const $productCard = $(`
            <div class="product-card">
                <div class="image-container">
                    <img src="${product.file_path}">
                </div>
                <h3>${product.nombre}</h3>
                <p>${product.descripcion}</p>
                <div class="price">$${product.precio}</div>
                <button class="boton-producto" data-id="${product.id}">Añadir al carrito</button>
            </div>
        `);
        
        $("#productContainer").append($productCard);
    }   
}


function nuevoCarrito() {
    fetch('../persistencia/agregarPedido.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            estadoCarrito: 'Pendiente',
            idUsuario: 1
        })
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
        console.error('Error en la solicitud:', error);
    });
}


let carrito = [];
function obtenerProductosCarrito(){
    fetch('../persistencia/obtenerCarrito.php')
    .then(response => response.text())
    .then(data => {
        //Pasamos datos a JSON
        const jsonData = JSON.parse(data);
        carrito = jsonData; // Una vez leido los datos acutalizamos
        const productosJSON = JSON.stringify(carrito);
        localStorage.setItem('carrito', productosJSON);
    });
}

function agregarOActualizarProductoEnCarrito(idProducto, cantidad, precio) {
    fetch('../persistencia/obtenerCarrito.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            idCarrito: 30,
            id: idProducto,
            cantidad: cantidad,
            precio: precio
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
        console.error('Producto no encontrado con id:', idBoton);
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

/*let cantidadArticulos = () => {
    let total = 0; 
    // Recorrer cada producto en el carrito
    for (let j = 0; j < carrito.length; j++) {
        const item = carrito[j];
            
        // Calcula el subtotal del producto y agregarlo al total del carrito
        total += item.cantidad;
    }
    return total; // Convertir a número flotante
}*/


function modificarCarrito(){
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let total = 30; 
    let cantidad = 0;
    // Recorrer cada producto en el carrito
    for (let j = 0; j < carrito.length; j++) {
        const item = carrito[j];
            
        // Calcula el subtotal del producto y agregarlo al total del carrito
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        cantidad += item.cantidad;
    }
    fetch('../persistencia/modificarCarrito.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            idCarrito: 30,
            cantidadProductos: cantidad,
            precioTotal: total
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
