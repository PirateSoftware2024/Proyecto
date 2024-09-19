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
        obtenerDatos($conexion);
    }

    function obtenerDatos($conexion) {   
        $data = json_decode(file_get_contents('php://input'), true);
        session_start();
            $id = $_SESSION['usuario'][0]['idUsuario'];
            $idUsuario = intval($id); // Lo convertimos en int
            // Verificar si existe un carrito en estado "Pendiente" para el usuario
            $sqlVerificacion = "SELECT idCarrito FROM carrito WHERE idUsuario = ? AND estadoCarrito = 'Pendiente'";
            $stmtVerificacion = $conexion->prepare($sqlVerificacion);
            $stmtVerificacion->bind_param('i', $idUsuario);
            $stmtVerificacion->execute();
            $stmtVerificacion->store_result();

            if ($stmtVerificacion->num_rows > 0) {
                // Obtener el ID del carrito existente
                $stmtVerificacion->bind_result($idCarrito); // Si existe un carrito pendiente del usuario, nos retorna el idCarrito
                $stmtVerificacion->fetch();
                $_SESSION['usuario'][0]['idCarrito'] = $idCarrito;
                // Recuperar los productos del carrito desde la tabla `almacena`
                $sqlProductos ="SELECT a.id,  a.cantidad,  a.precio,  p.nombre,   p.file_path
                                FROM almacena a
                                JOIN producto p ON a.id = p.id
                                WHERE  a.idCarrito = $idCarrito";
                $stmtProductos = $conexion->prepare($sqlProductos);
                $stmtProductos->execute();
                $resultado = $stmtProductos->get_result();

                $productos = [];
                while ($fila = $resultado->fetch_assoc()) {
                    $productos[] = $fila;
                }

                // Devolver los productos en formato JSON
                echo json_encode(['success' => true, 'productos' => $productos]);
                
                $stmtProductos->close();
            } else {
                // No existe un carrito pendiente, podemos crear uno nuevo

                $sql = "INSERT INTO carrito (idUsuario, estadoCarrito) VALUES (?, 'Pendiente')";
                $stmt = $conexion->prepare($sql);
                
                if ($stmt === false) {
                    die(json_encode(['success' => false, 'error' => 'Error en la preparación de la consulta: ' . $conexion->error]));
                }

                // Vincular parámetros
                $stmt->bind_param('i', $idUsuario);

                // Ejecutar la consulta
                if ($stmt->execute()) {
                    echo json_encode(['success' => true]);
                } else {
                    echo json_encode(['success' => false, 'error' => $stmt->error]);
                }

                $stmt->close();
            }

            
            $stmtVerificacion->close();

        $conexion->close();
    }


    function obtenerId($ididUsuario){
    $sqlVerificacion = "SELECT idCarrito FROM carrito WHERE idUsuario = ? AND estadoCarrito = 'Pendiente'";
            $stmtVerificacion = $conexion->prepare($sqlVerificacion);
            $stmtVerificacion->bind_param('i', $idUsuario);
            $stmtVerificacion->execute();
            $stmtVerificacion->store_result();

            if ($stmtVerificacion->num_rows > 0) {
                // Obtener el ID del carrito existente
                $stmtVerificacion->bind_result($idCarrito); // Si existe un carrito pendiente del usuario, nos retorna el idCarrito
                $stmtVerificacion->fetch();
                $_SESSION['usuario'][0]['idCarrito'] = $idCarrito;
            }
        }       
?>