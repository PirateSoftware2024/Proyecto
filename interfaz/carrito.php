<?php 
session_start();
?>
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Carrito de Compras</title>
        <link rel="stylesheet" href="Estilos/carrito.css">
    </head>
    <body>
        <header>
            <div class="logo"><img src="images/logo.png" alt="" width="105" height="100"></div>
            <h1>AXIS</h1>
            <a href="index.php"><button id="salir">Inicio</button></a>
        </header>
        <div id="cuadroInformacion" class="cuadro">
            <p>Información Envío</p>
            </select>
            <br><br>
            <div class="radio-group" id="direccionUsuario"> </div>
            <div id="paypal-button-container"></div>
            <br>
            <button id="cerrarCuadro">Cerrar</button>
        </div>

        <!-- Div para los productos -->
        <div class="cart-container" id="cartContainer"></div>
        <?php 
            if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true): ?>
                <!-- Si el usuario no está logueado, mostramos el enlace de "Iniciar Sesión" -->
                <div class="login-container">
                    <a id="login" href="login.html">Iniciar Sesión</a>
                </div>
        <?php else: ?>
            <div class="resumenPedido">
                <h1 id="titulo">Resumen de Pedido</h1>
                <div id="pedido"></div>
                <button id="comprar">Comprar</button>
            </div>
        <?php endif;?>
        <footer>
            <p>© 2024 Pirate Software. Todos los derechos reservados.</p>
        </footer>
        <script src="https://www.paypal.com/sdk/js?client-id=AZuQJAbevwIB5JecKzMpiSut_kE4BXGSHL0AICEl2YeRuMeIQBCRM1_vF0bTah2g1fb3kKK8HZpCemHz&currency=USD"></script>
        <script src="../logica/jquery-3.7.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
        <script src="../logica/carrito.js"></script>
    </body>
</html>
