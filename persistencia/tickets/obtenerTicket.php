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
                        if (isset($_SESSION['usuario']['idUsuario'])) {       
                            $id = $_SESSION['usuario']['idUsuario'];   
                            $stmt = $pdo->prepare("SELECT * FROM ticket WHERE idUsuario = ? AND respuesta IS NOT NULL AND tipo = 'Comprador';");
                        } else { // Cambié 'esle' por 'else'
                            $id = $_SESSION['usuario']['idEmpresa'];  
                            $stmt = $pdo->prepare("SELECT * FROM ticket WHERE idUsuario = ? AND respuesta IS NOT NULL AND tipo = 'Empresa';"); 
                        }
                
                        // Cambié $idUsuario a $id ya que es el ID correcto que estamos utilizando
                        $stmt->execute([$id]); 
                        if($result = $stmt->fetchAll(PDO::FETCH_ASSOC)){
                            echo json_encode(['success' => true, 'result' => $result]);
                        } else {
                            echo json_encode(['success' => false, 'message' => "No tiene tickets"]);
                        } 
                    } else {
                        echo json_encode(['success' => false, 'message' => "Inicie sesión para utilizar esta sección"]);
                    }
                    break;
                
        }
    }
?>