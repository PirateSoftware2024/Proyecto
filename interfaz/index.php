<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proyecto</title>
    <link rel="stylesheet" href="Estilos/probandoGrid.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">
</head>
<body> 
    <header>
        <div class="header-container">
            <div class="search-container">
                <button class="menu-toggle" aria-label="Toggle menu">
                    <span class="menu-icon"></span>
                </button>
                <a href="index.php"><img src="images/logo.png" alt="Logo" class="logo"></a>
                <input type="text" placeholder="Buscar...">
                <button class="search-button">Buscar</button>
            </div>
            <nav>
                <ul class="nav-menu"  id="nav-links">
                    <li><a href="historial.html">Mis compras</a></li>
                    <li><a href="perfil.html">Mi perfil</a></li>
                    <li style="font-size: 25px"><a href="carrito.php" id="iconoCarrito"><i class="bi bi-basket2-fill"></i></a></li>
                    
                    <?php 
                    session_start();
                    if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true): ?>
                    <!-- Si el usuario no esta logueado mostramos los enlaces de "Crear cuenta" y "Login" -->
                        <li id="crearCuenta"><a href="registro.html">Crea tu cuenta</a></li>
                        <li id="login"><a href="login.html">Inicio sesión</a></li>
                    <?php else: ?>
                    <!-- Si el usuario esta logueado, mostramos el enlace de "Salir" -->
                        <button id="salir">Salir</a></button>
                    <?php endif; ?>
                </ul>
            </nav>
        </div>
    </header>
    <nav id="nav">
        <button id="left-arrow" class="nav-arrow"><i class="bi bi-chevron-left"></i></button>
        <div class="navbar" id="nav-bar">
            <button class="nav-button" data-id="Todo">Todo</button>
        </div>
        <button id="right-arrow" class="nav-arrow"><i class="bi bi-chevron-right"></i></button>
    </nav>
    <div id="loader" class="loader">Saliendo...</div>
    <main>
        <!-- CUADRO VER MAS -->
        <div id="cuadroInformacion" class="cuadro">
            <p>Información Producto</p>
            <div id="infoProducto"></div>
            <button id="cerrarCuadro">Cerrar</button>
        </div>
        <!-- ######################################## -->
        <div class="product-container" id="productContainer">
            <!-- Aca estaran lo productos -->
        </div>
    </main>
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-section">
                <h3>Contáctenos</h3>
                <ul>
                    <li>Email: piratesoftwareook@gmail.com</li>
                    <li>Dirección: Regimiento 9, Montevideo, Uruguay</li>
                    <li><a href="nosotros.html">Sobre Nosotros</a></li>
                </ul>
            </div>
        </div>
        <p id="copy" style="font-size: 10px;">© 2024 Pirate Software. Todos los derechos reservados.</p>
    </footer>
    <script src="../logica/jquery-3.7.1.min.js"></script>
    <script src="../logica/main.js"></script>
</body>
</html>
