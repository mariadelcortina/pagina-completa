<?php
session_start();
if (!isset($_SESSION["usuario"])) {
    header("Location: login.html"); // Redirige al inicio de sesión si no hay una sesión activa
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Panel de Usuario</title>
</head>
<body>
    <h2>Bienvenido, <?php echo $_SESSION["usuario"]; ?></h2>
    <!-- Contenido del panel aquí -->
    <a href="logout.php">Cerrar sesión</a> <!-- Agrega un enlace para cerrar sesión -->
</body>
</html>
