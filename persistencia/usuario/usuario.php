<?php
require("../ConexionDB.php");
header(header: 'Content-Type: application/json');

class ApiUsuarios
{
    private $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function registrar($nombre, $apellido, $telefono, $fechaNac, $contraseña, $correo)
    {
        // Verificar si el correo o el teléfono ya existe
        $stmt = $this->pdo->prepare("SELECT idUsuario FROM usuario WHERE correo = ? OR telefono = ?");
        $stmt->execute([$correo, $telefono]);

        // Verificar si ya existe un usuario con ese correo o teléfono
        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => false, 'error' => 'El correo o el teléfono ya está registrado.']);
        } else {
            // Hash de la contraseña antes de insertarla
            $hashedPassword = password_hash($contraseña, PASSWORD_DEFAULT);

            // Insertar información de usuario en la base de datos
            $stmt = $this->pdo->prepare("INSERT INTO usuario (nombre, apellido, telefono, fechaNac, password, correo, validacion) VALUES (?, ?, ?, ?, ?, ?, ?)");

            if (!$stmt) {
                echo json_encode(['success' => false, 'error' => 'Error en la preparación de la consulta.']);
                exit;
            }

            $validacion = 'Espera';
            if ($stmt->execute([$nombre, $apellido, $telefono, $fechaNac, $hashedPassword, $correo, $validacion])) {
                $idUsuario = $this->pdo->lastInsertId();
                echo json_encode(['success' => true, 'message' => "El id del usuario es: $idUsuario"]);
                /*if(cargarDireccion($conexion, $idUsuario, $localidad, $departamento, $calle, $esquina, $nPuerta, $nApartamento, $cPostal, $indicaciones)){
                    echo json_encode(['success' => true]);
                }*/
            } else {
                echo json_encode(['success' => false, 'error' => 'Error al insertar en la base de datos.']);
            }
        }   
    }

/*function cargarDireccion($idUsuario, $localidad, $departamento, $calle, $esquina, $nPuerta, $nApartamento, $cPostal, $indicaciones){
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
        }*/

    public function obtenerUsuarios()
    {
        $stmt = $this->pdo->prepare("SELECT * FROM usuario WHERE validacion = 'Si'");
        if ($stmt->execute()) {
            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($usuario);
        } else {
            // Error en la consulta
            echo json_encode(['success' => false, 'message' => 'Error']);
        }
    }

    public function datosUsuario($idUsuario)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM usuario WHERE idUsuario = ?");
        if ($stmt->execute([$idUsuario])) {
            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($usuario);
        } else {
            // Error en la consulta
            echo json_encode(['success' => false, 'message' => 'No existe el usuario']);
        }
    }

    public function modificarUsuario($idUsuario, $dato, $columna)
    {
        // Ejecutar la consulta
        if($columna == "telefono"){
            $stmt = $this->pdo->prepare("UPDATE usuario SET telefono = $dato WHERE idUsuario = $idUsuario");
        }else{
            // Consulta SQL para eliminar un registro
            $stmt = $this->pdo->prepare("UPDATE usuario SET $columna = '$dato' WHERE idUsuario = $idUsuario");
        }

        if ($stmt->execute()) {
            // Consulta exitosa
            echo json_encode(['success' => true]);
        } else {
            // Error en la consulta
            echo json_encode(['success' => false, 'error']);
        }
    }

    public function validarUsuario($idUsuario, $opcion)
    {
        if($opcion !== "Si" && $opcion !== "No"){
            echo json_encode(['La opcion es incorrecta']);
            exit();
        }else{
            if ($opcion == "Si") {
                $stmt = $this->pdo->prepare("UPDATE usuario SET validacion = 'Si' WHERE idUsuario = $idUsuario");
            } else {
                $stmt = $this->pdo->prepare("DELETE FROM usuario WHERE idUsuario = $idUsuario");
            }
        }

        if ($stmt->execute()) {
                // Consulta exitosa
                if ($stmt->rowCount() > 0) {
                    echo json_encode(['success' => true]);
                } else {
                    echo json_encode(['El usuario no existe...']);
                }
            } else {
            // Error en la consulta
            echo json_encode(['Error en la consulta']);
        }
    }

    public function usuariosValidar()
    {
        $stmt = $this->pdo->prepare("SELECT * FROM usuario WHERE validacion = 'Espera'");
        if ($stmt->execute()) {
            $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if (!empty($usuarios)) {
                echo json_encode($usuarios);
            } else {
                // No hay usuarios en espera de validación
                echo json_encode(['success' => false, 'message' => 'No hay usuarios en espera de validación']);
            }
        } else {
            // Error en la consulta
            echo json_encode(['success' => false, 'message' => 'Error en la consulta']);
        }
    }
}

// Configuracion de la base de datos
$host = 'localhost';
$dbname = 'producto';
$username = 'root';
$password = '';

$conexionDB = new ConexionDB($host, $dbname, $username, $password);
$pdo = $conexionDB->getPdo();
//Crear la instancia de la clsae Producto con la conexion
$usuario = new ApiUsuarios($pdo);

/////////////////////////////////////////////////////////////////////
// Manejo de solicitudos GET, POST, PUT, y DELETE como ya lo tienes implementado
if($_SERVER['REQUEST_METHOD'] == 'GET'){
    $data = json_decode(file_get_contents('php://input'), true);
    $accion = $_GET['accion'];
    switch($accion)
    {
        case 'datosUsuario':
            session_start();
            $idUsuario = $_SESSION['usuario']['idUsuario'];
            $usuario->datosUsuario($idUsuario);
            break;
        
        case 'obtenerUsuarios':
            $usuario->obtenerUsuarios();
            break;
        
        case 'usuariosValidar':
            $usuario->usuariosValidar();
            break;
    }
}

/////////////////////////////////////////////////////////////////////

if($_SERVER['REQUEST_METHOD'] == 'POST'){
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
    /*$departamento = $_POST['departamentos'];
    $localidad = $_POST['localidad'];
    $calle = $_POST['calle'];
    $esquina = $_POST['esquina'];
    $nPuerta = $_POST['nPuerta'];
    $nApartamento = $_POST['nApartamento'];
    $cPostal = $_POST['cPostal'];
    $indicaciones = $_POST['indicaciones'];*/
    /////////////////////////////////////
    $usuario->registrar($nombre, $apellido, $telefono, $fechaNac, $contraseña, $correo);
}

////////////////////////////////////////////////////////////////////////

if($_SERVER['REQUEST_METHOD'] == 'PUT'){
    $data = json_decode(file_get_contents('php://input'), true);
    $accion = $data['accion'];


    switch($accion)
    {
        case 'modificar':
            session_start();
            $idUsuario = $_SESSION['usuario']['idUsuario'];
            $dato = $data['dato'];
            $columna = $data['columna'];
            $usuario->modificarUsuario($idUsuario, $dato, $columna);
            break;

        case 'validar':
            $idUsuario = $data['idUsuario'];
            $opcion = $data['opcion'];
            $usuario->validarUsuario($idUsuario, $opcion);
            break;
    }
}

////////////////////////////////////////////////////////////////////////
/*if($_SERVER['REQUEST_METHOD'] == 'DELETE'){
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];
    // Formas de validar
    if($id < 5)
    {
        echo "Error...";
        exit(); // Deja de ejecutar el archivo
    }
    $producto->eliminar($id);
}*/
?>