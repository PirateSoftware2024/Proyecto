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
    $nombre = $data['nombre'];
    $descripcion = $data['descripcion'];
    $precio = $data['precio'];

    // Verificar si el producto está en un carrito
    $verificarCarritoSql = "SELECT COUNT(*) as count FROM almacena WHERE id = $idProducto";
    $resultado = $conexion->query($verificarCarritoSql);

    if ($resultado) {
        $fila = $resultado->fetch_assoc();
        if ($fila['count'] > 0) {
            // Producto está en un carrito, no se puede modificar el precio
            echo json_encode(['success' => false, 'error' => 'No se puede modificar el precio porque el producto está en un carrito.']);
            mysqli_close($conexion);
            return;
        }
    } else {
        // Error al verificar la existencia del producto en un carrito
        echo json_encode(['success' => false, 'error' => 'Error al verificar el carrito: ' . mysqli_error($conexion)]);
        mysqli_close($conexion);
        return;
    }

    // Consulta SQL para actualizar el producto
    $sql = "UPDATE producto SET nombre = '$nombre', descripcion = '$descripcion', precio = $precio WHERE id = $idProducto";

    // Ejecutar la consulta
    if (mysqli_query($conexion, $sql)) {
        // Consulta exitosa
        echo json_encode(['success' => true]);
    } else {
        // Error en la consulta
        echo json_encode(['success' => false, 'error' => mysqli_error($conexion)]);
    }

    // Cerrar la conexión
    mysqli_close($conexion);
}
?>
