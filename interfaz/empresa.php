<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="Estilos/ventas.css">
    <title>Empresa</title>
</head>
<body>
    <header>
        <div class="logo"><img src="images/logo.png" alt="Logo" width="105" height="100"></div>
        <h1>
            <?php
                session_start();
                echo $_SESSION['usuario']['nombre'];
            ?>
        </h1>
        <nav>
            <a href="productosEmpresa.php">Mis productos</a>
            <a href="ventasEmpresa.html">Ventas</a>
        </nav>
    </header>
    
    <main>
        <div class="carta">
            <h2>Publicar Producto</h2>
            <form id="uploadForm" enctype="multipart/form-data">
                <label for="nombre">Nombre del Producto:</label><br>
                <input type="text" id="nombre" name="nombre" required><br>

                <label for="descripcion">Descripción:</label><br>
                <input type="text" id="descripcion" name="descripcion" required><br>

                <label for="precio">Precio:</label><br>
                <input type="number" id="precio" name="precio" min="1" step="1" required><br>

                <label for="stock">Stock disponible:</label><br>
                <input type="number" id="stock" name="stock" min="1" required><br>

                <label for="oferta">Aplica a oferta:</label><br>
                <select id="oferta" name="oferta">
                    <option value="" disabled selected>Opciones</option>
                    <option value="Si">Sí</option>
                    <option value="No">No</option>
                </select><br>

                <label for="categoria">Seleccione categoría:</label><br>
                <select id="categoria" name="categoria">
                    <option value="" disabled selected>Opciones</option>
                </select><br>

                <label for="condicion">Condición:</label><br>
                <select id="condicion" name="condicion">
                    <option value="" disabled selected>Opciones</option>
                    <option value="Nuevo">Nuevo</option>
                    <option value="Usado">Usado</option>z|
                </select><br>

                <label for="image">Imagen:</label><br>
                <input type="file" name="imagen" id="imagen" required><br>
                
                <button type="submit" id="boton">Subir Producto</button>
            </form>
        </div>
    </main>

    <footer>
        <p>© 2024 Pirate Software. Todos los derechos reservados.</p>
    </footer>

    <script src="../logica/jquery-3.7.1.min.js"></script>
    <script src="../logica/empresa.js"></script>
</body>
</html>
