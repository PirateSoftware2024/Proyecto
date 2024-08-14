
<?php 
header('Content-Type: application/json');
$server = "localhost";
$user = "root";
$pass = "";
$db = "producto";

$conexion = new mysqli($server, $user, $pass, $db);

if ($conexion->connect_errno) {
    die("Conexión fallida: " . $conexion->connect_errno);
} else {
    obtenerDatos($conexion);
}

function obtenerDatos($conexion) {   
    $data = json_decode(file_get_contents('php://input'), true);
    // Obtener los datos de la solicitud POST
    $idUser = $data['idUser'];
    $dato = $data['dato'];
    $columna = $data['columna'];

    if($columna == "telefono"){
        $sql = "UPDATE usuario SET telefono = $dato WHERE idUsuario = $idUser";
    }else{
        // Consulta SQL para eliminar un registro
        $sql = "UPDATE usuario SET $columna = '$dato' WHERE idUsuario = $idUser";
    }
    // Ejecutar la consulta
    if (mysqli_query($conexion, $sql)) {
        // Consulta exitosa
        echo json_encode(['success' => true]);
    } else {
        // Error en la consulta
        echo json_encode(['success' => false, 'error' => mysqli_error($conexion)]);
    }

    // Cerrar la conexión
    mysqli_close($conexion);
}
?>