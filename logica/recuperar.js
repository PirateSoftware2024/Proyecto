$(document).ready(function () {

   $("#boton").click( function(){
        const email = $('#email').val();

        if (!validateEmail(email)) {
            alert('Por favor, ingrese un correo electrónico válido.');
            return;
        }

        $('#loader').show();

        $.ajax({
            url: '../persistencia/mail/token.php',
            type: 'POST',
            data: { email: email },
            success: function (response) {
                let jsonResponse = JSON.parse(response);

                if (jsonResponse.success) {
                    $('#loader').hide();
                    idUsuario = jsonResponse.idUsuario; // Obtiene el idUsuario            
                    $('#envio-token').hide();
                    $('#ingreso-token').show(); // Muestra el contenedor para ingresar el token
                } else {
                    alert(jsonResponse.message);
                    $('#loader').hide();
                }
            },
            error: function (xhr, status, error) {
                alert('Error al enviar el correo: ' + error);
                $('#loader').hide();
            }
        }); 
    });

    // Delegación de eventos
    $(document).on('click', '#btnToken', function () {
        let token = $("#token").val();
        verificarToken(token);
    });

    $(document).on('click', '#resetpass', function () {
        let dato = $("#contraNueva").val();
        modificarUsuario(dato);
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});

function verificarToken(token) {
    fetch('../persistencia/mail/ingresarToken.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ token: token })
    })
    .then(response => response.json())  // Cambia a response.json()
    .then(data => {
        if (data.success) {
            alert("Token correcto!");
            $('#nueva-pass').show();
            $('#ingreso-token').hide();
        } else {
            alert(data.message);  // Muestra el mensaje de error
        }
    })
    .catch(error => {
        alert('Error al verificar el token: ' + error);
    });
}


function modificarUsuario(dato) {
    fetch('../persistencia/usuario/usuario.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: idUsuario,
            contra: dato,
            accion: 'contraReset'
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert("Dato modificado correctamente!");
            redirigir();
        } else {
            alert("Error al modificar el dato: " + (data.error || ''));
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
        alert('Ocurrió un error: ' + error.message);
    });
}

function redirigir() {
    // Mostrar el loader
    $('#loader').show();

    // Establecer un retraso antes de redirigir
    setTimeout(function() {
        window.location.href = "../interfaz/login.html"; // Cambia a la URL deseada
    }, 2000); // Cambia 2000 a la cantidad de milisegundos que desees (2000 ms = 2 segundos)
}