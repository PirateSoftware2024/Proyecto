-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-10-2024 a las 20:12:35
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

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
(816, 57, 2, 1200),
(816, 59, 1, 1200),
(817, 57, 1, 1200),
(827, 57, 1, 1200),
(827, 58, 1, 1200),
(828, 57, 1, 1200),
(828, 58, 1, 1200),
(828, 59, 1, 1200),
(832, 57, 1, 1200),
(833, 58, 1, 1200),
(840, 57, 1, 1200),
(864, 58, 1, 1200),
(866, 57, 1, 1200),
(868, 58, 1, 1200),
(869, 57, 1, 1200),
(871, 57, 1, 1200),
(873, 57, 1, 1200),
(876, 58, 1, 1200),
(878, 57, 1, 1200),
(904, 62, 1, 1200),
(905, 62, 1, 1200),
(906, 58, 2, 1200),
(906, 62, 1, 1200),
(953, 57, 1, 1200),
(953, 62, 1, 1200),
(955, 57, 1, 1200),
(956, 62, 1, 1200),
(959, 57, 1, 1200),
(959, 62, 2, 1200),
(961, 59, 12, 1200),
(1009, 57, 3, 1200),
(1011, 57, 3, 1200),
(1013, 57, 3, 1200),
(1015, 57, 3, 1200),
(1016, 58, 1, 1200);

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
  `precioTotal` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrito`
--

INSERT INTO `carrito` (`idCarrito`, `fecha`, `estadoCarrito`, `idUsuario`, `cantidadProductos`, `precioTotal`) VALUES
(816, '2024-10-14', 'Confirmado', 34, 3, 3630),
(817, '2024-10-14', 'Confirmado', 34, 1, 1230),
(827, '2024-10-14', 'Confirmado', 50, 2, 2430),
(828, '2024-10-14', 'Confirmado', 50, 3, 3630),
(832, '2024-10-14', 'Confirmado', 34, 1, 1230),
(833, '2024-10-14', 'Pendiente', 34, 1, 1230),
(840, '2024-10-20', 'Confirmado', 50, 1, 1230),
(864, '2024-10-20', 'Confirmado', 50, 1, 1230),
(866, '2024-10-20', 'Confirmado', 50, 1, 1230),
(868, '2024-10-20', 'Confirmado', 50, 1, 1230),
(869, '2024-10-20', 'Confirmado', 50, 1, 1230),
(871, '2024-10-20', 'Confirmado', 50, 1, 1230),
(872, '2024-10-20', 'Confirmado', 50, 0, 0),
(873, '2024-10-20', 'Confirmado', 50, 1, 1230),
(876, '2024-10-20', 'Confirmado', 50, 1, 1230),
(877, '2024-10-20', 'Confirmado', 50, 0, 0),
(878, '2024-10-20', 'Confirmado', 50, 1, 1230),
(904, '2024-10-21', 'Confirmado', 50, 1, 1230),
(905, '2024-10-21', 'Confirmado', 50, 1, 1230),
(906, '2024-10-21', 'Confirmado', 50, 3, 3630),
(953, '2024-10-22', 'Confirmado', 50, 2, 2430),
(955, '2024-10-22', 'Confirmado', 50, 1, 1230),
(956, '2024-10-22', 'Confirmado', 50, 1, 1230),
(959, '2024-10-22', 'Confirmado', 50, 3, 3630),
(961, '2024-10-22', 'Confirmado', 50, 12, 17598),
(1009, '2024-10-25', 'Confirmado', 50, 3, 4422),
(1011, '2024-10-25', 'Confirmado', 50, 3, 4422),
(1013, '2024-10-25', 'Confirmado', 50, 3, 4422),
(1015, '2024-10-25', 'Confirmado', 50, 3, 4422),
(1016, '2024-10-25', 'Confirmado', 50, 1, 1494),
(1019, '2024-10-25', 'Pendiente', 50, 0, 0);

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
-- Estructura de tabla para la tabla `detalle_pedido`
--

CREATE TABLE `detalle_pedido` (
  `id` int(11) NOT NULL,
  `idEmpresa` int(11) DEFAULT NULL,
  `idPaquete` int(11) DEFAULT NULL,
  `idProducto` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `estado_preparacion` enum('Pendiente','Cancelado','Enviado a depósito','En preparación') DEFAULT 'Pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_pedido`
