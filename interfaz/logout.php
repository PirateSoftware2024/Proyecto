<?php
// logout.php
session_start();
session_destroy(); // Destruye la sesión actual
header("Location: index.php"); // Redirige a la página principal
exit();
?>