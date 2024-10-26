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
    public function registrar($nombre, $apellido, $telefono, $fechaNac, $contraseña, $correo, $localidad, $departamento, $calle, $esquina, $nPuerta, $nApartamento, $cPostal, $indicaciones)
    {
        // Verificar si el correo o el teléfono ya existe
        $stmt = $this->pdo->prepare("SELECT idUsuario FROM usuario WHERE correo = ? OR telefono = ?");
        $stmt->execute([$correo, $telefono]);

        // Verificar si ya existe un usuario con ese correo o teléfono
        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => false, 'error' => 'El correo o el teléfono ya está registrado.']);
            return;
        }

        // Hash de la contraseña antes de insertarla
        $hashedPassword = password_hash($contraseña, PASSWORD_DEFAULT);

        // Insertar información de usuario en la base de datos
        $stmt = $this->pdo->prepare("INSERT INTO usuario (nombre, apellido, telefono, fechaNac, password, correo) VALUES (?, ?, ?, ?, ?, ?)");

        if (!$stmt) {
            echo json_encode(['success' => false, 'error' => 'Error en la preparación de la consulta.']);
            return;
        }

        if ($stmt->execute([$nombre, $apellido, $telefono, $fechaNac, $hashedPassword, $correo])) {
            $idUsuario = $this->pdo->lastInsertId();  // Obtener el ID del usuario insertado

            // Intentar registrar la dirección
            if ($this->cargarDireccion($idUsuario, $localidad, $departamento, $calle, $esquina, $nPuerta, $nApartamento, $cPostal, $indicaciones)) {
                // Solo enviar una respuesta si todo fue exitoso
                echo json_encode(['success' => true, 'message' => "Usuario y dirección registrados correctamente."]);
            } else {
                echo json_encode(['success' => false, 'error' => 'Error al registrar la dirección.']);
            }
        } else {
            echo json_encode(['success' => false, 'error' => 'Error al insertar en la base de datos.']);
        }
    }

    function cargarDireccion($idUsuario, $localidad, $departamento, $calle, $esquina, $nPuerta, $nApartamento, $cPostal, $indicaciones)
    {
        $stmt = $this->pdo->prepare("INSERT INTO direcciones (idUsuario, departamento, localidad, calle, esquina, numeroPuerta, numeroApto, cPostal, indicaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

        if (!$stmt) {
            return false;  // Retornar false si hay un problema en la preparación
        }

        if ($stmt->execute([$idUsuario, $localidad, $departamento, $calle, $esquina, $nPuerta, $nApartamento, $cPostal, $indicaciones])) {
            return true; // Retornar true si se insertó correctamente
        } else {
            return false; // Retornar false si hubo un error al ejecutar la consulta
        }
    }

    public function obtenerUsuarios()
    {
        $stmt = $this->pdo->prepare("SELECT * FROM usuario");
        if ($stmt->execute()) {
            $usuario = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($usuario);
        } else {
            // Error en la consulta
            echo json_encode(['success' => false, 'message' => 'Error']);
        }
    }

    public function datosUsuario($idUsuario)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM usuario u
                                    JOIN direcciones d ON d.idUsuario = u.idUsuario
                                    WHERE u.idUsuario = ?");
        if ($stmt->execute([$idUsuario])) {
            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($usuario);
        } else {
            // Error en la consulta
            echo json_encode(['success' => false, 'message' => 'No existe el usuario']);
        }
    }

    public function modificarUsuario($idUsuario, $dato, $columna, $tabla)
    {   
        // Hash de la contraseña antes de insertarla
        if ($columna == "password") {
            $dato = password_hash($dato, PASSWORD_DEFAULT);
        }

        // Ejecutar la consulta
        if($columna == "telefono"){
            $stmt = $this->pdo->prepare("UPDATE $tabla SET telefono = $dato WHERE idUsuario = $idUsuario");
        }else{
            // Consulta SQL para eliminar un registro
            $stmt = $this->pdo->prepare("UPDATE $tabla SET $columna = '$dato' WHERE idUsuario = $idUsuario");
        }

        if ($stmt->execute()) {
            // Consulta exitosa
            echo json_encode(['success' => true]);
        } else {
            // Error en la consulta
            echo json_encode(['success' => false, 'error']);
        }
    }

    public function graficaDatos()
    {
        $stmt = $this->pdo->prepare("SELECT c.idUsuario, u.nombre, COUNT(*) AS compras
                                    FROM carrito c
                                    JOIN usuario u ON u.idUsuario = c.idUsuario
                                    WHERE c.estadoCarrito = 'Confirmado'
                                    GROUP BY c.idUsuario, u.nombre
                                    ORDER BY compras DESC
                                    LIMIT 10;");

        if ($stmt->execute()) {
            $datos = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if (!empty($datos)) {
                echo json_encode($datos);
            } else {
                // No hay usuarios en espera de validación
                echo json_encode(['success' => false, 'message' => 'No hay usuarios']);
            }
        } else {
            // Error en la consulta
            echo json_encode(['success' => false, 'message' => 'Error en la consulta']);
        }
    }

    public function verificarContra($contra, $idUsuario)
    {
        $stmt = $this->pdo->prepare("SELECT password FROM usuario WHERE idUsuario = ?");
        $stmt->execute([$idUsuario]);
        // Obtener el resultado
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verificar si se encontró al usuario
        if ($result) {
            $contraseñaAlmacenada = $result['password'];

            // Verificar la contraseña ingresada con la almacenada (hash)
            if (password_verify($contra, $contraseñaAlmacenada)) {
                echo json_encode(['success' => true, 'message' => 'Contraseña correcta']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Contraseña incorrecta']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al obtener la contraseña']);
        }
    }

    public function resetPass($contra, $idUsuario)
    {
        // Hash de la contraseña antes de insertarla
        $hashedPassword = password_hash($contra, PASSWORD_DEFAULT);

        $stmt = $this->pdo->prepare("UPDATE usuario SET password= ? WHERE idUsuario = ?");
        $stmt->execute([$hashedPassword, $idUsuario]);
        // Obtener el resultado


        if ($stmt->execute()) {
            // Consulta exitosa
            echo json_encode(['success' => true]);
        } else {
            // Error en la consulta
            echo json_encode(['success' => false, 'error']);
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

        case 'grafica':
            $usuario->graficaDatos();
            break;
    }
}

/////////////////////////////////////////////////////////////////////

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    // Obtener valores de POST
    // Datos Personales
    $data = json_decode(file_get_contents('php://input'), true);
    $accion = $data['accion'];
    
    switch($accion)
    {
        case 'registrar':
    $nombre = $data['nombre'];
    $apellido = $data['apellido'];
    $telefono = $data['telefono'];
    $fechaNac = $data['fecha'];
    $contraseña = $data['contraseña'];
    $correo = $data['correo'];
    /////////////////////////////////////
    // Dirección
    $departamento = $data['departamentos'];
    $localidad = $data['localidad'];
    $calle = $data['calle'];
    $esquina = $data['esquina'];
    $nPuerta = $data['nPuerta'];
    $nApartamento = $data['nApartamento'];
    $cPostal = $data['cPostal'];
    $indicaciones = $data['indicaciones'];
    /////////////////////////////////////
    $usuario->registrar($nombre, $apellido, $telefono, $fechaNac, $contraseña, $correo, $departamento, $localidad, $calle, $esquina, $nPuerta, $nApartamento, $cPostal, $indicaciones);
    break;

    case 'verificarContra':
        session_start();
        $idUsuario = $_SESSION['usuario']['idUsuario'];
        $contra = $data['contra'];
        $usuario->verificarContra($contra, $idUsuario);
        break;
    }
}

////////////////////////////////////////////////////////////////////////

if($_SERVER['REQUEST_METHOD'] == 'PUT'){
    $data = json_decode(file_get_contents('php://input'), true);
    $accion = $data['accion'];


    switch($accion)
    {
        case 'contraReset':
            $dato = $data['contra'];
            $id = $data['id'];
            $usuario->resetPass($dato, $id);
            break;

        case 'modificar':
            session_start();
            $idUsuario = $_SESSION['usuario']['idUsuario'];
            $dato = $data['dato'];
            $columna = $data['columna'];
            $tabla = $data['tabla'];
            $usuario->modificarUsuario($idUsuario, $dato, $columna, $tabla);
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