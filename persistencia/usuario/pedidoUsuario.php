<?php
header('Content-Type: application/json'); // Configurar la cabecera para devolver JSON

if (isset($_COOKIE['paymentInfo'])) {
    // Decodificar el JSON para convertirlo en un array asociativo
    $paymentData = json_decode($_COOKIE['paymentInfo'], true);

    // Devolver los datos como JSON
    echo json_encode($paymentData);
} else {
    // Devolver un mensaje de error en JSON si la cookie no existe
    echo json_encode(['error' => 'La cookie "paymentInfo" no existe.']);
}
?>
