let products = [];


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

$(document).ready(function() {
    cargarDatos();
    $("#productContainer").on("click", ".boton-producto", añadir);
});

function actualizar(){
    // Generamos las tarjetas de productos
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

function añadir(){
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    const idBoton = $(this).data("id");  // Obtenemos atributo data-id del botón clickeado
    const producto = products.find(producto => Number(producto.id) === idBoton); //Guardamos el producto 

    let index;
    if(carrito.some(products => products.id == idBoton)){
        for(let i=0;i<carrito.length;i++){
            if(carrito[i].id == idBoton){
                index=i;
            }
        }
        carrito[index].cantidad++;
    }else{
        producto.cantidad = 1; //Agregamos el atributo cantidad
        carrito.push(producto);
    }

    // Convertir el carrito actual a JSON y guardar en localStorage
        const productosJSON = JSON.stringify(carrito);
        localStorage.setItem('carrito', productosJSON);
}


