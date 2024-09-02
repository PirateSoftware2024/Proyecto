<?php 
header('Content-Type: application/json');

$server = "localhost";
$user = "root";
$pass = "";
$db = "producto";

// Crear conexión
$conexion = new mysqli($server, $user, $pass, $db);

// Verificar conexión
if ($conexion->connect_errno) {
    echo json_encode(['error' => 'Conexión fallida: ' . $conexion->connect_error]);
    exit;
}

function obtenerDatos($conexion) {   
    // Obtener los datos de la solicitud POST
    $data = json_decode(file_get_contents('php://input'), true);
    if (!isset($data['fecha'])) {
        echo json_encode(['error' => 'No se proporcionó el dato']);
        mysqli_close($conexion);
        exit;
    }

    $fecha = $conexion->real_escape_string($data['fecha']);

    // Verificar si el producto está en un carrito
    $verificarCarritoSql = "SELECT COUNT(*) as count 
                            FROM carrito 
                            WHERE fecha= '$fecha' AND estadoCarrito = 'Confirmado'";
    $resultado = $conexion->query($verificarCarritoSql);

    if (!$resultado) {
        echo json_encode(['error' => 'Error en la consulta: ' . $conexion->error]);
        mysqli_close($conexion);
        exit;
    }

    $fila = $resultado->fetch_assoc();
    if ($fila['count'] < 1) {
        // Producto no está en un carrito confirmado
        echo json_encode(['error' => 'Fecha no encontrada']);
        mysqli_close($conexion);
        return;
    }

    // Producto está en un carrito confirmado, obtener los datos del carrito
    $sql = "SELECT * 
            FROM carrito 
            WHERE fecha = '$fecha' AND estadoCarrito = 'Confirmado'";
    $datos = mysqli_query($conexion, $sql);

    if (!$datos) {
        echo json_encode(['error' => 'Error en la consulta: ' . $conexion->error]);
        mysqli_close($conexion);
        exit;
    }

    $arrayDatos = mysqli_fetch_all($datos, MYSQLI_ASSOC);
    echo json_encode($arrayDatos); // Devolver solo el array de datos

    // Cerrar la conexión
    mysqli_close($conexion);
}

obtenerDatos($conexion);
?>