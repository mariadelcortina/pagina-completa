<?php
// Conectar a la base de datos (cambia las credenciales según tu configuración)
$conexion = new mysqli("localhost", "root", "", "imaxdb");

// Verificar la conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Recibir datos del formulario de registro
$usuario = $_POST["usuario"];
$email = $_POST["email"];
$password = password_hash($_POST["password"], PASSWORD_BCRYPT);

// Insertar datos en la base de datos
$insertar = "INSERT INTO usuarios (usuario,email, password) VALUES ('$usuario','$email', '$password')";
if ($conexion->query($insertar) === TRUE) {
    header('Location:exitoso.html');
} else {
    echo "Error: " . $insertar . "<br>" . $conexion->error;
}

// Cerrar la conexión a la base de datos
$conexion->close();
?>
