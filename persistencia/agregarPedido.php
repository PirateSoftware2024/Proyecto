<?php 
header('Content-Type: application/json');
$server = "localhost";
$user = "root";
$pass = "";
$db = "producto";

$conexion = new mysqli($server, $user, $pass, $db);

if ($conexion->connect_errno) {
    die(json_encode(['success' => false, 'error' => 'Conexión fallida: ' . $conexion->connect_error]));
} else {
    obtenerDatos($conexion);
}

function obtenerDatos($conexion) {   
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validar datos recibidos
    if (isset($data['idUsuario'], $data['cantidad'], $data['total'])) {
        $idUser = $data['idUsuario'];
        $cantidad = $data['cantidad'];
        $total = $data['total'];
        $estadoCarrito = 'En proceso';
        // Preparar la consulta
        $sql = "INSERT INTO carrito (cantidadArticulos, precioTotal, idUsuario, estadoCarrito) VALUES (?, ?, ?, ?)";
        $stmt = $conexion->prepare($sql);
        
        if ($stmt === false) {
            die(json_encode(['success' => false, 'error' => 'Error en la preparación de la consulta: ' . $conexion->error]));
        }

        // Vincular parámetros
        $estadoCarrito = 'En proceso';
        $stmt->bind_param('iiis', $cantidad, $total, $idUser, $estadoCarrito);

        // Ejecutar la consulta
        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => $stmt->error]);
        }

        // Cerrar la declaración y la conexión
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'error' => 'Datos incompletos']);
    }

    $conexion->close();
}
?>

