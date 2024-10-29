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
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $inputData = file_get_contents("php://input");
    $data = json_decode($inputData, true); // Decodificar si es JSON

    $respuesta = $data['respuesta'];
    $idTicket = $data['idTicket'];
    
    $stmt = $pdo->prepare("UPDATE ticket SET respuesta = ? WHERE id = ?;");          
    if($stmt->execute([$respuesta, $idTicket])){
        echo json_encode(['success' => true]);
    }else{
        echo json_encode(['success' => false]);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $inputData = file_get_contents("php://input");
    $data = json_decode($inputData, true); // Decodificar si es JSON

    $idTicket = $data['idTicket'];
    
    $stmt = $pdo->prepare("DELETE FROM ticket WHERE id = ?;");          
    if($stmt->execute([$idTicket])){
        echo json_encode(['success' => true]);
    }else{
        echo json_encode(['success' => false]);
    }
}
?>