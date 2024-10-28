<?php 
require("../ConexionDB.php");
require("subirImagen.php");
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

    public function obtenerTodosProductos()
    {
        $stmt = $this->pdo->prepare("SELECT * FROM producto");
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

    public function agregar($nombre, $descripcion, $precio, $stock, $oferta, $condicion, $categoria, $urlImagen, $idEmpresa)
    {
        
        $stmt = $this->pdo->prepare("INSERT INTO producto (nombre, descripcion, precio, stock, oferta, condicion, file_path, categoria, idEmpresa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

        if ($stmt->execute([$nombre, $descripcion, $precio, $stock, $oferta, $condicion, $urlImagen, $categoria, $idEmpresa])) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Error al insertar en la base de datos']);
        }
    }

    public function eliminar($idProducto)
    {
    
    // Verificar si el producto está en un carrito
    $stmt = $this->pdo->prepare("SELECT COUNT(*) as conteo FROM almacena WHERE id = ?");
    $stmt->execute([$idProducto]);
    $result = $stmt->fetch();

    if ($result){
        if ($result['conteo'] > 0){
            // Producto está en un carrito, no se puede modificar el precio
            echo json_encode(['success' => false, 'error' => 'No se puede eliminar el producto porque está en un carrito.']);
            return;
        } 
    }else{
        // Error al verificar la existencia del producto en un carrito
        echo json_encode(['success' => false, 'error' => 'Error al verificar el carrito']);
        return;
    }

    // Eliminamos las reseñas relacionadas con el producto
    $stmt = $this->pdo->prepare("DELETE FROM reseñas WHERE idProducto = ?");
    $stmt->execute([$idProducto]);

    // Y luego eliminamos el producto
    $stmt = $this->pdo->prepare("DELETE FROM producto WHERE id = ?");
    if ($stmt->execute([$idProducto])) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Error al eliminar el producto']);
    }
}

    public function actualizar($dato, $columna, $idProducto)
    {    
        // Consulta SQL para eliminar un registro
        $stmt = $this->pdo->prepare("UPDATE producto SET $columna = '$dato' WHERE id = $idProducto");
    
        if ($stmt->execute()) {
            // Consulta exitosa
            echo json_encode(['success' => true]);
        } else {
            // Error en la consulta
            echo json_encode(['success' => false, 'error']);
        }
    }

    public function actualizarEnBack($idProducto, $nombre, $precio, $descripcion, $stock)
    {
        // Consulta SQL para actualizar un registro
        $stmt = $this->pdo->prepare("UPDATE producto SET nombre = ?, precio = ?, descripcion = ?, stock = ? WHERE id = ?");

        // Ejecuta la consulta con los valores proporcionados
        if ($stmt->execute([$nombre, $precio, $descripcion, $stock, $idProducto])) {
        // Consulta exitosa
            echo json_encode(['success' => true]);
        } else {
            // Error en la consulta
            echo json_encode(['success' => false, 'error' => $stmt->errorInfo()]);
        }
    }


    public function actualizarImagen($imagen, $idProducto)
    {
        // Consulta SQL para actualizar el file_path de un producto
        $stmt = $this->pdo->prepare("UPDATE producto SET file_path = ? WHERE id = ?");
    
        if ($stmt->execute([$imagen, $idProducto])) {
            // Consulta exitosa
            echo json_encode(['success' => true]);
        } else {
            // Error en la consulta
            echo json_encode(['success' => false, 'error' => 'Error al actualizar la imagen.']);
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
        // Preparar la consulta
        $stmt = $this->pdo->prepare("SELECT * FROM producto WHERE stock = ?");
    
        // Ejecutar la consulta
        $stmt->execute([$stock]);
    
        // Obtener todos los resultados
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        // Verificar si el array tiene elementos
        if (count($result) > 0) {
            echo json_encode(['success' => true, 'datos' => $result]);
        } else {
            echo json_encode(['success' => false, 'datos' => "No se encontraron productos con ese stock"]);
        }
    }

    public function nombre($nombre)
    {
        // Preparar la consulta
        $stmt = $this->pdo->prepare("SELECT * FROM producto WHERE nombre = ?");
    
        // Ejecutar la consulta
        $stmt->execute([$nombre]);
    
        // Obtener todos los resultados
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        // Verificar si el array tiene elementos
        if ($result) {
            echo json_encode(['success' => true, 'datos' => $result]);
        } else {
            echo json_encode(['success' => false, 'datos' => "No se encontraron productos con ese nombre"]);
        }
    }

    public function graficaDatos()
    {
        $stmt = $this->pdo->prepare("SELECT p.id, p.nombre, COUNT(*) AS compras
                                    FROM producto p
                                    JOIN almacena a ON a.id = p.id
                                    JOIN carrito c ON c.idCarrito = a.idCarrito 
                                    WHERE c.estadoCarrito = 'Confirmado'
                                    GROUP BY p.id
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

    public function buscarProducto($nombre) 
    {
        $nombre = '%' . $nombre . '%'; // Agregamos los comodines para buscar cualquier coincidencia
    
        // Preparar la consulta
        $stmt = $this->pdo->prepare("SELECT * FROM producto WHERE nombre LIKE ?");
        
        // Ejecutar la consulta
        $stmt->execute([$nombre]);
    
        // Obtener los resultados
        $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        // Verificar si hay resultados
        if (empty($resultados)) {
            echo json_encode(false); // Retorna false si no hay productos
        } else {
            echo json_encode($resultados); // Retorna los resultados si existen
        }
    }    
    
    public function nuevoProductoVisto($idUsuario, $idProducto)
    {
       $stmt = $this->pdo->prepare("INSERT INTO productos_vistos (idUsuario, idProducto)
                                    VALUES (?, ?)");
       $stmt->execute([$idUsuario, $idProducto]);
    }

    public function productosVistos($idUsuario)
    {
       if($idUsuario == "no"){
            echo json_encode(['success' => false, 'message' => 'No tiene productos vistos']);
            return;
        }
       // Preparar la consulta
       $stmt = $this->pdo->prepare("SELECT p2.*
                                    FROM productos_vistos p
                                    JOIN producto p2 ON p2.id = p.idProducto
                                    WHERE p.idUsuario = ?;");
        
       // Ejecutar la consulta
       $stmt->execute([$idUsuario]);
       $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);
   
       // Verificar si hay resultados
       if (!empty($resultados)) {
            echo json_encode(['success' => true, 'resultados' => $resultados]);
       } else {
            echo json_encode(['success' => false, 'message' => 'No tiene productos vistos']);
       } 
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
            // Validar si se subió una imagen
            if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
                // Crear una instancia del cargador de imágenes
                $uploader = new ImageUploader();
                $urlImagen = $uploader->uploadImage($_FILES['imagen']); // Intentar subir la imagen

                // Verificar si la subida de la imagen fue exitosa
                if (strpos($urlImagen, 'Error:') === 0) {
                    // Mensaje de error al subir la imagen
                    echo json_encode(['message' => $urlImagen]);
                    exit; // Terminar la ejecución
                }
            } else {
                // Mensaje de error si no se subió la imagen o hubo un problema
                echo json_encode(['message' => 'Error: No se subió la imagen o hubo un problema durante la subida.']);
                exit; // Terminar la ejecución
            }
            session_start();
            $idEmpresa = $_SESSION['usuario']['idEmpresa'] ?? $_POST['idEmpresa'] ?? null;
            $nombre = $_POST['nombre'];
            $descripcion = $_POST['descripcion'];
            $precio = $_POST['precio'];
            $stock = $_POST['stock'];
            $oferta = $_POST['oferta'];
            $condicion = $_POST['condicion'];
            $categoria = $_POST['categoria'];; // Modificar según sea necesario 
            // Agregar el producto a la base de datos
            $producto->agregar($nombre, $descripcion, $precio, $stock, $oferta, $condicion, $categoria, $urlImagen, $idEmpresa);
            break;

        case 'reseñasAgregar':
            $idProducto = isset($_POST['idProducto']) ? $_POST['idProducto'] : $data['idProducto'];
            $reseña = isset($_POST['reseña']) ? $_POST['reseña'] : $data['reseña'];
            session_start();
            $idUsuario = $_SESSION['usuario']['idUsuario'];


            $producto->reseña($idProducto, $idUsuario, $reseña);
            break;
        
        case 'productoCategoria':
            $nombreCategoria = $data['nombre'];
            $productosCateogria = $producto->categoriaProducto($nombreCategoria);
            echo json_encode($productosCateogria);
            break;

        case 'reseñasProducto':
            $idProducto = $data['id'];
            $producto->reseñasProducto($idProducto);
            break;

        case 'productoStock': // Buscamos productos por stock
            $stock = $data['stock'];
            $producto->stock($stock);
            break;

        case 'productoNombre': // Buscamos productos por stock
            $nombre = $data['nombre'];
            $producto->nombre($nombre);
            break;
        
        case 'modificarImg':
            if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
                // Crear una instancia del cargador de imágenes
                $uploader = new ImageUploader();
                $urlImagen = $uploader->uploadImage($_FILES['imagen']); // Intentar subir la imagen
    
                // Verificar si la subida de la imagen fue exitosa
                if (strpos($urlImagen, 'Error:') === 0) {
                    // Mensaje de error al subir la imagen
                    echo json_encode(['message' => $urlImagen]);
                     exit; // Terminar la ejecución
                }
            } else {
                // Mensaje de error si no se subió la imagen o hubo un problema
                echo json_encode(['message' => 'Error: No se subió la imagen o hubo un problema durante la subida.']);
                exit; // Terminar la ejecución
            }
            $idProducto = $_POST['id'];
            $producto->actualizarImagen($urlImagen, $idProducto);
            break;

            case 'productoVisto':
                session_start();
                $idUsuario = $_SESSION['usuario']['idUsuario'];
                $idProducto = $data['id'];
                $producto->nuevoProductoVisto($idUsuario, $idProducto);
                break;
            
        default:
            echo json_encode(['success' => false, 'error' => 'Acción no reconocida']);
            break;
    }
}

////////////////////////////////////////////////////////////////////////////////////////

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);  // Decodificar el cuerpo JSON
    $accion = $data['accion'];  // Obtener la acción desde el cuerpo

    switch($accion) {
        case 'producto':
            $idProducto = $data['id'];  // Asignar correctamente el idProducto
            $producto->eliminar($idProducto);  
            break;

        case 'reseña':
            $idReseña = $data['id'];  // Asignar correctamente el idReseña
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

    // Validar que $data es un array y contiene la clave 'accion'
    if (is_array($data) && isset($data['accion'])) {
        $accion = $data['accion'];
        switch($accion) {
            case 'modificar':
                // Verificar que existen las claves necesarias en $data
                if (isset($data['id'], $data['dato'], $data['columna'])) {
                    $idProducto = $data['id'];
                    $dato = $data['dato'];
                    $columna = $data['columna'];
                    $producto->actualizar($dato, $columna, $idProducto);
                } else {
                    echo json_encode(['success' => false, 'error' => 'Datos incompletos para la acción modificar']);
                }
                break;

            case 'modificarBackoffice':
                // Verificar que existen las claves necesarias en $data
                if (isset($data['id'], $data['nombre'], $data['precio'], $data['descripcion'], $data['stock'])) {
                    $idProducto = $data['id'];
                    $nombre = $data['nombre'];
                    $precio = $data['precio'];
                    $descripcion = $data['descripcion'];
                    $stock = $data['stock'];
                    $producto->actualizarEnBack($idProducto, $nombre, $precio, $descripcion, $stock);
                } else {
                    echo json_encode(['success' => false, 'error' => 'Datos incompletos para la acción modificarBackoffice']);
                }
                break;

            default:
                echo json_encode(['success' => false, 'error' => 'Acción no válida']);
                break;
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Solicitud PUT malformada o acción no especificada']);
    }
}


////////////////////////////////////////////////////////////////////////////////////////

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($_GET['accion'])) {
    $accion = $_GET['accion']; // Obtenemos la acción de la solicitud


    switch($accion)
    {
        case 'productos':
            $productos = $producto->obtenerProductos();
            echo json_encode($productos);
            break;
        
        case 'obtenerTodosProductos':
            $productos = $producto->obtenerTodosProductos();
            echo json_encode($productos);
            break;

        case 'productosEmpresa':
            //session_start();
            $idEmpresa = $data['idEmpresa']; //_SESSION['usuario'][0]['idEmpresa'];
            $producto->obtenerProductosEmpresa($idEmpresa);
            break;

        case 'categorias':
            $categorias = $producto->obtenerCategorias();
            echo json_encode($categorias);
            break;
        
        case 'reseñas':
            $reseñas = $producto->obtenerReseñas();
            echo json_encode($reseñas);
            break;
        
        case 'grafica':
            $producto->graficaDatos();
            break;
        
        case 'buscar':
            $dato = $_GET['dato'];
            $producto->buscarProducto($dato);
            break;

        case 'obtenerProductosVistos':
            session_start();
            // Verifica si hay una sesión iniciada
            if (isset($_SESSION['usuario']['idUsuario'])) {
                $idUsuario = $_SESSION['usuario']['idUsuario'];
            } else {
                $idUsuario = "no"; // Valor asignado si no hay sesión iniciada
            }
            $producto->productosVistos($idUsuario);
            break;

        default:
            echo json_encode(['success' => false, 'error' => 'Acción no reconocida']);
            break;
    }
    }else {
        // Si el método no es GET, también devolvemos un error
        echo json_encode(['success' => false, 'error' => 'Método no permitido']);
    }

}
?>
