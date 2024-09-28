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
    echo json_encode(['success' => false, 'error' => 'Error de conexión: ' . $conexion->connect_error]);
    exit;
}

// Obtener valores de POST
// Datos Personales
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$telefono = $_POST['telefono'];
$fechaNac = $_POST['fecha'];
$contraseña = $_POST['contraseña'];
$correo = $_POST['correo'];
/////////////////////////////////////
// Dirección
$departamento = $_POST['departamentos'];
$localidad = $_POST['localidad'];
$calle = $_POST['calle'];
$esquina = $_POST['esquina'];
$nPuerta = $_POST['nPuerta'];
$nApartamento = $_POST['nApartamento'];
$cPostal = $_POST['cPostal'];
$indicaciones = $_POST['indicaciones'];
/////////////////////////////////////

// Verificar si el correo ya existe
$sqlCheck = "SELECT idUsuario FROM usuario WHERE correo = ? OR telefono = ?";
$stmtCheck = $conexion->prepare($sqlCheck);
$stmtCheck->bind_param('ss', $correo, $telefono);
$stmtCheck->execute();
$stmtCheck->store_result();

if ($stmtCheck->num_rows > 0) {
    echo json_encode(['success' => false, 'error' => 'El correo o el teléfono ya está registrado.']);
} else {
    // Insertar información de usuario en la base de datos
    $sql = "INSERT INTO usuario (nombre, apellido, telefono, fechaNac, password, correo, validacion) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conexion->prepare($sql);

    if (!$stmt) {
        echo json_encode(['success' => false, 'error' => 'Error en la preparación de la declaración: ' . $conexion->error]);
        exit;
    }

    $validacion = 'Espera';
    $stmt->bind_param('sssssss', $nombre, $apellido, $telefono, $fechaNac, $contraseña, $correo, $validacion);

    if ($stmt->execute()) {
        $idUsuario = $stmt->insert_id;
        if(cargarDireccion($conexion, $idUsuario, $localidad, $departamento, $calle, $esquina, $nPuerta, $nApartamento, $cPostal, $indicaciones)){
            echo json_encode(['success' => true]);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Error al insertar en la base de datos: ' . $stmt->error]);
    }

    $stmt->close();
}


function cargarDireccion($conexion, $idUsuario, $localidad, $departamento, $calle, $esquina, $nPuerta, $nApartamento, $cPostal, $indicaciones){
    $sql = "INSERT INTO direcciones (idUsuario, departamento, localidad, calle, esquina, numeroPuerta, numeroApto, cPostal, indicaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conexion->prepare($sql);

    if (!$stmt) {
        echo json_encode(['success' => false, 'error' => 'Error en la preparación de la declaración: ' . $conexion->error]);
        exit;
    }

    $stmt->bind_param('issssssis', $idUsuario, $departamento, $localidad, $calle, $esquina, $nPuerta, $nApartamento, $cPostal, $indicaciones);

    if ($stmt->execute()) {
        return true;
    }else{
        return false;
    }
    $stmt->close();
}

$stmtCheck->close();
$conexion->close();
?>