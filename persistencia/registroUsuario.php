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
    echo json_encode(['success' => false, 'error' => 'Error de conexión: ' . $conexion->connect_error]);
    exit;
}

// Insertar información de la imagen en la base de datos
$sql = "INSERT INTO usuario (nombre, apellido, telefono, fechaNac, departamento, barrio, calle, nPuerta, codigoPostal, contraseña, correo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conexion->prepare($sql);

// Verificar si la preparación de la declaración SQL fue exitosa
if (!$stmt) {
    echo json_encode(['success' => false, 'error' => 'Error en la preparación de la declaración: ' . $conexion->error]);
    exit;
}

// Obtener valores de POST
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$telefono = $_POST['telefono'];
$fechaNac = $_POST['fecha']; // Suponiendo que la fecha esté en el formato 'YYYY-MM-DD'
$departamentos = $_POST['departamentos'];
$barrio = $_POST['barrio'];
$calle = $_POST['calle'];
$nPuerta = $_POST['numeroPuerta'];
$codigoPostal = $_POST['codigoPostal'];
$contraseña = $_POST['contraseña'];
$correo = $_POST['correo'];

// Vincular parámetros correctamente
$stmt->bind_param('ssissssisss', $nombre, $apellido, $telefono, $fechaNac, $departamentos, $barrio, $calle, $nPuerta, $codigoPostal, $contraseña, $correo);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Error al insertar en la base de datos: ' . $stmt->error]);
}

$stmt->close();
$conexion->close();
?>