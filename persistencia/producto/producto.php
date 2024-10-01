<?php 
require("../ConexionDB.php");
header('Content-Type: application/json');

class ApiProducto
{
    private $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    // Preguntar al profe
    public function obtenerProductosEmpresa($idEmpresa)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM producto WHERE idEmpresa = ?");
        $stmt->execute([$idEmpresa]);
        $productos = $stmt->fetchAll(PDO::FETCH_ASSOC); // Obtenemos todas las filas

        if (!empty($productos)) {
            // Si hay productos, los enviamos como JSON
            echo json_encode($productos);
        } else {
            // Si no hay productos, enviamos un mensaje de error
            echo json_encode(['success' => false, 'error' => 'Sin productos']);
        }
}

    public function obtenerProductos()
    {
        $stmt = $this->pdo->prepare("SELECT * FROM producto WHERE stock >= 1");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function obtenerCategorias()
    {
        $stmt = $this->pdo->prepare("SELECT * FROM categorias");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function obtenerReseñas()
    {
        $stmt = $this->pdo->prepare("SELECT * FROM reseñas");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function agregar($nombre, $descripcion, $precio, $stock, $oferta, $condicion, $categoria, $file)
    {
        $uploadDir = '../imagenes'; // Ruta corregida
        $uploadFile = $uploadDir . basename($file['name']);

        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        if (move_uploaded_file($file['tmp_name'], $uploadFile)) {
            $uploadFile = $uploadFile; // No necesita cambiar la ruta aquí
            $stmt = $this->pdo->prepare("INSERT INTO producto (nombre, descripcion, precio, stock, oferta, condicion, file_path, categoria) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

            if ($stmt->execute([$nombre, $descripcion, $precio, $stock, $oferta, $condicion, $uploadFile, $categoria])) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'error' => 'Error al insertar en la base de datos']);
            }
        } else {
            echo json_encode(['success' => false, 'error' => 'Error al subir el archivo']);
        }
    }

    public function eliminar($idProducto)
    {
        // Verificar si el producto está en la tabla carrito
        $stmt = $this->pdo->prepare("SELECT COUNT(*) AS conteo 
                                    FROM almacena a 
                                    JOIN carrito c ON c.idCarrito = a.idCarrito
                                    WHERE a.id = ?");
        $stmt->execute([$idProducto]);
        $result = $stmt->fetch(); 

        if ($result['conteo'] > 0) {
            echo json_encode(['success' => false, 'error' => 'No se puede eliminar el producto porque está en un carrito.']);
        }else {
            // Eliminar el producto
            $stmt = $this->pdo->prepare("DELETE FROM producto WHERE id = ?");
            if ($stmt->execute([$idProducto])) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'error']);
            }
        }
    }

    public function actualizar($nombre, $descripcion, $precio, $idProducto)
    {
        // Verificar si el producto está en un carrito
        $stmt = $this->pdo->prepare("SELECT COUNT(*) as conteo FROM almacena WHERE id = ?");
        $stmt->execute([$idProducto]);
        $result = $stmt->fetch();

        if ($result){
        if ($result['conteo'] > 0){
            // Producto está en un carrito, no se puede modificar el precio
            echo json_encode(['success' => false, 'error' => 'No se puede modificar el precio porque el producto está en un carrito.']);
            return;
        } 
        }else{
            // Error al verificar la existencia del producto en un carrito
            echo json_encode(['success' => false, 'error' => 'Error al verificar el carrito']);
            return;
        }

        // Consulta SQL para actualizar el producto
        $stmt = $this->pdo->prepare("UPDATE producto SET nombre = ?, descripcion = ?, precio = ? WHERE id = ?");

        // Ejecutar la consulta
        if ($stmt->execute([$nombre, $descripcion, $precio, $idProducto])) {
            // Consulta exitosa
            echo json_encode(['success' => true]);
        } else {
            // Error en la consulta
            echo json_encode(['success' => false, 'error']);
        }
    }

    public function reseña($idProducto, $idUsuario, $reseña)
    {
        $stmt = $this->pdo->prepare("INSERT INTO reseñas(idProducto, idUsuario, reseña) VALUES (?, ?, ?)");

        // Ejecutar la consulta
        if ($stmt->execute([$idProducto, $idUsuario, $reseña])) {
            echo json_encode(['success' => true, 'message' => 'Reseña guardada con éxito']);
        } else {
            echo json_encode(['success' => false, 'error' => $stmt->error]);
        }
    }

    public function eliminarReseña($idReseña)
    {
        $stmt = $this->pdo->prepare("DELETE FROM reseñas WHERE idReseña = ?");
        if ($stmt->execute([$idReseña])) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error']);
        }   
    }

    public function categoriaProducto($nombreCategoria)
    {
        if ($nombreCategoria === 'Todo'){
            $stmt = $this->pdo->prepare("SELECT * FROM producto");
            $stmt->execute();
            
        }else{
            $stmt = $this->pdo->prepare("SELECT * FROM producto WHERE categoria = ?");
            $stmt->execute([$nombreCategoria]);
        }

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function reseñasProducto($idProducto)
    {
        // Consultar si hay reseñas para el producto
        $stmt = $this->pdo->prepare("SELECT reseña FROM reseñas WHERE idProducto = ?");
        $stmt->execute([$idProducto]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC); // Usamos fetchAll para obtener todas las filas

        if ($result) {
            $reseñas = [];
            // Iteramos sobre el resultado
            foreach ($result as $row) {
                $reseñas[] = $row['reseña'];
            }

            // Devolvemos las reseñas en formato JSON
            echo json_encode(['success' => true, 'reseñas' => $reseñas]);
        } else {
            // No hay reseñas
            echo json_encode(['success' => false, 'error' => 'Sin reseñas']);
        }
    }

    public function stock($stock)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM producto WHERE stock = ?");
        $stmt->execute([$stock]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function nombre($nombre)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM producto WHERE nombre = ?");
        $stmt->execute([$nombre]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

// Configuración de la base de datos
$host = 'localhost';
$dbname = 'producto';
$username = 'root';
$password = '';

$conexionDB = new ConexionDB($host, $dbname, $username, $password);
$pdo = $conexionDB->getPdo();

// Crear la instancia de la clase ApiProducto con la conexión PDO
$producto = new ApiProducto($pdo);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Si usas JSON, toma los datos de $data, si es multipart form-data, usa $_POST.
    $accion = isset($_POST['accion']) ? $_POST['accion'] : $data['accion'];

    switch ($accion) 
    {
        case 'agregar':
            // Verificar si el archivo se envió correctamente
            if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
                $file = $_FILES['image'];
                $nombre = $_POST['nombre'];
                $descripcion = $_POST['descripcion'];
                $precio = $_POST['precio'];
                $stock = $_POST['stock'];
                $oferta = $_POST['oferta'];
                $condicion = $_POST['condicion'];
                $categoria = "ASDASD"; // Modificar según sea necesario
                $producto->agregar($nombre, $descripcion, $precio, $stock, $oferta, $condicion, $categoria, $file);
            } else {
                echo json_encode(['success' => false, 'error' => 'No se ha enviado ningún archivo o error en el archivo']);
            }
            break;

        case 'reseñasAgregar':
            $idProducto = isset($_POST['idProducto']) ? $_POST['idProducto'] : $data['idProducto'];
            $reseña = isset($_POST['reseña']) ? $_POST['reseña'] : $data['reseña'];
            $idUsuario = isset($_POST['idUsuario']) ? $_POST['idUsuario'] : $data['idUsuario'];

            $producto->reseña($idProducto, $idUsuario, $reseña);
            break;
        
        default:
            echo json_encode(['success' => false, 'error' => 'Acción no reconocida']);
            break;
    }
}

////////////////////////////////////////////////////////////////////////////////////////

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    $accion = $data['accion'];
    switch($accion)
    {
        case 'producto':
            $idProducto = $data['id'];
            $producto->eliminar($idProducto);  
            break;

        case 'reseña':
            $idReseña = $data['id'];
            $producto->eliminarReseña($idReseña);
            break;

        default:
            echo json_encode(['success' => false, 'error' => 'Acción no reconocida']);
            break;
    }
}

