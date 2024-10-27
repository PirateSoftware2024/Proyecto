<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="Estilos/empresa.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">
</head>
<body>
    <header>
        <div class="logo"><img src="images/logo.png" alt="Logo" width="105" height="100"></div>
        <h1><?php session_start();
        echo $_SESSION['usuario']['nombre'];
        ?>
        - Mis productos
        </h1>
    </header>
<main>
     <!-- ######################################## -->
     <div class="product-container" id="productContainer">
        <!-- Aca estaran lo productos -->
    </div>
      <!-- CUADRO VER MAS -->
    <div id="cuadroInformacion" class="cuadro">
        <button id="cerrarCuadro" class="cerrar">Cerrar</button>


        <!-- Div para reseñas -->
        <div id="infoProducto" style="display: none;"></div>

        <!-- Div para modificar -->
        <div id="modificar" style="display: none;">
            <h2 style="text-align: center;">Modificar producto</h2><br><br>
            <label for="nombre">Nombre del Producto:</label>
            <input type="text" id="nombre" name="nombre" disabled><button id="nom">Editar</button><br>
                    
            <label for="descripcion">Descripción:</label><br>
            <input type="text" id="descripcion" name="descripcion" disabled><button id="desc">Editar</button><br>

            <label for="precio">Precio:</label><br>
            <input type="number" id="precio" name="precio" min="1" step="1" disabled><button id="prec">Editar</button><br>

            <label for="stock">Stock disponible:</label><br>
            <input type="number" id="stock" name="stock" min="1" disabled><button id="sto">Editar</button><br>

            <label for="oferta">Aplica a oferta:</label><br>
            <select id="oferta" name="oferta" disabled>
                <option value="" disabled selected>Opciones</option>
                <option value="Si">Sí</option>
                <option value="No">No</option>
            </select><button id="ofe">Editar</button><br>

            <label for="categoria">Seleccione categoría:</label><br>
            <select id="categoria" name="categoria" disabled>
                <option value="" disabled selected>Opciones</option>
            </select><button id="cat">Editar</button><br>

            <label for="condicion">Condición:</label><br>
            <select id="condicion" name="condicion" disabled>
                <option value="" disabled selected>Opciones</option>
                <option value="Nuevo">Nuevo</option>
                <option value="Usado">Usado</option>
            </select><button id="condi">Editar</button><br>
            <form id="formulario">
                <label for="image">Imagen:</label><br>
                <input type="file" name="imagen" id="imagen"><button type="submit" id="img">Editar</button><br>
            </form>
                <p id="result"></p>
        </div>
    </div>
</main>
<footer>
    <p>© 2024 Pirate Software. Todos los derechos reservados.</p>
</footer>
<script src="../logica/jquery-3.7.1.min.js"></script>
<script src="../logica/nuevoEmpresa.js"></script>
</body>
</html>