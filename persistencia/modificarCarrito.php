<?php 
header('Content-Type: application/json');

// Configurar la conexión
$server = "localhost";
$user = "root";
$pass = "";
$db = "producto";


$conexion = new mysqli($server, $user, $pass, $db);

// Verificar conexión
if ($conexion->connect_errno) {
    die(json_encode(['success' => false, 'error' => 'Conexión fallida: ' . $conexion->connect_error]));
} else {
    obtenerDatos($conexion);
}

function obtenerDatos($conexion) {   
    $data = json_decode(file_get_contents('php://input'), true);

    // Validar datos recibidos
    if (isset($data['idCarrito'], $data['cantidadProductos'], $data['precioTotal'])) {
        $idCarrito = $data['idCarrito'];
        $cantidadProductos = $data['cantidadProductos'];
        $precioTotal = $data['precioTotal'];

        // Preparar la consulta
        $sql = "UPDATE carrito
                SET cantidadProductos = ?, precioTotal = ?
                WHERE idCarrito = ? AND estadoCarrito = 'Pendiente'";
        $stmt = $conexion->prepare($sql);

        if ($stmt === false) {
            die(json_encode(['success' => false, 'error' => 'Error en la preparación de la consulta: ' . $conexion->error]));
        }

        // Vincular parámetros
        $stmt->bind_param('idi', $cantidadProductos, $precioTotal, $idCarrito);

        // Ejecutar la consulta
        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Error al ejecutar la consulta: ' . $stmt->error]);
        }

        // Cerrar la declaración
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'error' => 'Datos incompletos']);
    }

    // Cerrar la conexión
    $conexion->close();
}
?>

