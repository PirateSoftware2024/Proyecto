<?php
// Configuración de la base de datos
$host = 'localhost'; 
$user = 'root'; 
$pass = ''; 
$dbname = 'producto'; 

// Crear conexión a la base de datos
$conexion = new mysqli($host, $user, $pass, $dbname);

// Verificar conexión
if ($conexion->connect_error) {
    die('Error de conexión: ' . $conexion->connect_error);
}

// Obtener valores del formulario
$correo = $_POST['correo'];
$contraseña = $_POST['contraseña'];
$tipoUsuario = $_POST['tipoCuenta'];

if( $tipoUsuario === 'comprador'){
    // Preparar la consulta SQL
    $sql = "SELECT COUNT(*) AS count FROM usuario WHERE correo = ? AND password = ? AND validacion = 'Si'"; // Retorna columnas con ese correo y contraseña
    $stmt = $conexion->prepare($sql);
}else{
    $sql = "SELECT COUNT(*) AS count FROM empresa WHERE correo = ? AND contraseña = ?"; // Retorna columnas con ese correo y contraseña
    $stmt = $conexion->prepare($sql);
}


// Verificar si la preparación de la declaración SQL fue exitosa
if (!$stmt) {
    die('Error en la preparación de la declaración: ' . $conexion->error);
}

// Vincular los parámetros
$stmt->bind_param('ss', $correo, $contraseña);

// Ejecutar la consulta
$stmt->execute();

// Obtener el resultado
$result = $stmt->get_result();
$row = $result->fetch_assoc();

// Verificar si se encontró al usuario
if ($row['count'] > 0) {
    echo json_encode(['success' => true, 'message' => 'Usuario encontrado.']);
    obtenerDatosComprador($conexion);
} else {
    echo json_encode(['success' => false, 'message' => 'Usuario no encontrado.']);
}

// Cerrar la declaración y la conexión
$stmt->close();
$conexion->close();

function obtenerDatosComprador($conexion) {   
    session_start(); // Iniciamos la sesion, con los datos del usuario
    $sql = "SELECT * FROM usuario WHERE validacion = 'Si'";
    $datos = mysqli_query($conexion, $sql);

    $arrayDatos = mysqli_fetch_all($datos, MYSQLI_ASSOC); // Obtenemos los datos como array asociativo
    $_SESSION['usuario'] = $arrayDatos; // Los guardamos en la session usuario
}

?>