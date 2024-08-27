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
$rut = $_POST['rut'];
$numeroCuenta = $_POST['nCuenta'];
$telefono = $_POST['telefono'];
$departamento = $_POST['departamentos'];
$calle = $_POST['calle'];
$numero = $_POST['numero'];
$nApartamento = $_POST['nApartamento'];
$correo = $_POST['correo'];
$password = $_POST['password'];

// Verificar si el correo o teléfono ya existe
$sqlCheck = "SELECT idEmpresa FROM empresa WHERE correo = ? OR telefono = ? OR rut = ? OR numeroCuenta = ?";
$stmtCheck = $conexion->prepare($sqlCheck);
$stmtCheck->bind_param('ssss', $correo, $telefono, $rut, $numeroCuenta);
$stmtCheck->execute();
$stmtCheck->store_result();

if ($stmtCheck->num_rows > 0) {
    // Si ya existe un usuario con ese correo o teléfono
    echo json_encode(['success' => false, 'error' => 'El correo o el teléfono ya está registrado.']);
    $stmtCheck->close();
    $conexion->close();
    exit;
}

// Insertar información en la base de datos
$sql = "INSERT INTO empresa (nombre, rut, numeroCuenta, telefono, departamento, calle, numero, nroApartamento, correo, contraseña) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conexion->prepare($sql);

// Verificar si la preparación de la declaración SQL fue exitosa
if (!$stmt) {
    echo json_encode(['success' => false, 'error' => 'Error en la preparación de la declaración: ' . $conexion->error]);
    $conexion->close();
    exit;
}

// Vincular parámetros correctamente
$stmt->bind_param('ssssssisss', $nombre, $rut, $numeroCuenta, $telefono, $departamento, $calle, $numero, $nApartamento, $correo, $password);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Error al insertar en la base de datos: ' . $stmt->error]);
}

$stmt->close();
$conexion->close();
?>
