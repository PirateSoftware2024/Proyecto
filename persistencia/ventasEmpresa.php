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
    //session_start();
    $idEmpresa = 1; //_SESSION['usuario'][0]['idEmpresa'];
    $sql = "SELECT c.idCarrito, u.nombre nomUsuario, p.nombre nomProducto, a.cantidad, a.cantidad * a.precio total, c.idPaquete, c.fecha
            FROM almacena a
            JOIN producto p ON p.id = a.id
            JOIN carrito c ON c.idCarrito = a.idCarrito
            JOIN usuario u ON u.idUsuario = c.idUsuario
            WHERE c.estadoCarrito = 'Confirmado' AND idEmpresa = 1;";
    $datos = mysqli_query($conexion, $sql);
    
    // Obtener todos los datos como un array de arrays asociativos
    $arrayDatos = mysqli_fetch_all($datos, MYSQLI_ASSOC);

    // Enviar los datos como JSON
    echo json_encode($arrayDatos);
}
?>