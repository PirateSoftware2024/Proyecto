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

    public function registro($nombre, $rut, $numeroCuenta, $telefono, $departamento, $calle, $numero, $nApartamento, $correo, $password)
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
        $stmt = $this->pdo->prepare("INSERT INTO empresa (nombre, rut, numeroCuenta, telefono, departamento, calle, numero, nroApartamento, correo, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

        // Verificar si la preparación de la declaración SQL fue exitosa
        if (!$stmt) {
            echo json_encode(['success' => false, 'error' => 'Error en la preparación de la declaración.']);
            return;
        }
    
        // Ejecutar la consulta de inserción
        if ($stmt->execute([$nombre, $rut, $numeroCuenta, $telefono, $departamento, $calle, $numero, $nApartamento, $correo, $hashedPassword])) {
            echo json_encode(['success' => true, 'message' => 'Registro exitoso']);
        } else {
            echo json_encode(['success' => false, 'error' => 'Error al insertar en la base de datos.']);
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
    session_start();
    $idEmpresa = $_SESSION['empresa']['idEmpresa'];
    switch($accion)
    {
        case 'obtenerDatos':
            $empresaDatos = $empresa->obtenerDatos($idEmpresa);
            echo json_encode($empresaDatos);
            break;

        case 'obtenerVentas':
            $datosVentas = $empresa->ventasEmpresa($idEmpresa);
            echo json_encode($datosVentas);
            break;
    }

    
}

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    // Obtener valores de POST
    $nombre = $_POST['nombre'];
    $rut = $_POST['rut'];
    $numeroCuenta = $_POST['nCuenta'];
    $telefono = $_POST['telefono'];
    $departamento = $_POST['departamentos'];
    $calle = $_POST['calle'];
    $numero = $_POST['numero'];
    $nApartamento = $_POST['nApartamento'];
    $correo = $_POST['correo'];
    $password = $_POST['password']; 

    $empresa->registro($nombre, $rut, $numeroCuenta, $telefono, $departamento, $calle, $numero, $nApartamento, $correo, $password);
}
?>