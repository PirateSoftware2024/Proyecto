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

if($_SERVER['REQUEST_METHOD'] == 'GET'){
    $accion = $_GET['accion'];
    switch($accion)
        {
            case 'obtenerTodos':            
                $stmt = $pdo->prepare("SELECT * FROM ticket WHERE respuesta IS NULL;");
                $stmt->execute();
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode(['success' => true, 'result' => $result]);
                break;

            case 'obtenerRespuestas':  
                if (isset($_SESSION['usuario'])) {          
                    $idUsuario = $_SESSION['usuario']['idUsuario'];   
                    $stmt = $pdo->prepare("SELECT * FROM ticket WHERE idUsuario = ? AND respuesta IS NOT NULL;");
                    $stmt->execute([$idUsuario]);
                    if($result = $stmt->fetchAll(PDO::FETCH_ASSOC)){
                        echo json_encode(['success' => true, 'result' => $result]);
                    }else{
                        echo json_encode(['success' => false, 'message' => "No tiene tickets"]);
                    } 
                }else{
                    echo json_encode(['success' => false, 'message' => "Inicie sesion para utilizar esta sección"]);
                }
                    break;
        }
    }
?>