<?php
// Incluir las clases necesarias de PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require("../ConexionDB.php");
// Configuracion de la base de datos
$host = 'localhost';
$dbname = 'producto';
$username = 'root';
$password = '';

$conexionDB = new ConexionDB($host, $dbname, $username, $password);
$pdo = $conexionDB->getPdo();

// Recibir el correo electrónico del formulario
$email = $_POST['email']; // Asegúrate de validar y sanitizar esta entrada


$stmt = $pdo->prepare("SELECT idUsuario, COUNT(*) as count FROM usuario WHERE correo = ? AND validacion = 'Si'");
if (!$stmt) {
    die(json_encode(['success' => false, 'message' => 'Error en la preparación de la consulta.']));
}

$stmt->execute([$email]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result['count'] < 1) {
    echo json_encode(['success' => false, 'message' => 'Usuario no encontrado.']);
    return;
} 


    require 'C:\xampp\htdocs\PHPMailer\src\Exception.php'; // Ajusta la ruta
    require 'C:\xampp\htdocs\PHPMailer\src\PHPMailer.php'; // Ajusta la ruta
    require 'C:\xampp\htdocs\PHPMailer\src\SMTP.php'; // Ajusta la ruta

    // Generar un token aleatorio de 6 dígitos
    $token = mt_rand(100000, 999999);

    // Guardar el token en la base de datos
    $stmt = $pdo->prepare("INSERT INTO pass_reset (email, token) VALUES (?, ?)");
    $stmt->execute([$email, $token]);

    // Configuración de PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Configuración del servidor
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'noreplyaxiemarket@gmail.com';
        $mail->Password = 'munxlimofkyyfskn'; // Asegúrate de usar la contraseña de aplicación aquí
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Establecer la codificación de caracteres
        $mail->CharSet = 'UTF-8';

        // Destinatarios
        $mail->setFrom('noreplyaxiemarket@gmail.com', 'Nombre del Remitente');
        $mail->addAddress($email);

        // Contenido
        $mail->isHTML(true);
        $mail->Subject = 'Restablecer su contraseña';
        $mail->Body = 'Token para restablecer su contraseña en Axie Market<br>
                   <p>' . htmlspecialchars($token) . '</p>'; // Escapar el token

        $mail->send(); // Envía el correo
        echo json_encode(['success' => true, 'message' => 'Correo enviado.', 'idUsuario' => $result['idUsuario']]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Error al enviar el correo: {$mail->ErrorInfo}']);
    }
?>
