-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-10-2024 a las 03:15:55
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
  `precio` int(10) DEFAULT NULL,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `almacena`
--

INSERT INTO `almacena` (`idCarrito`, `id`, `cantidad`, `precio`, `idUsuario`) VALUES
(816, 57, 2, 1200, 0),
(816, 59, 1, 1200, 0),
(817, 57, 1, 1200, 0),
(827, 57, 1, 1200, 0),
(827, 58, 1, 1200, 0),
(828, 57, 1, 1200, 0),
(828, 58, 1, 1200, 0),
(828, 59, 1, 1200, 0),
(832, 57, 1, 1200, 0),
(833, 58, 1, 1200, 0),
(840, 57, 1, 1200, 0),
(864, 58, 1, 1200, 0),
(866, 57, 1, 1200, 0),
(868, 58, 1, 1200, 0),
(869, 57, 1, 1200, 0),
(871, 57, 1, 1200, 0),
(873, 57, 1, 1200, 0),
(876, 58, 1, 1200, 0),
(878, 57, 1, 1200, 0),
(904, 62, 1, 1200, 0),
(905, 62, 1, 1200, 0),
(906, 58, 2, 1200, 0),
(906, 62, 1, 1200, 0),
(953, 57, 1, 1200, 0),
(953, 62, 1, 1200, 0),
(955, 57, 1, 1200, 0),
(956, 62, 1, 1200, 0),
(959, 57, 1, 1200, 0),
(959, 62, 2, 1200, 0),
(961, 59, 12, 1200, 0),
(1009, 57, 3, 1200, 0),
(1011, 57, 3, 1200, 0),
(1013, 57, 3, 1200, 0),
(1015, 57, 3, 1200, 0),
(1016, 58, 1, 1200, 0),
(1325, 57, 3, 1200, 0),
(1356, 57, 1, 1200, 0),
(1356, 59, 1, 666, 0);

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
(816, '2024-06-13', 'Confirmado', 34, 3, 3630),
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
(1019, '2024-10-25', 'Confirmado', 50, 0, 30),
(1030, '2024-10-26', 'Confirmado', 50, 0, 30),
(1278, '2024-10-26', 'Pendiente', 1, 0, 0),
(1325, '2024-10-27', 'Pendiente', 50, 3, 2226),
(1356, '2024-10-28', 'Pendiente', 0, 2, 804);

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
(5, 50, 16, 57, 3, 'Enviado a depósito'),
(7, 50, 18, 57, 3, 'Enviado a depósito'),
(9, 50, 20, 58, 1, 'Enviado a depósito'),
(10, 13, 21, 58, 1, 'Pendiente');

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
(12, 'montevideo', 'Jacinto Vera', 'asd', 'hola', '123', '', 11700, '', NULL, 50),
(13, 'cerro-largo', 'Jacinto Vera', 'La finur', 'Requena', '3626', '123', 11803, 'Casa Azul Y verde', 50, NULL);

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
(13, 'Razer', '123123', '123456144', '099756444', 'raze12r@gmail.com', '$2y$10$7MFks9rh8UFYxcghAkCmEeXFelgr2CnSnZB5tTJIHySD.6lWTIzEG', '2024-10-14'),
(50, 'Puma', '555555555', '12345678910', '97123456', 'razer@gmail.com', '$2y$10$ehbWk51geHhQj6Y7ZBlZuepnqtda.0BrYVgoQfMLU1pb6HUQ5NA6i', '2024-10-14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ofertas`
--

CREATE TABLE `ofertas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descuento` decimal(5,2) NOT NULL,
  `fecha_expiracion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ofertas`
--

INSERT INTO `ofertas` (`id`, `nombre`, `descuento`, `fecha_expiracion`) VALUES
(21, 'JOACO', 50.00, '2024-11-11');

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
(2, 50, 1016, 'sb-vb2gm32241456@personal.example.com', 'PayPal', '5LF615552P2947032'),
(3, 50, 1019, 'sb-vb2gm32241456@personal.example.com', 'PayPal', '33R06617U69202811');

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
  `estadoEnvio` enum('Pendiente','Esperando productos','Cancelado','En depósito','En camino','Entregado') DEFAULT 'Pendiente',
  `tipoEntrega` enum('Domicilio','Centro de recogida') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paquete`
--

INSERT INTO `paquete` (`idPaquete`, `idDireccion`, `idUsuario`, `idCarrito`, `fecha`, `estadoEnvio`, `tipoEntrega`) VALUES
(16, 13, 50, 1009, '2024-06-18 22:05:24', 'Cancelado', 'Domicilio'),
(17, 10, 49, 1011, '2024-10-25 22:09:02', 'En camino', 'Domicilio'),
(18, 13, 50, 1013, '2024-10-25 22:11:17', 'Pendiente', 'Domicilio'),
(20, 13, 50, 1016, '2024-10-25 22:36:38', 'Pendiente', 'Domicilio'),
(21, 13, 50, 1019, '2024-10-26 18:18:11', 'Pendiente', 'Domicilio');

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
(57, 'Remeron', 'Beigeasdasd', 1200, 3, 'Si', 'Usado', '670d87877a2a3.png', 'Instrumentos Musicales', 50),
(58, 'Pantalonnnn', 'Beige muy lindo', 1200, 0, 'Si', 'Usado', '670d8792d9a1a.png', 'Instrumentos Musicales', 50),
(59, 'PantalonLon', 'Pantalon Adidas', 666, 15, 'Si', 'Usado', 'asdadw', 'Instrumentos Musicales', 13),
(62, 'Juegardo', 'Fifa 16', 666, 6, 'No', 'Usado', '671eebfe5228e.png', 'Videojuegos', 50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_vistos`
--

CREATE TABLE `productos_vistos` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  `idProducto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos_vistos`
--

INSERT INTO `productos_vistos` (`id`, `idUsuario`, `idProducto`) VALUES
(19, 50, 57),
(15, 50, 59),
(16, 50, 62);

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
(27, 58, 50, 'Facu putooo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ticket`
--

CREATE TABLE `ticket` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  `tipo` enum('Comprador','Empresa') NOT NULL,
  `fecha` datetime DEFAULT current_timestamp(),
  `envio` varchar(255) DEFAULT NULL,
  `respuesta` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ticket`
--

INSERT INTO `ticket` (`id`, `idUsuario`, `tipo`, `fecha`, `envio`, `respuesta`) VALUES
(48, 50, 'Empresa', '2024-10-29 22:51:32', 'ty', NULL);

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
  `fechaNac` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nombre`, `apellido`, `telefono`, `correo`, `password`, `fechaNac`) VALUES
(50, 'Felipe', 'Nass', '91111111', 'pipeta217@gmail.com', '$2y$10$WD4ZDuIsQDWg66COc4.W4.G0qWmz9VWCKLD6CD.EQAzzMxKF.55Xa', '2000-06-11');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_usuarios_empresas`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_usuarios_empresas` (
`id` int(11)
,`nombre` varchar(100)
,`correo` varchar(100)
,`password` varchar(255)
,`telefono` varchar(15)
,`tipo` varchar(9)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_usuarios_empresas`
--
DROP TABLE IF EXISTS `vista_usuarios_empresas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_usuarios_empresas`  AS SELECT `usuario`.`idUsuario` AS `id`, `usuario`.`nombre` AS `nombre`, `usuario`.`correo` AS `correo`, `usuario`.`password` AS `password`, `usuario`.`telefono` AS `telefono`, 'Comprador' AS `tipo` FROM `usuario`union all select `empresa`.`idEmpresa` AS `id`,`empresa`.`nombre` AS `nombre`,`empresa`.`correo` AS `correo`,`empresa`.`password` AS `password`,`empresa`.`telefono` AS `telefono`,'Empresa' AS `tipo` from `empresa`  ;

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
  ADD PRIMARY KEY (`idCarrito`);

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
  ADD PRIMARY KEY (`idDireccion`);

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`idEmpresa`),
  ADD UNIQUE KEY `rut` (`rut`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD UNIQUE KEY `telefono` (`telefono`);

--
-- Indices de la tabla `ofertas`
--
ALTER TABLE `ofertas`
  ADD PRIMARY KEY (`id`);

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
-- Indices de la tabla `productos_vistos`
--
ALTER TABLE `productos_vistos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idUsuario` (`idUsuario`,`idProducto`),
  ADD KEY `idProducto` (`idProducto`);

--
-- Indices de la tabla `reseñas`
--
ALTER TABLE `reseñas`
  ADD PRIMARY KEY (`idReseña`),
  ADD KEY `idProducto` (`idProducto`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`id`),
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
  MODIFY `idCarrito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1357;

--
-- AUTO_INCREMENT de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `direcciones`
--
ALTER TABLE `direcciones`
  MODIFY `idDireccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `empresa`
--
ALTER TABLE `empresa`
  MODIFY `idEmpresa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT de la tabla `ofertas`
--
ALTER TABLE `ofertas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `pagos`
--
ALTER TABLE `pagos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `paquete`
--
ALTER TABLE `paquete`
  MODIFY `idPaquete` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

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
-- AUTO_INCREMENT de la tabla `productos_vistos`
--
ALTER TABLE `productos_vistos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `reseñas`
--
ALTER TABLE `reseñas`
  MODIFY `idReseña` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `ticket`
--
ALTER TABLE `ticket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

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
-- Filtros para la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD CONSTRAINT `detalle_pedido_ibfk_1` FOREIGN KEY (`idEmpresa`) REFERENCES `empresa` (`idEmpresa`),
  ADD CONSTRAINT `detalle_pedido_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`id`),
  ADD CONSTRAINT `detalle_pedido_ibfk_3` FOREIGN KEY (`idPaquete`) REFERENCES `paquete` (`idPaquete`);

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
  ADD CONSTRAINT `fk_idCarrito` FOREIGN KEY (`idCarrito`) REFERENCES `carrito` (`idCarrito`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `fk_idEmpresa` FOREIGN KEY (`idEmpresa`) REFERENCES `empresa` (`idEmpresa`);

--
-- Filtros para la tabla `productos_vistos`
--
ALTER TABLE `productos_vistos`
  ADD CONSTRAINT `productos_vistos_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`),
  ADD CONSTRAINT `productos_vistos_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`id`);

--
-- Filtros para la tabla `reseñas`
--
ALTER TABLE `reseñas`
  ADD CONSTRAINT `reseñas_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`id`),
  ADD CONSTRAINT `reseñas_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`);

--
-- Filtros para la tabla `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`);

DELIMITER $$
--
-- Eventos
--
CREATE DEFINER=`root`@`localhost` EVENT `eliminar_ofertas_vencidas` ON SCHEDULE EVERY 1 DAY STARTS '2024-10-29 01:34:58' ON COMPLETION NOT PRESERVE ENABLE DO DELETE FROM ofertas WHERE fecha_expiracion < CURDATE()$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
