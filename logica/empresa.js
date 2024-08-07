$(document).ready(function() {
    $("#formulario").submit(function(event) {
        event.preventDefault(); // Evita el envío del formulario por defecto
        agregar();
        console.log("Lo envio");
    });
});


function agregar() {
    // Utilizamos push para agregar nuevos productos
    const nombre = $("#nombre").val();
    const descripcion = $("#descripcion").val();
    const precio = Number($("#precio").val());
    const condicion = $("#condicion").val();
    const stock = Number($("#stock").val());
    const oferta = $("#oferta").val();
    
    fetch('../persistencia/agregarProducto.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            condicion: condicion,
            stock: stock,
            oferta: oferta
        })
    });
}