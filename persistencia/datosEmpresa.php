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
    $sql = "SELECT * FROM empresa WHERE idEmpresa = 1";
    $datos = mysqli_query($conexion, $sql);
    
    $arrayDatos = mysqli_fetch_all($datos, MYSQLI_ASSOC);

    echo json_encode($arrayDatos);
}
?>

