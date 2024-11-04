<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="Estilos/backofficehome.css">
    <title>Pirate Software</title>
</head>
<body>
    <header>
        <div class="contenedor">
            <h1>
                <?php
                    session_start();
                    if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
                        echo "Axis Market";
                    } else {
                        echo "Hola!, " . htmlspecialchars($_SESSION['usuario']['nombre']);
                    }
                ?>
            </h1>
</div>
<nav>
    <ul>
        <li><a href="publicarEmpresa.html">Publicar producto</a></li>
        <li><a href="productosEmpresa.html">Mis productos</a></li>
        <li><a href="ventasEmpresa.html">Ventas</a></li>
        <li><a href="gestionTickets.html">Reportes</a></li>
        <?php if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true): ?>
        <li><a href="perfilEmpresa.html">Perfil</a></li>
        <button id="salir">Salir</button>
        <?php else: ?>
        <button id="iniciar">Iniciar Sesión</button>
        <?php endif; ?>
    </ul>
</nav>  
    </header>
    <div id="loader" class="loader">Saliendo...</div>
    <div id="cargando" class="loader">Cargando...</div>
    <main>
    <?php if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true): ?>
        <section class="content">
            <h3>Ventas</h3>
            <canvas id="ventas" height="300" width="300"></canvas>
        </section>

        <section class="content">
            <h3>Total generado</h3>
            <canvas id="totalVentas" width="300" height="300"></canvas>
        </section>
    <?php endif; ?>
    </main>
    <footer>
        <p>© 2024 Pirate Software. Todos los derechos reservados.</p>
    </footer>

    <script src="../logica/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="../logica/graficaEmpresa.js"></script>
</body>
</html>
