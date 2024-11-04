$(document).ready(function() {
    $('#uploadForm').on('submit', function(event) {
        event.preventDefault()
        var formData = new FormData(this); 

        $.ajax({
            url: '../persistencia/login.php',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function(data) {
                if (data.success) {
                    $("#mensaje").css("color", "green").html("Inicio de sesión exitoso");
                    redirigir(data.tipo);
                } else {
                    $("#mensaje").css("color", "red").html("Usuario o contraseña incorrectos");
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                    console.error('Error en la solicitud:', textStatus, errorThrown);
                    $('#mensaje').css("color", "red").html('<p>Error al obtener el usuario</p>');
            }
            });
    });
});


function redirigir(tipoUser) {
    const loader = document.getElementById('loader'); // Obtenemos el elemento
    loader.style.display = 'flex'; // Mostramos
    
    if(tipoUser === "Usuario"){
        setTimeout(function() {
            window.location.href = "../interfaz/";
        }, 2000);
    }else if(tipoUser === "Empresa"){
        setTimeout(function() {
            window.location.href = "../interfaz/empresa.php";
        }, 2000);
    }else{
        setTimeout(function() {
            window.location.href = "../interfaz/backoffice.html";
        }, 2000);
    }
    // Esperar 2 segundos antes de redirigir
}