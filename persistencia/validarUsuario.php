<?php
header('Content-Type: application/json');
$server = "localhost";
$user = "root";
$pass = "";
$db = "producto";

// Conectar a la base de datos
$conexion = new mysqli($server, $user, $pass, $db);

if ($conexion->connect_errno) {
    die(json_encode(['success' => false, 'error' => "Conexión fallida: " . $conexion->connect_errno]));
} 

// Obtener los datos enviados por POST
$data = json_decode(file_get_contents('php://input'), true);
$idUsuario = $data['id'];
$opcion = $data['opcion'];

// Validar que los datos no estén vacíos
if (empty($idUsuario) || empty($opcion)) {
    echo json_encode(['success' => false, 'error' => 'Faltan datos']);
    mysqli_close($conexion);
    exit();
}

// Actualizar la validación en la base de datos
if ($opcion == "Si") {
    $sql = "UPDATE usuario SET validacion = 'Si' WHERE idUsuario = $idUsuario";
} else {
    $sql = "DELETE FROM usuario WHERE idUsuario = $idUsuario";
}

if (mysqli_query($conexion, $sql)) {
    // Consulta exitosa
    echo json_encode(['success' => true]);
    } else {
    // Error en la consulta
    echo json_encode(['success' => false, 'error' => mysqli_error($conexion)]);
}


mysqli_close($conexion);
?>
