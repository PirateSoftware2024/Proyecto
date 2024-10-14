<?php
require("../ConexionDB.php");
header(header: 'Content-Type: application/json');

class ApiEmpresa
{
    private $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function obtenerDatos($idEmpresa)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM producto WHERE idEmpresa = $idEmpresa");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function ventasEmpresa($idEmpresa)
    {
        $stmt = $this->pdo->prepare("SELECT c.idCarrito, u.nombre nomUsuario, p.nombre nomProducto, a.cantidad, a.cantidad * a.precio total, c.idPaquete, c.fecha
            FROM almacena a
            JOIN producto p ON p.id = a.id
            JOIN carrito c ON c.idCarrito = a.idCarrito
            JOIN usuario u ON u.idUsuario = c.idUsuario
            WHERE c.estadoCarrito = 'Confirmado' AND idEmpresa = ?;");
        
        $stmt->execute([$idEmpresa]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function registro($nombre, $rut, $numeroCuenta, $telefono, $correo, $password,  $departamento, $localidad, $calle, $esquina, $nPuerta, $nApartamento, $cPostal, $indicaciones)
    {
        // Verificar si el correo, teléfono, rut o número de cuenta ya están registrados
        $stmt = $this->pdo->prepare("SELECT idEmpresa FROM empresa WHERE correo = ? OR telefono = ? OR rut = ? OR numeroCuenta = ?");
        $stmt->execute([$correo, $telefono, $rut, $numeroCuenta]);
    
        // Verificar si ya existe un registro con esos datos
        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => false, 'error' => 'El correo, teléfono, RUT o número de cuenta ya está registrado.']);
            return;
        }

        // Hash de la contraseña antes de insertarla en la base de datos
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Insertar información de la empresa en la base de datos
        $stmt = $this->pdo->prepare("INSERT INTO empresa (nombre, rut, numeroCuenta, telefono, correo, password) VALUES (?, ?, ?, ?, ?, ?)");

        // Verificar si la preparación de la declaración SQL fue exitosa
        if (!$stmt) {
            echo json_encode(['success' => false, 'error' => 'Error en la preparación de la declaración.']);
            return;
        }
        
        ////////////////////////
        if ($stmt->execute([$nombre, $rut, $numeroCuenta, $telefono, $correo, $hashedPassword])) {
            $idEmpresa = $this->pdo->lastInsertId();  // Obtener el ID del usuario insertado

            // Intentar registrar la dirección
            if ($this->cargarDireccion($idEmpresa, $departamento, $localidad, $calle, $esquina, $nPuerta, $nApartamento, $cPostal, $indicaciones)) {
                // Solo enviar una respuesta si todo fue exitoso
                echo json_encode(['success' => true, 'message' => "Usuario y dirección registrados correctamente."]);
            } else {
                echo json_encode(['success' => false, 'error' => 'Error al registrar la dirección.']);
            }
        } else {    
            echo json_encode(['success' => false, 'error' => 'Error al insertar en la base de datos.']);
        }  
    }

    
    function cargarDireccion($idEmpresa, $departamento, $localidad, $calle, $esquina, $nPuerta, $nApartamento, $cPostal, $indicaciones)
    {
        $stmt = $this->pdo->prepare("INSERT INTO direcciones (idEmpresa, departamento, localidad, calle, esquina, numeroPuerta, numeroApto, cPostal, indicaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

        if (!$stmt) {
            return false;  // Retornar false si hay un problema en la preparación
        }

        if ($stmt->execute([$idEmpresa, $departamento, $localidad, $calle, $esquina, $nPuerta, $nApartamento, $cPostal, $indicaciones])) {
            return true; // Retornar true si se insertó correctamente
        } else {
            return false; // Retornar false si hubo un error al ejecutar la consulta
        }
    }

    public function graficaDatos()
    {
        $stmt = $this->pdo->prepare("SELECT e.idEmpresa, e.nombre, SUM(a.cantidad) AS ventas
                                    FROM empresa e
                                    JOIN producto p ON p.idEmpresa = e.idEmpresa
                                    JOIN almacena a ON a.id = p.id
                                    JOIN carrito c ON c.idCarrito = a.idCarrito 
                                    WHERE c.estadoCarrito = 'Confirmado'
                                    GROUP BY e.idEmpresa
                                    ORDER BY ventas DESC
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
}

// Configuracion de la base de datos
$host = 'localhost';
$dbname = 'producto';
$username = 'root';
$password = '';

$conexionDB = new ConexionDB($host, $dbname, $username, $password);
$pdo = $conexionDB->getPdo();
//Crear la instancia de la clsae Producto con la conexion
$empresa = new ApiEmpresa($pdo);

/////////////////////////////////////////////////////////////////////
// Manejo de solicitudos GET, POST, PUT, y DELETE como ya lo tienes implementado
if($_SERVER['REQUEST_METHOD'] == 'GET'){
    $accion = $_GET['accion'];
    switch($accion)
    {
        case 'obtenerDatos':
            session_start();
            $idEmpresa = $_SESSION['empresa']['idEmpresa'];
            $empresaDatos = $empresa->obtenerDatos($idEmpresa);
            echo json_encode($empresaDatos);
            break;

        case 'obtenerVentas':
            session_start();
            $idEmpresa = $_SESSION['empresa']['idEmpresa'];
            $datosVentas = $empresa->ventasEmpresa($idEmpresa);
            echo json_encode($datosVentas);
            break;
        
        case 'grafica':
            $empresa->graficaDatos();
            break;
    }
}

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    // Obtener valores de POST
    $nombre = $_POST['nombre'];
    $rut = $_POST['rut'];
    $numeroCuenta = $_POST['nCuenta'];
    $telefono = $_POST['telefono'];
    $correo = $_POST['correo'];
    $password = $_POST['password'];
    
    // Direccion
    $departamento = $_POST['departamentos'];
    $localidad = $_POST['localidad'];
    $calle = $_POST['calle'];
    $esquina = $_POST['esquina'];
    $nPuerta = $_POST['nPuerta'];
    $nApartamento = $_POST['nApartamento'];
    $cPostal = $_POST['cPostal'];
    $indicaciones = $_POST['indicaciones'];

    $empresa->registro($nombre, $rut, $numeroCuenta, $telefono, $correo, $password,  $departamento, $localidad, $calle, $esquina, $nPuerta, $nApartamento, $cPostal, $indicaciones);
}
?>