<?php 
header('Content-Type: application/json');
$server = "localhost";
$user = "root";
$pass = "";
$db = "producto";

$conexion = new mysqli($server, $user, $pass, $db);

if ($conexion->connect_errno) {
    die(json_encode(['success' => false, 'error' => 'Conexión fallida: ' . $conexion->connect_error]));
} else {
    manejarProductoEnCarrito($conexion);
}

function manejarProductoEnCarrito($conexion) {   
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validar datos recibidos
    if (isset($data['idCarrito'], $data['id'], $data['cantidad'], $data['precio'])) {
        $idCarrito = $data['idCarrito'];
        $id = $data['id'];
        $cantidad = $data['cantidad'];
        $precio = $data['precio'];
        
        // Verificar si el producto ya está en el carrito
        $sqlVerificacion = "SELECT cantidad FROM almacena WHERE idCarrito = ? AND id = ?";
        $stmtVerificacion = $conexion->prepare($sqlVerificacion);
        $stmtVerificacion->bind_param('ii', $idCarrito, $id);
        $stmtVerificacion->execute();
        $result = $stmtVerificacion->get_result();
        
        if ($result->num_rows > 0) {
            // El producto ya está en el carrito, actualizar la cantidad y el precio
            $sqlActualizar = "UPDATE almacena SET cantidad = ?, precio = ? WHERE idCarrito = ? AND id = ?";
            $stmtActualizar = $conexion->prepare($sqlActualizar);
            $stmtActualizar->bind_param('idii', $cantidad, $precio, $idCarrito, $id);
            
            if ($stmtActualizar->execute()) {
                echo json_encode(['success' => true, 'message' => 'Producto actualizado en el carrito']);
            } else {
                echo json_encode(['success' => false, 'error' => 'Error al actualizar el producto: ' . $stmtActualizar->error]);
            }
            
            $stmtActualizar->close();
        } else {
            // El producto no está en el carrito, insertar una nueva entrada
            $sqlInsertar = "INSERT INTO almacena (idCarrito, id, cantidad, precio) VALUES (?, ?, ?, ?)";
            $stmtInsertar = $conexion->prepare($sqlInsertar);
            $stmtInsertar->bind_param('iiid', $idCarrito, $id, $cantidad, $precio);
            
            if ($stmtInsertar->execute()) {
                echo json_encode(['success' => true, 'message' => 'Producto agregado al carrito']);
            } else {
                echo json_encode(['success' => false, 'error' => 'Error al agregar el producto: ' . $stmtInsertar->error]);
            }
            
            $stmtInsertar->close();
        }

        $stmtVerificacion->close();
    } else {
        echo json_encode(['success' => false, 'error' => 'Datos incompletos']);
    }

    $conexion->close();
}
?>