--

INSERT INTO `detalle_pedido` (`id`, `idEmpresa`, `idPaquete`, `idProducto`, `cantidad`, `estado_preparacion`) VALUES
(2, 11, 14, 57, 1, 'Enviado a depósito'),
(3, 11, 14, 62, 2, 'Enviado a depósito'),
(4, 13, 15, 59, 12, 'Pendiente'),
(5, 13, 16, 57, 3, 'Pendiente'),
(6, 13, 17, 57, 3, 'Pendiente'),
(7, 13, 18, 57, 3, 'Pendiente'),
(8, 11, 19, 57, 3, 'Enviado a depósito'),
(9, 13, 20, 58, 1, 'Pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direcciones`
--

CREATE TABLE `direcciones` (
  `idDireccion` int(11) NOT NULL,
  `departamento` varchar(13) NOT NULL,
  `localidad` varchar(50) NOT NULL,
  `calle` varchar(50) NOT NULL,
  `esquina` varchar(50) NOT NULL,
  `numeroPuerta` varchar(10) NOT NULL,
  `numeroApto` varchar(10) DEFAULT NULL,
  `cPostal` int(5) NOT NULL,
  `indicaciones` varchar(100) DEFAULT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  `idEmpresa` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `direcciones`
--

INSERT INTO `direcciones` (`idDireccion`, `departamento`, `localidad`, `calle`, `esquina`, `numeroPuerta`, `numeroApto`, `cPostal`, `indicaciones`, `idUsuario`, `idEmpresa`) VALUES
(9, 'soriano', 'sdfsd', 'asd', 'asd', '12', '12', 11700, 'asd', 48, NULL),
(10, 'san-jose', 'Campeon', 'asd', 'asd', '12', '12', 11700, 'asdasd', 49, NULL),
(11, 'Montevideo', 'Jacinto Vera', 'Lafinur', 'Rqeuena', '3', '', 11700, '', NULL, 12),
(12, 'paysandu', 'asd', 'asd', 'asd', '123', '', 11700, '', NULL, 13),
(13, 'montevideo', 'Jacinto Vera', 'Lafinur', 'Requena', '5313', '123', 11800, 'Casa Azul', 50, NULL);

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
  `correo` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fecha` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`idEmpresa`, `nombre`, `rut`, `numeroCuenta`, `telefono`, `correo`, `password`, `fecha`) VALUES
(9, 'Dell', '112222123', '1231231231', '097123812', 'dell@gmail.com', '$2y$10$Ws.bwv97qt9KYh8pGQyo/eiF3bUuWZKsko3uUMQONY2JJH1q/jXeC', '2024-10-14'),
(10, 'asds', '123123125', '1231231235', '098132333', 'asd@gmail.com', '$2y$10$1/qMBfsXl/QnpyIo5Rc4JOAG2/AACkzCLF.a.biELnp5Mga4NE00u', '2024-10-14'),
(11, 'Razer', '123486791', '12345678910', '099756123', 'razer@gmail.com', '$2y$10$lFu7x6PvFG/Qqo9NXCA.AeBJrRy6XY9ITGyzerAYjYOFnEkDlCbg2', '2024-10-14'),
(12, 'Ricardo', '8989', '988898', '098898898', 'ricardo3@gmail.com', '$2y$10$LqoDkP.tS8Te.jJP5B02F.3pPD0OMvdAvfd5xKu7htYEEpwMoWRaK', '2024-10-14'),
(13, 'Razer', '123486123', '123456144', '099756444', 'raze12r@gmail.com', '$2y$10$7MFks9rh8UFYxcghAkCmEeXFelgr2CnSnZB5tTJIHySD.6lWTIzEG', '2024-10-14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  `idOrden` int(11) DEFAULT NULL,
  `mail` varchar(100) NOT NULL,
  `metodo_pago` varchar(50) DEFAULT NULL,
  `transaccion_id` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pagos`
--

INSERT INTO `pagos` (`id`, `idUsuario`, `idOrden`, `mail`, `metodo_pago`, `transaccion_id`) VALUES
(1, 50, 1015, 'sb-vb2gm32241456@personal.example.com', 'PayPal', '65Y201913E795214C'),
(2, 50, 1016, 'sb-vb2gm32241456@personal.example.com', 'PayPal', '5LF615552P2947032');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paquete`
--

CREATE TABLE `paquete` (
  `idPaquete` int(11) NOT NULL,
  `idDireccion` int(11) DEFAULT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  `idCarrito` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `estadoEnvio` enum('Pendiente','Esperando productos','Cancelado','En depósito','En camino') DEFAULT 'Pendiente',
  `tipoEntrega` enum('Domicilio','Centro de recogida') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paquete`
--

INSERT INTO `paquete` (`idPaquete`, `idDireccion`, `idUsuario`, `idCarrito`, `fecha`, `estadoEnvio`, `tipoEntrega`) VALUES
(14, 13, 50, 959, '2024-10-22 22:03:16', 'En depósito', 'Domicilio'),
(15, 13, 50, 961, '2024-10-25 22:01:44', 'Pendiente', 'Domicilio'),
(16, 13, 50, 1009, '2024-10-25 22:05:24', 'Pendiente', 'Domicilio'),
(17, 13, 50, 1011, '2024-10-25 22:09:02', 'Pendiente', 'Domicilio'),
(18, 13, 50, 1013, '2024-10-25 22:11:17', 'Pendiente', 'Domicilio'),
(19, 13, 50, 1015, '2024-10-25 22:13:23', 'En depósito', 'Domicilio'),
(20, 13, 50, 1016, '2024-10-25 22:36:38', 'Pendiente', 'Domicilio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pass_reset`
--

CREATE TABLE `pass_reset` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pass_reset`
--

INSERT INTO `pass_reset` (`id`, `email`, `token`, `fecha`) VALUES
(1, 'pipeta217@gmail.com', '739079', '2024-10-20 23:02:42'),
(2, 'pipeta217@gmail.com', '540845', '2024-10-23 01:16:05');

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
(57, 'Remera', 'Beigeasdasd', 1200, 0, 'Si', 'Usado', '670d87877a2a3.png', 'Instrumentos Musicales', 13),
(58, 'Pantalon', 'Beige muy lindo', 1200, 6, 'Si', 'Usado', '670d8792d9a1a.png', 'Instrumentos Musicales', 13),
(59, 'Indio', 'Beige muy lindo', 1200, 12, 'Si', 'Usado', 'asdadw', 'Instrumentos Musicales', 13),
(62, 'Juego', 'Ruggrats', 1500, 4, 'Si', 'Nuevo', '6717f04eaa2a7.png', 'Electrónica', 11);

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

--
-- Volcado de datos para la tabla `reseñas`
--

INSERT INTO `reseñas` (`idReseña`, `idProducto`, `idUsuario`, `reseña`) VALUES
(25, 62, 50, 'Aguanten los rugrats!');

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
  `validacion` enum('Si','No','Espera') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nombre`, `apellido`, `telefono`, `correo`, `password`, `fechaNac`, `validacion`) VALUES
(1, 'pepe', 'Ando', '1891', '1@gmail.com', '321', '2011-12-12', 'Si'),
(28, 'Ricardo', 'Perez', '099781544', 'qwe@gmail.com', '123', '0000-00-00', 'Si'),
(31, 'Ricardo', 'Perez', '099781777', 'qweqwee@gmail.com', '123', '2000-11-08', 'Espera'),
(33, 'Ricardo', 'Perez', '099781666', 'peñarol@gmail.com', '$2y$10$B5oiLai6tjS7X', '2000-11-08', 'Si'),
(34, 'Fernando', 'Morena', '091566848', 'indio@gmail.com', '$2y$10$4fH.aFgAFONZppiitMkFD.9zw7nITUr1m.xeRncPQYcM6aQDhiaFy', '2003-08-14', 'Si'),
(47, 'Duende', 'Pablo', '098456321', 'duende@gmail.com', '$2y$10$lTOmQn5/LEzBu72w0jqfZufkhuctkUUAfl54Vez/TusJV9c4//o7u', '2000-11-11', 'Espera'),
(48, 'asd', 'asd', '097124123', 'asdasd@gmail.com', '$2y$10$x6xjP1UmDZsfcENfjmvfDuTn0fznBlz8OGMgdaUn2RBsY7.RLmJ8i', '2000-11-11', 'Espera'),
(49, 'Peñarol', 'DelCap', '097189111', 'peniarol@gmail.com', '$2y$10$lPDVlB1VkqfaQGCvx1XdNuu4EvsM/BjWSnHoj50t8fenzOWLOcY4S', '2000-09-28', 'Espera'),
(50, 'Ricardo', 'Perez', '98111111', 'pipeta217@gmail.com', '$2y$10$ohF5.qVtN2XZ2jvxAL0oLeHuSpuAkHIcHqv5nKHSrFNOe3NbVWnIG', '2003-11-11', 'Si');

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
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`nombre`);

--
-- Indices de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idEmpresa` (`idEmpresa`),
  ADD KEY `idProducto` (`idProducto`),
  ADD KEY `idPaquete` (`idPaquete`);

--
-- Indices de la tabla `direcciones`
--
ALTER TABLE `direcciones`
  ADD PRIMARY KEY (`idDireccion`),
  ADD KEY `fk_direcciones_idUsuario` (`idUsuario`),
  ADD KEY `fk_direcciones_idEmpresa` (`idEmpresa`);

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`idEmpresa`),
  ADD UNIQUE KEY `rut` (`rut`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD UNIQUE KEY `telefono` (`telefono`);

--
-- Indices de la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idOrden` (`idOrden`);

--
-- Indices de la tabla `paquete`
--
ALTER TABLE `paquete`
  ADD PRIMARY KEY (`idPaquete`),
  ADD KEY `fk_paquete_direccion` (`idDireccion`),
  ADD KEY `fk_paquete_usuario` (`idUsuario`),
  ADD KEY `fk_idCarrito` (`idCarrito`);

--
-- Indices de la tabla `pass_reset`
--
ALTER TABLE `pass_reset`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `idCarrito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1022;

--
-- AUTO_INCREMENT de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `direcciones`
--
ALTER TABLE `direcciones`
  MODIFY `idDireccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `empresa`
--
ALTER TABLE `empresa`
  MODIFY `idEmpresa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `pagos`
--
ALTER TABLE `pagos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `paquete`
--
ALTER TABLE `paquete`
  MODIFY `idPaquete` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `pass_reset`
--
ALTER TABLE `pass_reset`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT de la tabla `reseñas`
--
ALTER TABLE `reseñas`
  MODIFY `idReseña` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

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
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`);

--
-- Filtros para la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD CONSTRAINT `detalle_pedido_ibfk_1` FOREIGN KEY (`idEmpresa`) REFERENCES `empresa` (`idEmpresa`),
  ADD CONSTRAINT `detalle_pedido_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`id`),
  ADD CONSTRAINT `detalle_pedido_ibfk_3` FOREIGN KEY (`idPaquete`) REFERENCES `paquete` (`idPaquete`);

--
-- Filtros para la tabla `direcciones`
--
ALTER TABLE `direcciones`
  ADD CONSTRAINT `fk_direcciones_idEmpresa` FOREIGN KEY (`idEmpresa`) REFERENCES `empresa` (`idEmpresa`),
  ADD CONSTRAINT `fk_direcciones_idUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`);

--
-- Filtros para la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`),
  ADD CONSTRAINT `pagos_ibfk_2` FOREIGN KEY (`idOrden`) REFERENCES `carrito` (`idCarrito`);

--
-- Filtros para la tabla `paquete`
--
ALTER TABLE `paquete`
  ADD CONSTRAINT `fk_idCarrito` FOREIGN KEY (`idCarrito`) REFERENCES `carrito` (`idCarrito`),
  ADD CONSTRAINT `fk_paquete_direccion` FOREIGN KEY (`idDireccion`) REFERENCES `direcciones` (`idDireccion`),
  ADD CONSTRAINT `fk_paquete_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`);

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
