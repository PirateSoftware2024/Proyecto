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
        $stmt = $this->pdo->prepare("SELECT * FROM vista_usuarios_empresas WHERE correo = ? OR telefono = ?");
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

        // Construir la consulta SQL
        if ($tabla === "empresa") {
            $idColumn = 'idEmpresa';
        } else if($tabla === "usuario"){
            $idColumn = 'idUsuario';
        }else{
            if (isset($_SESSION['usuario']['idUsuario'])) { 
                $idColumn = 'idUsuario';
            }else{
                $idColumn = 'idEmpresa';
            }
        }


        // Preparar y ejecutar la consulta
        $sql = "UPDATE $tabla SET $columna = :dato WHERE $idColumn = :id";
        $stmt = $this->pdo->prepare($sql);
    
        // Asignar los valores a los parámetros
        $stmt->bindParam(':dato', $dato);
        $stmt->bindParam(':id', $idUsuario, PDO::PARAM_INT);

        // Ejecutar y manejar el resultado
        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            $errorInfo = $stmt->errorInfo();
            echo json_encode(['success' => false, 'error' => $errorInfo[2]]);
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

    public function verificarContra($contra, $idUsuario, $tabla, $col)
    {
        $stmt = $this->pdo->prepare("SELECT password FROM $tabla WHERE $col = ?");
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

    function buscarPorNombre($dato)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM usuario WHERE nombre = ? OR idUsuario = ?");
        $stmt->execute([$dato, $dato]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function eliminarUsuario($id)
    {
        // Verificar si el producto está en un carrito
        $stmt = $this->pdo->prepare("SELECT COUNT(*) as conteo 
                                    FROM paquete p
                                    JOIN usuario u ON u.idUsuario = p.idUsuario
                                    WHERE p.idUsuario = ? AND p.estadoEnvio= 'Entregado';");
        $stmt->execute([$id]);
        $result = $stmt->fetch();

        if ($result){
            if ($result['conteo'] > 0){
                // Producto está en un carrito, no se puede modificar el precio
                echo json_encode(['success' => false, 'error' => 'No se puede eliminar la cuenta porque tiene compras pendientes.']);
                return;
            } 
        }else{
            // Error al verificar la existencia del producto en un carrito
            echo json_encode(['success' => false, 'error' => 'Error al verificar el carrito']);
            return;
        }

        $stmt = $this->pdo->prepare("DELETE FROM usuario WHERE idUsuario = ?");
        if ($stmt->execute([$id])) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Error al eliminar el producto']);
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
        
        case 'buscarPorNombre':
            $dato = isset($_GET['dato']) ? $_GET['dato'] : null; // Verifica que 'dato' esté definido
            if ($dato !== null) {
                $usuarios = $usuario->buscarPorNombre($dato);
                // Verifica si se encontraron usuarios
                if (!empty($usuarios)) {
                    echo json_encode(['success' => true, 'data' => $usuarios]);
                } else {
                    echo json_encode(['success' => false, 'error' => 'No se encontraron usuarios.']);
                }
            } else {
                echo json_encode(['success' => false, 'error' => 'Dato no proporcionado.']);
            }
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
    $usuario->registrar($nombre, $apellido, $telefono, $fechaNac, $contraseña, $correo, $departamento, $localidad, $calle, $esquina, $nPuerta, $nApartamento, $cPostal, $indicaciones);
    break;

    case 'verificarContra':
        session_start();
        if (isset($_SESSION['usuario']['idUsuario'])) {
            $tabla = "usuario";
            $col = "idUsuario";
        }else{
            $tabla = "empresa";
            $col = "idEmpresa";
        }
        $idUsuario = $_SESSION['usuario']['idUsuario'] ?? $_SESSION['usuario']['idEmpresa'] ?? $data['idUsuario'];
        //$idUsuario = $data['idUsuario'];
        $contra = $data['contra'];
        $usuario->verificarContra($contra, $idUsuario, $tabla, $col);
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
            $idUsuario = $_SESSION['usuario']['idUsuario'] ?? $_SESSION['usuario']['idEmpresa'] ?? $data['idUsuario'];
            $dato = $data['dato'];
            $columna = $data['columna'];
            $tabla = $data['tabla'];
            $usuario->modificarUsuario($idUsuario, $dato, $columna, $tabla);
            break;
    }
}

////////////////////////////////////////////////////////////////////////
if($_SERVER['REQUEST_METHOD'] == 'DELETE'){
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];
    $usuario->eliminarUsuario($id);
}
?>