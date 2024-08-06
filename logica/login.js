$(document).ready(function() {
    $("#boton").click(function() {
        tomarDatos();
    });
});

function tomarDatos(){
    const username = $("#username").val();
    const password = $("#password").val();

    verificar(username, password);
}

function verificar(username, password){
    let user = "pepito";
    let pass = 123;

    if(user == username && pass == password){
        $("#mensaje").css("color", "green").html("Inicio de sesión exitoso");
    }else{
        $("#mensaje").css("color", "red").html("Usuario o contraseña incorrectos");
    }
}