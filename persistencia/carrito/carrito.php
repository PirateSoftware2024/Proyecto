<?php 
require("../ConexionDB.php");
header('Content-Type: application/json');

class ApiCarrito
{
    private $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    // Metodo para obtener o crear un nuevo carrito
    public function obtener($idUsuario)
    {
        // Consultar si el producto ya está en el carrito
        $stmt = $this->pdo->prepare("SELECT idCarrito FROM carrito WHERE idUsuario = ? AND estadoCarrito = 'Pendiente'");
        $stmt->execute([$idUsuario]);
        $result = $stmt->fetch();  // Cambiamos get_result() a fetch() para obtener una fila

        if ($result) {
            $idCarrito = $result['idCarrito']; // Obtener el idCarrito directamente del resultado

            // Obtener los productos del carrito
            $stmt = $this->pdo->prepare("SELECT a.id, a.cantidad, a.precio, p.nombre, p.file_path
                                        FROM almacena a
                                        JOIN producto p ON a.id = p.id
                                        WHERE a.idCarrito = ?");
            $stmt->execute([$idCarrito]);
            $productos = $stmt->fetchAll(PDO::FETCH_ASSOC); // Obtener todas las filas como un arreglo asociativo
        
            // Devolver los productos en formato JSON
            echo json_encode(['success' => true, 'productos' => $productos]);
        } else {
            // No existe un carrito pendiente, podemos crear uno nuevo
            $stmt = $this->pdo->prepare("INSERT INTO carrito (idUsuario, estadoCarrito) VALUES (?, 'Pendiente')");
        
            // Ejecutar la consulta
            if ($stmt->execute([$idUsuario])) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'error' => $stmt->errorInfo()]);
            }
        }
    }

    // Metodo para eliminar
    public function eliminar($idProducto, $idCarrito)
    {
        // Consultar si el producto ya está en el carrito
        $stmt = $this->pdo->prepare("DELETE FROM almacena WHERE id = ? AND idCarrito = ?");
        if($stmt->execute([$idProducto, $idCarrito])){
            echo json_encode(['success' => true, 'message' => 'Producto actualizado en el carrito']);
        } else {
            echo json_encode(['success' => false, 'error' => 'Error al actualizar el producto']);
        }
    }

    public function actualizarCarrito($cantidadProductos, $precioTotal, $idCarrito)
    {
        $stmt = $this->pdo->prepare("UPDATE carrito
                SET cantidadProductos = ?, precioTotal = ?
                WHERE idCarrito = ? AND estadoCarrito = 'Pendiente'");

    
        if ($stmt->execute([$cantidadProductos, $precioTotal, $idCarrito])) {
            // Si la consulta fue exitosa
            if ($stmt->rowCount() > 0) {
                echo json_encode(['success' => true]);
            } else {
                // No se actualizó ningún registro, probablemente porque no hay carrito pendiente
                echo json_encode(['success' => false, 'error' => 'El carrito no está pendiente o no existe.']);
            }
        } else {
            // Error al ejecutar la consulta
            echo json_encode(['success' => false, 'error' => 'Error al ejecutar la consulta: ' . $stmt->errorInfo()[2]]);
        }
    }

    // Metodo para actualizar los datos de los productos dentro del carrito
    public function actualizarProductosCarrito($id, $cantidad, $precio, $idCarrito)
    {
        // Consultar si el producto ya está en el carrito
        $stmt = $this->pdo->prepare("SELECT cantidad FROM almacena WHERE idCarrito = ? AND id = ?");
        $stmt->execute([$idCarrito, $id]);
        $result = $stmt->fetch();  // Cambiamos get_result() a fetch() para obtener una fila

        if ($result) {
            // El producto ya está en el carrito, actualizar la cantidad y el precio
            $stmt = $this->pdo->prepare("UPDATE almacena SET cantidad = ?, precio = ? WHERE idCarrito = ? AND id = ?");
            if ($stmt->execute([$cantidad, $precio, $idCarrito, $id])) {
                echo json_encode(['success' => true, 'message' => 'Producto actualizado en el carrito']);
            } else {
                echo json_encode(['success' => false, 'error' => 'Error al actualizar el producto']);
            }
        } else {
            // El producto no está en el carrito, insertar una nueva entrada
            $stmt = $this->pdo->prepare("INSERT INTO almacena (idCarrito, id, cantidad, precio) VALUES (?, ?, ?, ?)");
            if ($stmt->execute([$idCarrito, $id, $cantidad, $precio])) {
                echo json_encode(['success' => true, 'message' => 'Producto agregado al carrito']);
            } else {
                echo json_encode(['success' => false, 'error' => 'Error al agregar el producto']);
            }
        }
    }

    public function generarOrden($idCarrito)
    {
        //session_start();
        //$idCarrito = $_SESSION['usuario'][0]['idCarrito'];
        $stmt = $this->pdo->prepare("UPDATE carrito SET estadoCarrito = 'Confirmado' WHERE idCarrito = ?");
        // Ejecutar la consulta
        if ($stmt->execute([$idCarrito])) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => mysqli_error($conexion)]);
        }
    
    }

    public function crearPaquete($idUsuario, $idDireccion, $telefono, $correo)
    {   
        $idUsuario = $_SESSION['usuario'][0]['idUsuario'];
        $idDireccion = $_SESSION['usuario'][0]['idDireccion'];
        $telefono = $_SESSION['usuario'][0]['telefono'];
        $correo = $_SESSION['usuario'][0]['correo'];
    
        $stmt = $this->pdo->prepare("INSERT INTO paquete (idUsuario, idDireccion, estadoEnvio, telefono, correo)
                                    VALUES ?, ?, 'En preparacion', ?, ?");

        if ($stmt->execute([$idUsuario, $idDireccion, $telefono, $correo])) {
            echo json_encode(['success' => true, 'message' => 'Producto actualizado en el carrito']);
        } else {
            echo json_encode(['success' => false, 'error' => 'Error al actualizar el producto']);
        }
    }

    public function historial($idUsuario)
    {
        // Preparar la consulta para obtener el idCarrito confirmado del usuario
        $stmt = $this->pdo->prepare("SELECT idCarrito FROM carrito WHERE idUsuario = ? AND estadoCarrito = 'Confirmado'");
    
        if ($stmt) {
            // Ejecutar la consulta usando el placeholder
            $stmt->execute([$idUsuario]);
            $idCarrito = $stmt->fetch(PDO::FETCH_ASSOC); // Si hay al menos 1 carrito ejecutamos la siguiente sentencia
            if ($idCarrito) {
                // Si existe un carrito confirmado, obtener los detalles del carrito
                $stmt = $this->pdo->prepare(
                    "SELECT p.nombre, a.precio, a.cantidad, a.idCarrito, c.fecha, p.id
                    FROM almacena a
                    JOIN carrito c ON a.idCarrito = c.idCarrito
                    JOIN producto p ON a.id = p.id
                    WHERE c.idUsuario = ? AND c.estadoCarrito = 'Confirmado'
                    ORDER BY a.idCarrito"
                );
            
                if ($stmt) {
                    // Ejecutar la consulta para obtener los detalles del carrito confirmado
                    $stmt->execute([$idUsuario]);
                    $carritos = $stmt->fetchAll(PDO::FETCH_ASSOC); // Recuperar todas las filas
                    // Retornar los resultados en formato JSON
                    echo json_encode(['success' => true, 'data' => $carritos]);
                } else {
                    // Error en la consulta de detalles del carrito
                    echo json_encode(['success' => false, 'error' => 'Error al obtener los detalles del carrito.']);
                }
            } else {
                // No hay carritos confirmados para el usuario
                echo json_encode(['success' => false, 'error' => 'No ha realizado compras.']);
            }
        } else {
            // Error en la consulta para obtener el carrito confirmado
            echo json_encode(['success' => false, 'error' => 'Error al buscar el carrito confirmado.']);
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
// Configuración de la base de datos
$host = 'localhost';
$dbname = 'producto';
$username = 'root';
$password = '';

$conexionDB = new ConexionDB($host, $dbname, $username, $password);
$pdo = $conexionDB->getPdo();

// Crear la instancia de la clase ApiCarrito con la conexión PDO
$carrito = new ApiCarrito($pdo);


/* 
    OBTENEMOS EL CARRITO CON SUS ARTICULOS 
    O CREAMOS UNO NUEVO
*/
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $data = json_decode(file_get_contents('php://input'), true);
    $idUsuario = $data['idUsuario'];
    $carrito->obtener($idUsuario);
}

///////////////////////////////////////////////////////////////////////////////////////////////////

// ELIMINAR
if($_SERVER['REQUEST_METHOD'] == 'DELETE'){
    $data = json_decode(file_get_contents('php://input'), true);
    $idCarrito = $data['idCarrito'];
    $idProducto = $data['id'];
    /* Formas de validar
    if($id < 1)
    {
        echo "Error...";
        exit(); // Deja de ejecutar el archivo
    }*/
    $carrito->eliminar($idProducto, $idCarrito);
}

///////////////////////////////////////////////////////////////////////////////////////////////////

// ACTUALIZAR
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    $accion = $data['accion'];

    switch($accion)
    {   
        case 'actualizarCarrito':
            //session_start();
            $idCarrito = $data['idCarrito']; //$_SESSION['usuario'][0]['idCarrito'];
            $cantidadProductos = $data['cantidadProductos'];
            $precioTotal = $data['precioTotal'];
        
            // Actualizar el carrito
            $carrito->actualizarCarrito($cantidadProductos, $precioTotal, $idCarrito);
            break;

        case 'actualizarProductosCarrito':
            if (isset($data['idCarrito'], $data['cantidad'], $data['precio'], $data['id'])) {
                $idCarrito = $data['idCarrito'];
                $cantidad = $data['cantidad'];
                $precio = $data['precio'];
                $id = $data['id'];
        
                // Actualizar el carrito
                $carrito->actualizarProductosCarrito($id, $cantidad, $precio, $idCarrito);
            } else {
                echo json_encode(['success' => false, 'error' => 'Datos incompletos en la solicitud']);
            }
            break;

        case 'generarOrden':
            //session_start();
            //$idCarrito = $_SESSION['usuario'][0]['idCarrito'];
            $idCarrito = $data['idCarrito'];
            $carrito->generarOrden($idCarrito);
            break;

        default:
            echo json_encode(['success' => false, 'error' => 'Acción no reconocida']);
            break;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////

// ELIMINAR
if($_SERVER['REQUEST_METHOD'] == 'GET'){
    $data = json_decode(file_get_contents('php://input'), true);
    $idUsuario = $data['idUsuario'];
    
    $carrito->historial($idUsuario);
}
?>