-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-09-2024 a las 05:04:03
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `producto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `almacena`
--

CREATE TABLE `almacena` (
  `idCarrito` int(10) NOT NULL,
  `id` int(10) NOT NULL,
  `cantidad` int(10) DEFAULT NULL,
  `precio` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `idCarrito` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `estadoCarrito` enum('Pendiente','Confirmado','Cancelado') DEFAULT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  `cantidadProductos` int(10) NOT NULL,
  `precioTotal` int(10) NOT NULL,
  `idPaquete` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrito`
--

INSERT INTO `carrito` (`idCarrito`, `fecha`, `estadoCarrito`, `idUsuario`, `cantidadProductos`, `precioTotal`, `idPaquete`) VALUES
(30, '2024-08-21', 'Pendiente', 1, 3, 6030, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`nombre`) VALUES
('Accesorios para Celulares'),
('Arte y Manualidades'),
('Artículos de Oficina'),
('Audio y Equipos de Sonido'),
('Automóviles y Motocicletas'),
('Aviones'),
('Bebés'),
('Bolsas y Accesorios'),
('Cámaras y Fotografía'),
('Comida y Bebidas'),
('Computadoras y Accesorios'),
('Cuidado Personal'),
('Deportes y Aire Libre'),
('Electrodomésticos'),
('Electrónica'),
('Herramientas y Mejoras del Hogar'),
('Hogar y Cocina'),
('Instrumentos Musicales'),
('Jardinería'),
('Juguetes y Juegos'),
('Libros'),
('Mascotas'),
('Material Escolar'),
('Moda'),
('Muebles'),
('Productos de Limpieza'),
('Relojes'),
('Ropa y Calzado'),
('Salud y Belleza'),
('Viajes y Turismo'),
('Videojuegos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE `empresa` (
  `idEmpresa` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `rut` varchar(12) NOT NULL,
  `numeroCuenta` varchar(20) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `departamento` varchar(50) DEFAULT NULL,
  `calle` varchar(100) DEFAULT NULL,
  `numero` int(11) DEFAULT NULL,
  `nroApartamento` varchar(10) DEFAULT NULL,
  `correo` varchar(100) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `fecha` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`idEmpresa`, `nombre`, `rut`, `numeroCuenta`, `telefono`, `departamento`, `calle`, `numero`, `nroApartamento`, `correo`, `contraseña`, `fecha`) VALUES
(1, 'Puma', '123123123', '1231231231', '1231231231', 'rio-negro', 'Luis Alberto de Herrera', 123, '123', 'a@gmail.com', '1231231231', '2024-08-26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paquete`
--

CREATE TABLE `paquete` (
  `idPaquete` int(11) NOT NULL,
  `departamento` varchar(30) DEFAULT NULL,
  `barrio` varchar(30) DEFAULT NULL,
  `calle` varchar(30) DEFAULT NULL,
  `numeroPuerta` varchar(30) DEFAULT NULL,
  `numeroApto` varchar(30) DEFAULT NULL,
  `codigoPostal` int(8) DEFAULT NULL,
  `telefono` varchar(8) DEFAULT NULL,
  `correo` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `descripcion` varchar(20) NOT NULL,
  `precio` int(100) NOT NULL,
  `stock` int(10) NOT NULL,
  `oferta` enum('Si','No') DEFAULT NULL,
  `condicion` enum('Nuevo','Usado') DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `categoria` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `nombre`, `descripcion`, `precio`, `stock`, `oferta`, `condicion`, `file_path`, `categoria`) VALUES
(7, 'Remera', 'Blanca', 600, 12, 'Si', 'Nuevo', '../interfaz/images/imagenesProductos/alfombra.png', 'Ropa y Calzado'),
(8, 'Juego', 'Play 2', 900, 12, 'Si', 'Nuevo', '../interfaz/images/imagenesProductos/alfombra (2).png', 'Juguetes y Juegos'),
(9, 'Silla', 'Exterior', 1200, 1, 'Si', 'Nuevo', '../interfaz/images/imagenesProductos/silla.png', 'Muebles');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `fechaNac` date DEFAULT NULL,
  `validacion` enum('Si','No','Espera') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nombre`, `apellido`, `telefono`, `correo`, `password`, `fechaNac`, `validacion`) VALUES
(1, 'Probando', 'Ando', '0993123', 'prueba@gmail.com', '321', '2011-12-12', 'Si');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `almacena`
--
ALTER TABLE `almacena`
  ADD PRIMARY KEY (`idCarrito`,`id`),
  ADD KEY `id` (`id`);

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`idCarrito`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `fk_paquete` (`idPaquete`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`nombre`);

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`idEmpresa`),
  ADD UNIQUE KEY `rut` (`rut`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD UNIQUE KEY `telefono` (`telefono`);

--
-- Indices de la tabla `paquete`
--
ALTER TABLE `paquete`
  ADD PRIMARY KEY (`idPaquete`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `telefono` (`telefono`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `idCarrito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `empresa`
--
ALTER TABLE `empresa`
  MODIFY `idEmpresa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `paquete`
--
ALTER TABLE `paquete`
  MODIFY `idPaquete` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `almacena`
--
ALTER TABLE `almacena`
  ADD CONSTRAINT `almacena_ibfk_1` FOREIGN KEY (`idCarrito`) REFERENCES `carrito` (`idCarrito`),
  ADD CONSTRAINT `almacena_ibfk_2` FOREIGN KEY (`id`) REFERENCES `producto` (`id`);

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`),
  ADD CONSTRAINT `fk_paquete` FOREIGN KEY (`idPaquete`) REFERENCES `paquete` (`idPaquete`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
