const products = [
    {
        id: 1,
        name: 'Remera',
        image: 'images/productos/remera.png',
        description: 'Remera blanca',
        price: '600'
    },
    {
        id: 2,
        name: 'Pantalon',
        image: 'images/productos/pantalon.jpg',
        description: 'Pantalon beige',
        price: '1.200'
    },
    {
        id: 3,
        name: 'Auto',
        image: 'images/productos/auto.png',
        description: 'Chevrolet ONIX',
        price: '701.564'
    },
    {
        id: 4,
        name: 'Computadora',
        image: 'images/productos/pcGamer.png',
        description: 'Computadora gamer',
        price: '40.000'
    },
    {
        id: 5,
        name: 'Championes futbol',
        image: 'images/productos/championes.png',
        description: 'Championes el glorioso',
        price: '1.891'
    },
    {
        id: 6,
        name: 'Taza',
        image: 'images/productos/taza.png',
        description: 'Taza color negro',
        price: '150'
    },
    {
        id: 7,
        name: 'Mesa',
        image: 'images/productos/mesa.png',
        description: 'Mesa en buen estado',
        price: '2.000'
    },
    {
        id: 8,
        name: 'Silla',
        image: 'images/productos/silla.png',
        description: 'Silla color negro',
        price: '1.500'
    },
    {
        id: 9,
        name: 'Alfombra',
        image: 'images/productos/alfombra.png',
        description: 'Alfombra 2X2',
        price: '1000'
    },
    {
        id: 10,
        name: 'Juego play 2',
        image: 'images/productos/play2Game.png',
        description: 'Rugrats game play 2',
        price: '500'
    },
    {
        id: 11,
        name: 'Monitor',
        image: 'images/productos/monitor.png',
        description: 'Monitor para gaming',
        price: '4.000'
    },
    {
        id: 12,
        name: 'Peluche',
        image: 'images/productos/peluche.png',
        description: 'Peluche Sonic',
        price: '300'
    }
];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


$(document).ready(function() {
    console.log("hola");
    actulizar();
    $("#productContainer").on("click", ".boton-producto", añadir);
});

function actulizar(){
    // Generamos las tarjetas de productos
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const $productCard = $(`
            <div class="product-card">
                <div class="image-container">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price">$${product.price}</div>
                <button class="boton-producto" data-id="${product.id}">Añadir al carrito</button>
            </div>
        `);

        $("#productContainer").append($productCard);
    }
}

function añadir(){
    const idBoton = $(this).data("id");  // Obtenemos atributo data-id del botón clickeado
    const productoEncontrado = products.find(producto => producto.id === idBoton);
    let index;
    if(carrito.some(products => products.id == idBoton)){
        for(let i=0;i<carrito.length;i++){
            if(carrito[i].id == idBoton){
                index=i;
            }
        }
        carrito[index].cantidad++;
    }else{
        productoEncontrado.cantidad=1;
        carrito.push(productoEncontrado);
    }

    // Convertir el carrito actual a JSON y guardar en localStorage
        const productosJSON = JSON.stringify(carrito);
        localStorage.setItem('carrito', productosJSON);
}


