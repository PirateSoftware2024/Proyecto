<?php 
    $server = "localhost";
    $user = "root";
    $pass = "";
    $db = "cuinas-felipe";

    $conexion = new mysqli($server, $user, $pass, $db);

    if($conexion->connect_errno){
        die("Conexion Fallida" . $conexion->connect_errno);
    }else{
        //echo "conectado";
        obtenerDatos($conexion);
    }

    function obtenerDatos($conexion){   
        $sql = "SELECT ci, nombre FROM estudiantes";
        $datos = mysqli_query($conexion, $sql);
        /*
        $arrayDatos = mysqli_fetch_array($datos);
        Devuelve solo una fila y ysqli_fetch_all 
        trae todas las filas
        */
        // Obtener todos los datos como un array de arrays asociativos
        $arrayDatos = mysqli_fetch_all($datos, MYSQLI_ASSOC);

        // Establecer el encabezado Content-Type a JSON
        header('Content-Type: application/json');

    // Enviar los datos como JSON
        echo json_encode($arrayDatos);
    }


    
?>
