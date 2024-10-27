<?php
require("../ConexionDB.php");

// Configuración de la base de datos
$host = 'localhost';
$dbname = 'producto';
$username = 'root';
$password = '';

$conexionDB = new ConexionDB($host, $dbname, $username, $password);
$pdo = $conexionDB->getPdo();

// Verificar si se ha enviado el token
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = $_POST['token'];

    // Verificar el token en la base de datos
    $stmt = $pdo->prepare("SELECT email FROM pass_reset WHERE token = ?");
    $stmt->execute([$token]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Establecer el tipo de contenido a JSON
    header('Content-Type: application/json');

    if ($user) {
        // Token válido, puedes retornar el email o cualquier otra información necesaria
        echo json_encode(['success' => true, 'email' => $user['email']]);
    } else {
        // Token inválido o ha expirado
        echo json_encode(['success' => false, 'message' => 'Token inválido o ha expirado.']);
    }
}
?>
