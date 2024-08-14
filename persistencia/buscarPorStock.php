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
    // Obtener los datos de la solicitud POST
    $data = json_decode(file_get_contents('php://input'), true);
    $stock = $data['stock'];

    $sql = "SELECT * FROM producto WHERE stock = $stock";
    $datos = mysqli_query($conexion, $sql);
    
    // Obtener todos los datos como un array de arrays asociativos
    $arrayDatos = mysqli_fetch_all($datos, MYSQLI_ASSOC);

    // Enviar los datos como JSON
    echo json_encode($arrayDatos);
}
?>