////////////////////////////////////////////////////////////////////////////////////////

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    $idProducto = $data['id'];
    $nombre = $data['nombre'];
    $descripcion = $data['descripcion'];
    $precio = $data['precio'];

    $producto->actualizar($nombre, $descripcion, $precio, $idProducto);  
}

////////////////////////////////////////////////////////////////////////////////////////

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $data = json_decode(file_get_contents('php://input'), true);
    $accion = $data['accion'];

    switch($accion)
    {
        case 'productos':
            $productos = $producto->obtenerProductos();
            echo json_encode($productos);
            break;

        case 'productosEmpresa':
            //session_start();
            $idEmpresa = $data['idEmpresa']; //_SESSION['usuario'][0]['idEmpresa'];
            $producto->obtenerProductosEmpresa($idEmpresa);
            break;

        case 'productoCategoria':
            $nombreCategoria = $data['nombre'];
            $productosCateogria = $producto->categoriaProducto($nombreCategoria);
            echo json_encode($productosCateogria);
            break;

        case 'categorias':
            $categorias = $producto->obtenerCategorias();
            echo json_encode($categorias);
            break;
        
        case 'reseñas':
            $reseñas = $producto->obtenerReseñas();
            echo json_encode($reseñas);
            break;

        case 'reseñasProducto':
            $idProducto = $data['id'];
            $producto->reseñasProducto($idProducto);
            break;

        case 'productoStock': // Buscamos productos por stock
            $stock = $data['stock'];
            $productos = $producto->stock($stock);
            if($productos){
                echo json_encode($productos);
            }else{
                echo json_encode("No se encontraron productos");
            }
            break;

        case 'productoNombre': // Buscamos productos por stock
            $nombre = $data['nombre'];
            $productos = $producto->nombre($nombre);
            if($productos){
                echo json_encode($productos);
            }else{
                echo json_encode("No se encontraron productos");
            }
            break;

        default:
            echo json_encode(['success' => false, 'error' => 'Acción no reconocida']);
            break;
    }
}
?>
