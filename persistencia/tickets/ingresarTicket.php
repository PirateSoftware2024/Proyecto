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
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    if (isset($_SESSION['usuario']['idEmpresa']) || isset($_SESSION['usuario']['idUsuario'])) {
        $texto = $_POST['ingresoTicket'];
        $id = null; 

        // Verifica si el usuario es un comprador o una empresa
        if (isset($_SESSION['usuario']['idUsuario'])) {
            $id = $_SESSION['usuario']['idUsuario'];
            $stmt = $pdo->prepare("INSERT INTO ticket (idUsuario, envio, tipo) VALUES (?, ?, 'Comprador');");
        } else {
            $id = $_SESSION['usuario']['idEmpresa'];
            $stmt = $pdo->prepare("INSERT INTO ticket (idUsuario, envio, tipo) VALUES (?, ?, 'Empresa');");
        }

        // Ejecutar la consulta
        if ($stmt->execute([$id, $texto])) {
                echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => "Error al insertar el ticket."]);
        }
    } else {
        echo json_encode(['error' => false, 'message' => "Inicie sesión."]);
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