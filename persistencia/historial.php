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
    $id = $_SESSION['usuario'][0]['idUsuario'];
    $idUsuario = intval($id);

    // Verificar si hay un carrito confirmado para el usuario
    $verificarSql = "SELECT idCarrito FROM carrito WHERE idUsuario = $idUsuario AND estadoCarrito = 'Confirmado'";
    if ($stmt = $conexion->prepare($verificarSql)) {
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $idCarrito = $row['idCarrito'];
        if ($idCarrito) {
            // Si existe un carrito confirmado, obtener los detalles
            $sql = "SELECT p.nombre, a.precio, a.cantidad, a.idCarrito, c.fecha, p.id
                    FROM almacena a
                    JOIN carrito c ON a.idCarrito = c.idCarrito
                    JOIN producto p ON a.id = p.id
                    WHERE c.idUsuario = $idUsuario AND c.estadoCarrito = 'Confirmado'
                    ORDER BY a.idCarrito;";
            if ($stmt = $conexion->prepare($sql)) {
                $stmt->execute();
                $result = $stmt->get_result();
                $carritos = $result->fetch_all(MYSQLI_ASSOC);

                // Devuelve los datos del carrito en formato JSON
                echo json_encode(['success' => true, 'data' => $carritos]);
            } else {
                // Error en la consulta
                echo json_encode(['success' => false, 'error' => $conexion->error]);
            }
        } else {
            // No hay carritos confirmados para el usuario
            echo json_encode(['success' => false, 'error' => 'No ha realizado compras.']);
        }
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'error' => $conexion->error]);
    }

    // Cerrar la conexión
    mysqli_close($conexion);
}
?>
