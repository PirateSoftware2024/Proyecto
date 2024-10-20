/* Array para almacenar los productos del carrito.
Busca en el localStorage si exite el item "carrito" 
lo convierte en JSON y lo almacena, de lo contrario crea un array productos
lo mismo con orden.
*/
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

$(document).ready(function() {
    nuevoCarrito();
    mostrarProductosEnCarrito();
    resumenPedido();
    datosUsuario();
    $("#cartContainer").on("click", ".boton-eliminar", eliminar);     // Controlador de eventos que
    $("#cartContainer").on("click", ".boton-mas", sumarCantidad);     // responde a los clicks en cualquier elemento con la     
    $("#cartContainer").on("click", ".boton-menos", restarCantidad);  // clase .boton-"accion" que esté dentro del elemento con id "cartContainer".
    //$("#comprar").click();
    ////////////////////////////////////////
    // -Codigo cuadrado boton "comprar"
    $('#comprar').click(function() {
        $('#cuadroInformacion').fadeIn();
        $('body').addClass('modal-open');
    });

    $('#cerrarCuadro').click(function() {
        $('#cuadroInformacion').fadeOut();
        $('body').removeClass('modal-open');
        agregamosPedido();
    });

    $('#entrega').change(function() {
        var seleccion = $(this).val();
        var resultadoDiv = $('#resultado');
    
        if (seleccion === "1") {
            pago();
        } else if (seleccion === "2") {
            entregaPedido(1);
        }else{
            alert("Debe seleccionar un metodo de envio");
        }
    
    });
    
    let pago = () => {
        let datos = $(`
             <div class="radio-group">
                <label>
                    Pick-up - Ciudad Vieja, Sarandí 508, 11000 Montevideo 
                    <input type="radio" name="opciones" class="radio" value="opcion1">
                </label><br>
               
                <label>
                    Envío a domicilio - ${usuario.localidad}, ${usuario.localidad} ${usuario.numero}, ${usuario.postal} ${usuario.departamento}
                   <input type="radio" name="opciones" class="radio" value="opcion2"> Opción 2
                </label><br>
            </div>
        `);
        $("#direccionUsuario").html(datos);
    }

    /////////////////////////////////////////
    // COOKIE
    $('#paymentForm').on('submit', function(e) {
        e.preventDefault();

        var name = $('#name').val();
        var amount = $('#amount').val();

        // Guardar los datos en una cookie
        $.cookie('paymentInfo', JSON.stringify({ name: name, amount: amount }), { path: '/', expires: 1 }); // La cookie durará 1 día
        devolver();
    });
});
    ///////////////////////////////////////////////////////////
    /*function devolver(){
        $.ajax({
            url: '../persistencia/pedidoUsuario.php', // Ruta al archivo PHP
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                if (data.error) {
                    console.log(data.error);
                } else {
                    // Procesar los datos
                    console.log('Nombre: ' + data.name);
                    console.log('Monto: ' + data.amount);
                    
                    // Puedes mostrar los datos en la página, por ejemplo:
                    $('#nameDisplay').text(data.name);
                    $('#amountDisplay').text(data.amount);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error en la solicitud: ' + textStatus + ' - ' + errorThrown);
            }
        });
    }*/
    ////////////////////////////////////////////////////////////
    // Función para mostrar  los productos en el carrito
    function mostrarProductosEnCarrito() {
    // Vacia el contenedor antes de agregar los productos
    $("#cartContainer").empty();
    // Recorrer el array carrito y creamos un div
    for (let i = 0; i < carrito.length; i++) {
        const producto = carrito[i];
        
        //producto.precio.replaceAll('.', '')
        //let precio = producto.precio * producto.cantidad; <div class="price">$${new Intl.NumberFormat().format(precio)}</div>
        const $productCard = $(`
        <div class="product-card">
            <img src="../persistencia/assets/${producto.file_path}" width="125" height="125">
            <h3>${producto.nombre}</h3>
            <div class="price">$${producto.precio}</div>
            <p>Cantidad: ${producto.cantidad}</p>
            <button class="boton-eliminar" data-id="${producto.id}">Eliminar</button>
            <button class="boton-mas" data-id="${producto.id}">+</button>
            <button class="boton-menos" data-id="${producto.id}">-</button>
        </div>`);
        // Agregar el producto al contenedor del carrito
        $("#cartContainer").append($productCard);
    }
    resumenPedido();
}

// Funcion para eliminar productos del carrito
function eliminar() {
    const idBoton = $(this).data("id");

    // Filtrar el carrito para eliminar el producto con el ID correspondiente
    const index = carrito.findIndex(producto => Number(producto.id) === idBoton);
    carrito.splice(index, 1);

    elimiarDelCarrito(idBoton);
    mostrarProductosEnCarrito();
    // Actualizar localStorage y volver a renderizar el carrito
    localStorage.setItem('carrito', JSON.stringify(carrito));
    modificarCarrito();
}

