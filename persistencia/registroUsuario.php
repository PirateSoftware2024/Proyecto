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

// Obtener valores de POST
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$telefono = $_POST['telefono'];
$fechaNac = $_POST['fecha'];
$contraseña = $_POST['contraseña'];
$correo = $_POST['correo'];

// Verificar si el correo ya existe
$sqlCheck = "SELECT idUsuario FROM usuario WHERE correo = ? OR telefono = ?";
$stmtCheck = $conexion->prepare($sqlCheck);
$stmtCheck->bind_param('si', $correo, $telefono);
$stmtCheck->execute();
$stmtCheck->store_result();

if ($stmtCheck->num_rows > 0) {
    // Si ya existe un usuario con ese correo
    echo json_encode(['success' => false, 'error' => 'El correo o el teléfono ya está registrado.']);
} else {
    // Insertar información de la imagen en la base de datos
    $sql = "INSERT INTO usuario (nombre, apellido, telefono, fechaNac, password, correo, validacion) VALUES (?, ?, ?, ?, ?, ?, 'Espera')";
    $stmt = $conexion->prepare($sql);

    // Verificar si la preparación de la declaración SQL fue exitosa
    if (!$stmt) {
        echo json_encode(['success' => false, 'error' => 'Error en la preparación de la declaración: ' . $conexion->error]);
        exit;
    }

    // Vincular parámetros correctamente
    $stmt->bind_param('ssisss', $nombre, $apellido, $telefono, $fechaNac, $contraseña, $correo);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Error al insertar en la base de datos: ' . $stmt->error]);
    }

    $stmt->close();
}

$stmtCheck->close();
$conexion->close();
?>
