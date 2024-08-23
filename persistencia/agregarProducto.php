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
    die('Error de conexión: ' . $conexion->connect_error);
}

// Verificar si se ha enviado un archivo
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $file = $_FILES['image'];
    $uploadDir = '../interfaz/images/imagenesProductos/'; // Directorio para almacenar imágenes
    $uploadFile = $uploadDir . basename($file['name']);

    // Verificar si el directorio existe, si no, crearlo
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }
    // Mover el archivo al directorio de destino
    if (move_uploaded_file($file['tmp_name'], $uploadFile)) {
        $uploadFile = '../interfaz/images/imagenesProductos/' . basename($file['name']);
        // Insertar información de la imagen en la base de datos
<<<<<<< HEAD
        $sql = "INSERT INTO producto (nombre, descripcion, precio, stock, oferta, condicion, file_path, categoria) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
=======
        $sql = "INSERT INTO producto (nombre, descripcion, precio, stock, oferta, condicion, file_path) VALUES (?, ?, ?, ?, ?, ?, ?)";
>>>>>>> 4a936129e1927df03bb185b193dd95b921d6b95a
        $stmt = $conexion->prepare($sql);
        
        // Obtener valores de POST
        $nombre = $_POST['nombre'];
        $descripcion = $_POST['descripcion'];
        $precio = $_POST['precio'];
        $stock = $_POST['stock'];
        $oferta = $_POST['oferta'];
        $condicion = $_POST['condicion'];
<<<<<<< HEAD
        $categoria = $_POST['cat'];
        
        // Vincular parámetros correctamente
        $stmt->bind_param('ssiissss', $nombre, $descripcion, $precio, $stock, $oferta, $condicion, $uploadFile, $categoria);
=======
        
        // Vincular parámetros correctamente
        $stmt->bind_param('ssiisss', $nombre, $descripcion, $precio, $stock, $oferta, $condicion, $uploadFile);
>>>>>>> 4a936129e1927df03bb185b193dd95b921d6b95a

        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Error al insertar en la base de datos']);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'error' => 'Error al subir el archivo']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'No se ha enviado ningún archivo o error en el archivo']);
}

// Cerrar la conexión
$conexion->close();
?>
