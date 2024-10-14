<?php
require("../ConexionDB.php");
header(header: 'Content-Type: application/json');

class ApiPedidos
{
    private $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function obtenerTodos()
    {
        $stmt = $this->pdo->prepare("SELECT * FROM carrito WHERE estadoCarrito = 'Confirmado'");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function buscarPedido($dato)
    {
        // Verificar si el producto está en un carrito
        $stmt = $this->pdo->prepare("SELECT COUNT(*) as count 
            FROM carrito 
            WHERE (idCarrito = ? OR idUsuario = ?) 
            AND estadoCarrito = 'Confirmado'");

        $result = $stmt->execute([$dato, $dato]);

        if (!$result) {
            echo json_encode(['error' => 'Error en la consulta.']);
            exit;
        }

        // Obtener el resultado correctamente
        $fila = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($fila['count'] < 1) {
            // Producto no está en un carrito confirmado
            echo json_encode(['error' => 'No existe el idUsuario o el idCarrito en un carrito confirmado']);
            return;
        }

        // Producto está en un carrito confirmado, obtener los datos del carrito
        $stmt = $this->pdo->prepare("SELECT * 
            FROM carrito 
            WHERE (idCarrito = ? OR idUsuario = ?)
            AND estadoCarrito = 'Confirmado'");

        $result = $stmt->execute([$dato, $dato]);

        if (!$result) {
            echo json_encode(['error' => 'Error en la consulta.']);
            exit;
        }       

        // Obtener los resultados de la segunda consulta
        $carrito = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($carrito);
    }

    public function obtenerPedidoFecha($fecha)
    {
        // Preparar la consulta para verificar si existe un carrito en esa fecha
        $stmt = $this->pdo->prepare("SELECT COUNT(*) as count 
                                FROM carrito 
                                WHERE fecha = ? AND estadoCarrito = 'Confirmado'");
    
        
        if (!$stmt->execute([$fecha])) {
            echo json_encode(['error' => 'Error en la consulta.']);
            return;
        }
    
        // Obtener el resultado
        $fila = $stmt->fetch(PDO::FETCH_ASSOC);
    
        if ($fila['count'] < 1) {
            // No se encontró ningún carrito confirmado en esa fecha
            echo json_encode(['error' => 'Fecha no encontrada']);
            return;
        }
    
        // Si existe un carrito confirmado, obtener los datos del carrito
        $sql = "SELECT * 
                FROM carrito 
                WHERE fecha = ? AND estadoCarrito = 'Confirmado'";
        $stmt = $this->pdo->prepare($sql);
    
        // Ejecutar la consulta para obtener los carritos
        if (!$stmt->execute([$fecha])) {
            echo json_encode(['error' => 'Error en la consulta al obtener los datos del carrito.']);
            return;
        }
    
        // Obtener todos los resultados
        $arrayDatos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        // Devolver los resultados en formato JSON
        echo json_encode($arrayDatos);
    }

    public function graficaDatos()
    {
        $stmt = $this->pdo->prepare("SELECT e.idEmpresa, e.nombre, (a.precio * a.cantidad) AS ventas
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
$pedido = new ApiPedidos($pdo);

/////////////////////////////////////////////////////////////////////
// Manejo de solicitudos GET, POST, PUT, y DELETE como ya lo tienes implementado
if($_SERVER['REQUEST_METHOD'] == 'GET'){
    $data = json_decode(file_get_contents('php://input'), true);
    $accion = $_GET['accion'];
    switch($accion)
    {
        case 'pedidos':            
            $pedidos = $pedido->obtenerTodos();
            echo json_encode($pedidos);
            break;

        case 'grafica':            
            $pedido->graficaDatos();
            break;   
    }
}

//////////////////////////////////////////////////////////////////////////////////
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $data = json_decode(file_get_contents('php://input'), true);
    $accion = $data['accion'];
    
    switch($accion)
    {
        case 'buscarPedido':
            $dato = $data['dato'];
            $pedido->buscarPedido($dato);
            break;

        case 'obtenerTodos':
            $pedidos = $pedido->obtenerTodos();
            echo json_encode($pedidos);
            break;
        
        case 'obtenerPedidoFecha':
            $fecha = $data['fecha'];
            $pedido->obtenerPedidoFecha($fecha);
            break;  
    }
}
?>