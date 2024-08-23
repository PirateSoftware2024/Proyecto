$(document).ready(function() {
    $("#botonSiguiente").click(pago);

     // Delegar el evento change a #pagoUsuario utilizando el contenedor #informacion
    $("#informacion").on("change", "#pagoUsuario", function() {
        let opcion = $(this).val();

        if (opcion == 1) {
            console.log("Opción seleccionada: " + opcion);
        } else {
            console.log("Opción seleccionada: " + opcion);
            credito();
        }
    });

    // COOKIE
    $("#informacion").on("click", "#confirmar", function (e) {
        e.preventDefault();

        var name = $('#pago').val();
        var amount = $('#nombre').val();

        // Guardar los datos en una cookie
        $.cookie('paymentInfo', JSON.stringify({ name: name, amount: amount }), { path: '/', expires: 1 }); // La cookie durará 1 día
        //devolver();
    });
});

let credito = () => {
    let datos = $(`
        <label for="pago">Numero de la tarjeta</label><br>
        <input type="text" id="pago" name="pago" placeholder="1234 1234 8974 4321"><br>
        <input type="text" id="vencimiento" name="vencimiento" placeholder="MM/AA"><input type="text" id="codigo" name="codigo" placeholder="CVV/CVC"><br>
        <input type="text" id="nombre" name="nombre" placeholder="Nombre como aparece en la tarjeta"><br>
        <button id="confirmar">Siguiente</button>
    `);
    $("#informacion").append(datos);
}
let pago = () => {
    let datos = $(`
        <label for="pagoUsuario">Pago</label><br>
        <select id="pagoUsuario" name="pagoUsuario" required>
            <option value="" disabled selected>Metodo de pago</option>
            <option value="1">Paypal</option>
            <option value="2">Tarjeta de Crédito</option>
        </select><br><br>
    `);
    $("#informacion").html(datos);
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

function agregamosPedido(){
    let cantidad = 0;
    let total = 30;

    for(let i=0;i<carrito.length;i++){
        let producto = carrito[i];
        total += Number(producto.precio) * Number(producto.cantidad);
        cantidad += Number(producto.cantidad);
    }

    fetch('../persistencia/agregarPedido.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cantidad: cantidad,
            total: total,
            idUsuario: 1
        })
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });
}

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