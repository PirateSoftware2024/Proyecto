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
    session_start();
    $idCarrito = $_SESSION['usuario'][0]['idCarrito'];

    $sql = "UPDATE carrito SET estadoCarrito = 'Confirmado' WHERE idCarrito = $idCarrito";

    // Ejecutar la consulta
    if (mysqli_query($conexion, $sql)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => mysqli_error($conexion)]);
    }

    // Cerrar la conexión
    mysqli_close($conexion);
}

function generarOrden($conexion){
    // Obtener los datos de la solicitud POST
    $data = json_decode(file_get_contents('php://input'), true);
    session_start();
    $idUsuario = $_SESSION['usuario'][0]['idUsuario'];
    $idDireccion = $_SESSION['usuario'][0]['idDireccion'];
    $telefono = $_SESSION['usuario'][0]['telefono'];
    $correo = $_SESSION['usuario'][0]['correo'];
    
    // Insertamos la informacion del nuevo pedido
    $sql = "INSERT INTO paquete (idUsuario, idDireccion, estadoEnvio, telefono, correo)
            VALUES ($idUsuario, $idDireccion, 'En preparacion', $telefono, $correo)";

    // Ejecutar la consulta
    if (mysqli_query($conexion, $sql)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => mysqli_error($conexion)]);
    }

    // Cerrar la conexión
    mysqli_close($conexion);
}
?>