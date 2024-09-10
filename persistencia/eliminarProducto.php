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
    $idProducto = $data['id'];

    // Verificar si el producto está en la tabla carrito
    $verificarSql = "SELECT COUNT(*) AS conteo FROM almacena WHERE id = '$idProducto'";
    $result = mysqli_query($conexion, $verificarSql);
    $row = mysqli_fetch_assoc($result);

    if ($row['conteo'] > 0) {
        echo json_encode(['success' => false, 'error' => 'No se puede eliminar el producto porque está en un carrito.']);
    } else {
        // Eliminar el producto
        $sql = "DELETE FROM producto WHERE id = '$idProducto'";
        if (mysqli_query($conexion, $sql)) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => mysqli_error($conexion)]);
        }
    }

    // Cerrar la conexión
    mysqli_close($conexion);
}
?>
