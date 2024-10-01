<?php

require("ConexionDB.php");
header('Content-Type: application/json');

// Configuración de la base de datos
$host = 'localhost';
$dbname = 'producto';
$username = 'root';
$password = '';

$conexionDB = new ConexionDB($host, $dbname, $username, $password);
$pdo = $conexionDB->getPdo();

// Obtener valores del formulario
$correo = $_POST['correo'];
$contraseña = $_POST['contraseña'];  // Esta será la contraseña ingresada
$tipoUsuario = $_POST['tipoCuenta'];

if ($tipoUsuario === 'comprador') {
    $stmt = $pdo->prepare("SELECT password FROM usuario WHERE correo = ? AND validacion = 'Si'");
} else {
    $stmt = $pdo->prepare("SELECT password FROM empresa WHERE correo = ?");
}

// Verificar si la preparación de la declaración SQL fue exitosa
if (!$stmt) {
    die(json_encode(['success' => false, 'message' => 'Error en la preparación de la consulta.']));
}
// Ejecutar la consulta
$stmt->execute([$correo]);
// Obtener el resultado
$result = $stmt->fetch(PDO::FETCH_ASSOC);
// Verificar si se encontró al usuario
if ($result) {
    $contraseñaAlmacenada = $result['password'];
    // Verificar la contraseña ingresada con la almacenada (hash)
    if (password_verify($contraseña, $contraseñaAlmacenada)) {
        echo json_encode(['success' => true, 'message' => 'Contraseña válida.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Contraseña incorrecta.']);
    }

} else {
    echo json_encode(['success' => false, 'message' => 'Usuario no encontrado.']);
}