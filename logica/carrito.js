/* Array para almacenar los productos del carrito.
   Busca en el localStorage si exite el item "carrito" 
   lo convierte en JSON y lo almacena, de lo contrario crea un array productos
   lo mismo con orden.
*/
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let orden = JSON.parse(localStorage.getItem('orden')) || [];

$(document).ready(function() {
    mostrarProductosEnCarrito();
    resumenPedido();
    $("#cartContainer").on("click", ".boton-eliminar", eliminar);     // Controlador de eventos que
    $("#cartContainer").on("click", ".boton-mas", sumarCantidad);     // responde a los clicks en cualquier elemento con la     
    $("#cartContainer").on("click", ".boton-menos", restarCantidad);  // clase .boton-"accion" que esté dentro del elemento con id "cartContainer".
    $("#comprar").click();
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
            entregaPedido(1);
        } else if (seleccion === "2") {
            pago();
        }else{
            entregaPedido(3);
        }
    
    });
    
    let pago = () => {
        let datos = $(`
            <label for="nombreUsuario">Departamento</label><br>
            <select id="departamentos" name="departamentos" required>
                <option value="" disabled selected>Seleccione un departamento</option>
                <option value="Artigas">Artigas</option>
                <option value="Canelones">Canelones</option>
                <option value="Cerro-largo">Cerro Largo</option>
                <option value="Colonia">Colonia</option>
                <option value="Durazno">Durazno</option>
                <option value="Flores">Flores</option>
                <option value="Florida">Florida</option>
                <option value="Lavalleja">Lavalleja</option>
                <option value="Maldonado">Maldonado</option>
                <option value="Montevideo">Montevideo</option>
                <option value="Paysandu">Paysandú</option>
                <option value="Rio-negro">Río Negro</option>
                <option value="Rivera">Rivera</option>
                <option value="Rocha">Rocha</option>
                <option value="Salto">Salto</option>
                <option value="San-jose">San José</option>
                <option value="Soriano">Soriano</option>
                <option value="Tacuarembo">Tacuarembó</option>
                <option value="Treinta-y-tres">Treinta y Tres</option>
            </select><br><br>

            <label for="barrio">Barrio</label><br>
            <input type="text" id="barrio" name="barrio" placeholder="Ingrese su barrio"><br><br>

            <label for="calleUsuario">Calle</label><br>
            <input type="text" id="calle" name="calle" placeholder="Ingresa tu calle"><br><br>
            
            <label for="numeroPuerta">Numero</label><br>
            <input type="number" id="numeroPuerta" name="numeroPuerta" placeholder="Numero de puerta"><br><br>

            <label for="numeroApartamento">Numero apartamento</label><br>
            <input type="number" id="numeroApartamento" name="numeroApartamento" placeholder="Numero de apartamento"><br><br>

            <label for="codigoPostal">Codigo postal</label><br>
            <input type="number" id="codigoPostal" name="codigoPostal" placeholder="Ingrese codigo postal"><br>

            <label for="telefono">Telefono</label><br>
            <input type="number" id="telefono" name="telefono" placeholder="Ingrese Telefono"><br>

            <label for="correo">Correo</label><br>
            <input type="mail" id="correo" name="correo" placeholder="Ingrese su correo"><br><br>
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
    function devolver(){
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
    }
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
            <img src="${producto.file_path}" width="125" height="125">
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
    fetch('../persistencia/eliminarDelCarrito.php', {
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
function comprar() {
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
}


function resumenPedido(){
    let html = '';
    let total = 30; // Es igula a 30 por el empaque y la tarifa de Axie
    let elementoHtml = '<ul class="order-items">';
        
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

let empresa = [];
let usuario = [];
function entregaPedido(tipo){
    if(tipo == 1){
        fetch('../persistencia/datosEmpresa.php')
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

    }else if(tipo == 2){
        fetch('../persistencia/datosUsuario.php')
    .then(response => response.text())
    .then(data => {
        console.log('Datos recibidos:', data);
        //Pasamos datos a JSON
        const jsonData = JSON.parse(data);

        console.log('Datos JSON:', jsonData);
        usuario = jsonData; // Una vez leido los datos acutalizamos

        let direccion = usuario[0];
        $("#calle").html("Calle: "+direccion.calle);
        $("#nPuerta").html("Numero puerta: "+direccion.nPuerta);
        $("#departamento").html("Departamento: "+direccion.departamento);
    });
    }else{
        $("#domicilio").html("Ciudad vieja CALLE, NUMERO PUERTA");
    }
}


function modificarCarrito(){
    console.log("Holaa");
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

let cantidadArticulos = () => {
    let total = 0; 
    // Recorrer cada producto en el carrito
    for (let j = 0; j < carrito.length; j++) {
        const item = carrito[j];
            
        // Calcula el subtotal del producto y agregarlo al total del carrito
        total += item.cantidad;
    }
    return total; // Convertir a número flotante
}

paypal.Buttons({
    createOrder: function(data, actions) {
        // Configura el pago
        return actions.order.create({
            purchase_units: [{
                amount: {
                    currency_code: 'USD', // Asegúrate de que la moneda sea USD
                    value: totalCarrito().toFixed(2) // Total en dólares
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        // Captura el pago
        return actions.order.capture().then(function(details) {
            alert('Pago realizado con éxito por ' + details.payer.name.given_name);
            generarOrden();
            comprar();
        });
    }
}).render('#paypal-button-container');


function generarOrden(){
    fetch('../persistencia/generarOrden.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            idCarrito: 30,
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