function elimiarDelCarrito(idProducto) {
    fetch('../persistencia/carrito/carrito.php', {
        method: 'DELETE',
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
            console.log(data.message);
        } else {
            console.error('Error:', data.error);
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
}
// Funcion para aumentar la cantidad de un producto en el carrito
function sumarCantidad() {
    const idBoton = $(this).data("id");
    const index = carrito.findIndex(producto => Number(producto.id)  === idBoton);
    carrito[index].cantidad++;
    
    // Actualizar localStorage y volver a renderizar el carrito
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarProductosEnCarrito();
    
    agregarOActualizarProductoEnCarrito(carrito[index].id, carrito[index].cantidad, carrito[index].precio);
    modificarCarrito();
}

function restarCantidad() {
    const idBoton = $(this).data("id");
    const index = carrito.findIndex(producto => Number(producto.id) === idBoton);

    if(carrito[index].cantidad > 1){
        carrito[index].cantidad--;
        // Actualizar localStorage y volver a renderizar el carrito
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarProductosEnCarrito();
    }else{
        alert("La cantidad no puede ser menor a 1");
    }

    agregarOActualizarProductoEnCarrito(carrito[index].id, carrito[index].cantidad, carrito[index].precio);
    modificarCarrito();
}

// Funcion para comprar y generar un ticket de compra 
/*function comprar() {
    let datosOrden = [];
    // Recorrer el carrito para construir los datos de la orden
    for (let i = 0; i < carrito.length; i++) {
        const producto = carrito[i];
        datosOrden.push({
            name: producto.nombre,
            price: producto.precio,
            cantidad: producto.cantidad
        });
}

    // Crear la orden con los datos recopilados
    orden.push({
        id: "id de la orden",
        titulo: "Orden Numero",
        date: '2024-11-20',
        productos: datosOrden
    });


    // Convertir la orden a JSON y guardar en localStorage
    const ordenJSON = JSON.stringify(orden);
    localStorage.setItem('orden', ordenJSON);
}*/


function resumenPedido(){
    let html = '';
    let total = 30; // Es igula a 30 por el empaque y la tarifa de Axie
    let elementoHtml = '<ul class="order-items">';
    
    if(carrito.length<1){
        $("#titulo").html("No tiene productos agregados...");
        $("#comprar").css("display", "none");
        $("#pedido").html("");
    }else{
    $("#comprar").css("display", "flex");
    // Recorrer cada producto en la orden actual
    for (let j = 0; j < carrito.length; j++) {
        const item = carrito[j];
            
        // Calcula el subtotal del producto y agregarlo al total del pedido
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
            
        // Agregar el producto a la lista de elementos 
        elementoHtml += `
            <li class="order-item">
                <span>${item.nombre} (x${item.cantidad})</span>
                <span>$${subtotal.toFixed(2)}</span>
            </li>`;
        }
        

        // Cerramos la lista
        elementoHtml += `
                <li class="order-item">
                    <span>Empaque</span>
                    <span>$10.00</span>
                </li>
                <li class="order-item">
                    <span>Tarifa Axis Markets</span>
                    <span>$20.00</span>
                </li>
                <li class="order-item">
                    <span>Impuestos</span>
                    <span> Calcular los impuestos :)</span>
                </li>
            </ul>
        `;
        html += `
                <div class="order">
                ${elementoHtml}
                <div class="total">Total: $${total.toFixed(2)}</div>
            </div>
        `;
    
    $("#pedido").html(html);
    }
}

let empresa = [];
let usuario = [];

function datosUsuario(){
    fetch('../persistencia/usuario/usuario.php?accion=datosUsuario')
    .then(response => response.text())
    .then(data => {
        console.log('Datos recibidos:', data);
        //Pasamos datos a JSON
        const jsonData = JSON.parse(data);

        console.log('Datos JSON:', jsonData);
        usuario = jsonData; // Una vez leido los datos acutalizamos
    });
}

/*function entregaPedido(tipo){
    if(tipo == 1){
        fetch('../spersistencia/datosEmpresa.php')
        .then(response => response.text())
        .then(data => {
            console.log('Datos recibidos:', data);
            //Pasamos datos a JSON
            const jsonData = JSON.parse(data);
    
            console.log('Datos JSON:', jsonData);
            empresa = jsonData; // Una vez leido los datos acutalizamos
    
            let direccion = empresa[0];
            $("#calle").html("Calle: "+direccion.calle);
            $("#nPuerta").html("Numero puerta: "+direccion.numero);
            $("#departamento").html("Departamento: "+direccion.departamento);
        });
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
    fetch('../persistencia/carrito/carrito.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cantidadProductos: cantidad,
            precioTotal: total,
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

let totalCarrito = () => {
    let total = 0; 
    // Recorrer cada producto en el carrito
    for (let j = 0; j < carrito.length; j++) {
        const item = carrito[j];
            
        // Calcula el subtotal del producto y agregarlo al total del carrito
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
    }
    // Convertir el total a dólares
    let aDolar = total / 40.26; // Redondear a dos decimales
    return aDolar; // Convertir a número flotante
}

paypal.Buttons({
    // Configuración del botón
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            currency_code: 'USD', // Asegúrate de que la moneda sea USD
            value: 10.00 // Total en dólares
          }
        }]
      });
    },
    
    // Esta función se ejecuta cuando el pago fue exitoso
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        alert('Pago completado por ' + details.payer.name.given_name);
        generarOrden();
        actualizarPage();
        // Redirigir a una página específica
        window.location.href = '../interfaz/pagoExitoso.html'; // Reemplaza con tu URL deseada
      });
    },
    
    // Manejar errores en el pago
    onError: function(err) {
      console.log('Ocurrió un error con el pago', err);
      alert('Hubo un problema con el pago. Por favor, intenta de nuevo.');
    }
  }).render('#paypal-button-container'); // ID del contenedor donde se mostrará el botón de PayPal
  

function generarOrden(){
    fetch('../persistencia/carrito/carrito.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            accion: "generarOrden"
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("orden generada");
        } else {
            console.error('Error:', data.error);
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
}

function actualizarPage(){
    carrito = [];
    const productosJSON = JSON.stringify(carrito);
    localStorage.setItem('carrito', productosJSON);
    mostrarProductosEnCarrito();
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
        console.log("Nose");
    });
}