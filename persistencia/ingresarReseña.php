<?php
// Configuración de la base de datos
$host = 'localhost'; 
$user = 'root'; 
$pass = ''; 
$dbname = 'producto'; 

// Crear conexión a la base de datos
$conexion = new mysqli($host, $user, $pass, $dbname);

// Verificar conexión
if ($conexion->connect_error) {
    echo json_encode(['success' => false, 'error' => $conexion->connect_error]);
    exit;
}

// Función para obtener y guardar datos
function obtenerDatos($conexion) {       
    // Obtener valores de POST
    $idProducto = $_POST['idProducto'];
    $reseña = $_POST['reseña'];
    session_start();
    $idUsuario = $_SESSION['usuario'][0]['idUsuario'];

    // Preparar la consulta SQL
    $stmt = $conexion->prepare("INSERT INTO reseñas(idProducto, idUsuario, reseña) VALUES (?, ?, ?)");
    $stmt->bind_param("iis", $idProducto, $idUsuario, $reseña);

    // Ejecutar la consulta
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Reseña guardada con éxito']);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }

    // Cerrar la declaración
    $stmt->close();
}

// Llamar a la función para guardar datos
obtenerDatos($conexion);

// Cerrar la conexión
$conexion->close();
?>