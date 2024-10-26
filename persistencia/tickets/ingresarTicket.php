<?php
require("../ConexionDB.php");
header('Content-Type: application/json');
session_start();
// Configuración de la base de datos
$host = 'localhost';
$dbname = 'producto';
$username = 'root';
$password = '';

$conexionDB = new ConexionDB($host, $dbname, $username, $password);
$pdo = $conexionDB->getPdo();

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $texto = $_POST['ingresoTicket'];
    $idUsuario = $_SESSION['usuario']['idUsuario'];
    
    $stmt = $pdo->prepare("INSERT INTO ticket (idUsuario, envio) VALUES (?, ?);");
    if($stmt->execute([$idUsuario, $texto])){
        echo json_encode(['success' => true]);
    }else{
        echo json_encode(['success' => false]);
    }
} else {
    echo json_encode(["Metodo incorrecto"]);
}
?>