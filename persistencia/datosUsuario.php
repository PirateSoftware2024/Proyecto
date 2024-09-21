<?php 
header('Content-Type: application/json');
$server = "localhost";
$user = "root";
$pass = "";
$db = "producto";

$conexion = new mysqli($server, $user, $pass, $db);

if ($conexion->connect_errno) {
    die("Conexión fallida: " . $conexion->connect_errno);
} else {
    obtenerDatos($conexion);
}



function obtenerDatos($conexion) {
    session_start();
    $idUsuario = $_SESSION['usuario'][0]['idUsuario']; 
    $sql = "SELECT * FROM usuario WHERE idUsuario = $idUsuario";
    $datos = mysqli_query($conexion, $sql);
    
    
    $arrayDatos = mysqli_fetch_all($datos, MYSQLI_ASSOC);

    // Enviar los datos como JSON
    echo json_encode($arrayDatos);
}
?>

