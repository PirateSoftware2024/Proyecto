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

// Iniciar sesión
session_start();

// Obtener valores del formulario
$correo = $_POST['correo'] ?? null; // Usar null coalescing para evitar Undefined Index
$contraseña = $_POST['contraseña'] ?? null; // Lo mismo aquí

// Preparar la consulta
$stmt = $pdo->prepare("SELECT * FROM vista_usuarios_empresas WHERE correo = ?");

if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Error en la preparación de la consulta.']);
    exit;
}

// Ejecutar la consulta
$stmt->execute([$correo]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result) {
    $contraseñaAlmacenada = $result['password'];
    // Verificar la contraseña ingresada con la almacenada (hash)
    if (password_verify($contraseña, $contraseñaAlmacenada)) {
        // Guardar los datos en la sesión
        $tipoUsuario = $result['tipo'];
        $idUsuario = $result['id'];
        
        if ($tipoUsuario === 'Comprador') {
            $stmt = $pdo->prepare("SELECT * FROM usuario WHERE idUsuario = ?");
            $stmt->execute([$idUsuario]); // Corregido aquí
            $datosUsuario = $stmt->fetch(PDO::FETCH_ASSOC);
            $_SESSION['usuario'] = $datosUsuario; // Guardamos en la sesión
        } else {
            $stmt = $pdo->prepare("SELECT * FROM empresa WHERE idEmpresa = ?");
            $stmt->execute([$idUsuario]);
            $datosUsuario = $stmt->fetch(PDO::FETCH_ASSOC);
            $_SESSION['usuario'] = $datosUsuario; // Guardamos en la sesión
        }
        
        $_SESSION['usuario']['tipo'] = $tipoUsuario;
        $_SESSION['loggedin'] = true;

        // Enviar la respuesta JSON final
        if($idUsuario === "1"){
            echo json_encode(['success' => true, 'tipo' => "admin"]);
        } else {
            echo json_encode(['success' => true, 'tipo' => $result['tipo']]);
        }

    } else {
        echo json_encode(['success' => false, 'message' => 'Contraseña incorrecta.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Usuario no encontrado.']);
}
