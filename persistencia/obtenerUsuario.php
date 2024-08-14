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
    die('Error de conexión: ' . $conexion->connect_error);
}

// Obtener valores del formulario
$correo = $_POST['correo'];
$contraseña = $_POST['contraseña'];

// Preparar la consulta SQL
$sql = "SELECT COUNT(*) AS count FROM usuario WHERE correo = ? AND contraseña = ?"; // Retorna columnas con ese correo y contraseña
$stmt = $conexion->prepare($sql);

// Verificar si la preparación de la declaración SQL fue exitosa
if (!$stmt) {
    die('Error en la preparación de la declaración: ' . $conexion->error);
}

// Vincular los parámetros
$stmt->bind_param('ss', $correo, $contraseña);

// Ejecutar la consulta
$stmt->execute();

// Obtener el resultado
$result = $stmt->get_result();
$row = $result->fetch_assoc();

// Verificar si se encontró al usuario
if ($row['count'] > 0) {
    echo json_encode(['success' => true, 'message' => 'Usuario encontrado.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Usuario no encontrado.']);
}

// Cerrar la declaración y la conexión
$stmt->close();
$conexion->close();
?>