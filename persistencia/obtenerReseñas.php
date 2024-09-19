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
    buscarReseñas($conexion);
}

function buscarReseñas($conexion) {   
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validar datos recibidos
    if (isset($data['id'])) {
        $idProducto = $data['id'];

        // Verificar si hay reseñas para el producto
        $sqlVerificacion = "SELECT reseña FROM reseñas WHERE idProducto = ?";
        $stmtVerificacion = $conexion->prepare($sqlVerificacion);
        $stmtVerificacion->bind_param('i', $idProducto);
        $stmtVerificacion->execute();
        $result = $stmtVerificacion->get_result();
        
        if ($result->num_rows > 0) {
            // Recoger las reseñas
            $reseñas = [];
            while ($row = $result->fetch_assoc()) {
                $reseñas[] = $row['reseña'];
            }

            echo json_encode(['success' => true, 'reseñas' => $reseñas]);
        } else {
            // No hay reseñas
            echo json_encode(['success' => false, 'error' => 'Sin reseñas']);
        }

        $stmtVerificacion->close();
    } else {
        echo json_encode(['success' => false, 'error' => 'Datos incompletos']);
    }

    $conexion->close();
}
?>

