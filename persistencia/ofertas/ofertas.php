<?php
require("../ConexionDB.php");
header('Content-Type: application/json');
session_start();

$host = 'localhost';
$dbname = 'producto';
$username = 'root';
$password = '';

$conexionDB = new ConexionDB($host, $dbname, $username, $password);
$pdo = $conexionDB->getPdo();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $descuento = $_POST['descuento'];
    $fechaExpiracion = $_POST['fechaExpiracion'];
    $nombre = $_POST['nombre'];

    // Verificar si ya existe una oferta activa
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM ofertas");
    $stmt->execute();
    $ofertaActiva = $stmt->fetchColumn();

    if ($ofertaActiva > 0) {
        echo json_encode(['success' => false, 'message' => 'Ya hay una oferta activa.']);
        exit;
    }

    // Inserción en la base de datos
    $stmt = $pdo->prepare("INSERT INTO ofertas (nombre, descuento, fecha_expiracion) VALUES (?, ?, ?)");
    
    if ($stmt->execute([$nombre, $descuento, $fechaExpiracion])) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al agregar la oferta.']);
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $inputData = file_get_contents("php://input");
    $data = json_decode($inputData, true); // Decodificar si es JSON

    $idOferta = $data['idOferta'];
    
    $stmt = $pdo->prepare("DELETE FROM ofertas WHERE id = ?;");          
    if($stmt->execute([$idOferta])){
        echo json_encode(['success' => true]);
    }else{
        echo json_encode(['success' => false]);
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['accion']) && $_GET['accion'] == 'obtener') {
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM ofertas");
        $stmt->execute();
        $ofertaActiva = $stmt->fetchColumn();

        if ($ofertaActiva < 1) {
            echo json_encode(['success' => false, 'message' => 'No hay ofertas activas.']);
            exit;
        }

        // Solo se ejecuta si hay ofertas activas
        $stmt = $pdo->prepare("SELECT * FROM ofertas;");
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode(['success' => true, 'result' => $result]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Acción no válida']);
    }
}

?>
