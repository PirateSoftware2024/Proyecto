-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-10-2024 a las 22:18:41
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

--
-- Volcado de datos para la tabla `almacena`
--

INSERT INTO `almacena` (`idCarrito`, `id`, `cantidad`, `precio`) VALUES
(463, 16, 1, 1000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `idCarrito` int(11) NOT NULL,
  `fecha` date NOT NULL DEFAULT current_timestamp(),
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
(425, '2024-09-23', 'Confirmado', 1, 1, 630, NULL),
(429, '2024-09-23', 'Confirmado', 1, 2, 1230, NULL),
(430, '2024-09-23', 'Confirmado', 1, 3, 2430, NULL),
(431, '2024-09-23', 'Confirmado', 1, 1, 930, NULL),
(432, '2024-09-23', 'Confirmado', 34, 1, 630, NULL),
(433, '2024-09-23', 'Confirmado', 1, 0, 0, NULL),
(440, '2024-09-29', 'Confirmado', 1, 0, 0, NULL),
(441, '2024-09-29', 'Confirmado', 1, 3, 1800, NULL),
(445, '2024-10-02', 'Confirmado', 34, 0, 30, NULL),
(451, '2024-10-02', 'Confirmado', 34, 0, 0, NULL),
(462, '2024-10-02', 'Confirmado', 34, 2, 1130, NULL),
(463, '2024-10-02', 'Pendiente', 34, 1, 1030, NULL);

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
  `password` varchar(255) NOT NULL,
  `fecha` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`idEmpresa`, `nombre`, `rut`, `numeroCuenta`, `telefono`, `departamento`, `calle`, `numero`, `nroApartamento`, `correo`, `password`, `fecha`) VALUES
(1, 'Puma', '123123123', '1231231231', '1231231231', 'rio-negro', 'Luis Alberto de Herrera', 123, '123', 'a@gmail.com', '1231231231', '2024-08-26'),
(4, 'Nike', '123341233', '231231231', '93123123', 'soriano', 'asd', 12, '21', 'nike@gmail.com', '1231231231231', '2024-09-19'),
(5, 'Walter', '123123', '11111', '091566848', 'Montevideo', 'Luis Alberto de Herrera', 132, '1', 'indio@gmail.coma', '1234', '2024-10-01'),
(6, 'Walter', '123124', '11112', '091566847', 'Montevideo', 'Luis Alberto de Herrera', 132, '1', 'indiod@gmail.coma', '$2y$10$JM3j/AX96Bncfz6zMjopX.lPFdTxpSl0Uns/GnnEYVHrUNUb8QUJy', '2024-10-01'),
(7, 'asdasd', '123123125', '12312312', '097777777', 'san-jose', 'dad', 13, '1', 'adidas@gmail.com', '$2y$10$4U3wJ.GlKi5Bj6EQhSKyXenYi/9ycL.Vv6YUDq2iyWx8uQsN/CC.6', '2024-10-02'),
(8, 'Hi', '987365478', '0987365136', '097888888', 'treinta-y-tres', 'D', 1, '1', 'je@gmail.com', '$2y$10$LuLU0F/qqe8cx1M36i1yH.xjmMwWhN/SqAMDuaR0yCtb2kfFJShNm', '2024-10-02');

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
  `categoria` varchar(50) DEFAULT NULL,
  `idEmpresa` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `nombre`, `descripcion`, `precio`, `stock`, `oferta`, `condicion`, `file_path`, `categoria`, `idEmpresa`) VALUES
(16, 'Remera', 'Blanca', 1000, 1, 'No', 'Nuevo', '66ff184315fda.png', 'Ropa y Calzado', 8),
(17, 'Pantalon', 'Beige', 1200, 1, 'Si', 'Nuevo', '66ff194228790.jpg', 'Ropa y Calzado', 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reseñas`
--

CREATE TABLE `reseñas` (
  `idReseña` int(11) NOT NULL,
  `idProducto` int(11) DEFAULT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  `reseña` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `telefono` varchar(9) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fechaNac` date DEFAULT NULL,
  `departamento` varchar(13) NOT NULL,
  `localidad` varchar(50) NOT NULL,
  `calle` varchar(50) NOT NULL,
  `esquina` varchar(50) NOT NULL,
  `numeroPuerta` varchar(10) NOT NULL,
  `apto` varchar(10) NOT NULL,
  `codigoPostal` int(5) NOT NULL,
  `indicaciones` varchar(50) DEFAULT NULL,
  `validacion` enum('Si','No','Espera') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nombre`, `apellido`, `telefono`, `correo`, `password`, `fechaNac`, `departamento`, `localidad`, `calle`, `esquina`, `numeroPuerta`, `apto`, `codigoPostal`, `indicaciones`, `validacion`) VALUES
(1, 'pepe', 'Ando', '1891', '1@gmail.com', '321', '2011-12-12', '', '', '', '', '', '', 0, NULL, 'Si'),
(27, 'asda', 'asda', '91244123', 't@gmail.com', '1231231231', '1987-01-28', 'rocha', 'asd', 'asd', 'asd', '123', '123', 12333, 'ads', 'Espera'),
(28, 'Ricardo', 'Perez', '099781544', 'qwe@gmail.com', '123', '0000-00-00', '', '', '', '', '', '', 0, NULL, 'Espera'),
(31, 'Ricardo', 'Perez', '099781777', 'qweqwee@gmail.com', '123', '2000-11-08', '', '', '', '', '', '', 0, NULL, 'Espera'),
(33, 'Ricardo', 'Perez', '099781666', 'peñarol@gmail.com', '$2y$10$B5oiLai6tjS7X', '2000-11-08', '', '', '', '', '', '', 0, NULL, 'Si'),
(34, 'Fernando', 'Morena', '091566848', 'indio@gmail.com', '$2y$10$4fH.aFgAFONZppiitMkFD.9zw7nITUr1m.xeRncPQYcM6aQDhiaFy', '2003-08-14', '', '', '', '', '', '', 0, NULL, 'Si'),
(35, 'asd', 'asd', '097123123', 'delcap@gmail.com', '$2y$10$rUTubVk.CAXjeOQbcOnIpu8R6m89mRPhCgBb1bufPC8PbU3cLsnKa', '2000-11-11', '', '', '', '', '', '', 0, NULL, 'Si');

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_idEmpresa` (`idEmpresa`);

--
-- Indices de la tabla `reseñas`
--
ALTER TABLE `reseñas`
  ADD PRIMARY KEY (`idReseña`),
  ADD KEY `idProducto` (`idProducto`),
  ADD KEY `idUsuario` (`idUsuario`);

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
  MODIFY `idCarrito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=556;

--
-- AUTO_INCREMENT de la tabla `empresa`
--
ALTER TABLE `empresa`
  MODIFY `idEmpresa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `paquete`
--
ALTER TABLE `paquete`
  MODIFY `idPaquete` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `reseñas`
--
ALTER TABLE `reseñas`
  MODIFY `idReseña` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

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

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `fk_idEmpresa` FOREIGN KEY (`idEmpresa`) REFERENCES `empresa` (`idEmpresa`);

--
-- Filtros para la tabla `reseñas`
--
ALTER TABLE `reseñas`
  ADD CONSTRAINT `reseñas_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`id`),
  ADD CONSTRAINT `reseñas_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
