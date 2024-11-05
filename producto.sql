-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-11-2024 a las 06:24:33
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
  `idCarrito` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `cantidad` int(3) NOT NULL,
  `precio` int(6) NOT NULL,
  `descuento` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `idCarrito` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `estadoCarrito` enum('Pendiente','Confirmado') NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `cantidadProductos` int(3) DEFAULT NULL,
  `precioTotal` int(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `carrito`
--

INSERT INTO `carrito` (`idCarrito`, `fecha`, `estadoCarrito`, `idUsuario`, `cantidadProductos`, `precioTotal`) VALUES
(11, '2024-11-05 05:04:27', 'Pendiente', 1, NULL, NULL),
(12, '2024-11-05 05:07:32', 'Pendiente', 0, NULL, NULL),
(13, '2024-11-05 05:08:18', 'Pendiente', 3, NULL, NULL),
(14, '2024-11-05 05:08:53', 'Pendiente', 5, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

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
  `idEmpresa` int(11) NOT NULL,
  `idPaquete` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `cantidad` int(3) NOT NULL,
  `estado_preparacion` enum('Pendiente','Cancelado','En preparación','Enviado a depósito') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `direcciones`
--

INSERT INTO `direcciones` (`idDireccion`, `departamento`, `localidad`, `calle`, `esquina`, `numeroPuerta`, `numeroApto`, `cPostal`, `indicaciones`, `idUsuario`, `idEmpresa`) VALUES
(1, 'montevideo', 'Ciudad Vieja', 'Sarandí', '', '508', '', 11000, '', 1, NULL),
(3, 'san-jose', 'Plata', 'Calle', 'Esquina', '123', '', 11700, '', 3, NULL),
(4, 'montevideo', 'Brazo', 'Calle', 'Esquina', '132', '', 11700, '', 4, NULL),
(5, 'montevideo', 'Peñarol', 'Calle', 'Calle', '123', '', 11700, '', 5, NULL),
(6, 'montevideo', 'Localidad', 'Calle', 'Esquina', '123', '', 11700, '', NULL, 1),
(7, 'montevideo', 'Localidad', 'Calle', 'Esquina', '123', '', 11700, '', NULL, 2),
(8, 'montevideo', 'Localidad', 'Calle', 'Esquina', '123', '', 11700, '', NULL, 3),
(9, 'soriano', 'asd', 'asd', 'asd1', '12', '1', 11700, 'a', NULL, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE `empresa` (
  `idEmpresa` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `rut` varchar(12) NOT NULL,
  `numeroCuenta` varchar(20) NOT NULL,
  `telefono` varchar(9) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`idEmpresa`, `nombre`, `rut`, `numeroCuenta`, `telefono`, `correo`, `password`, `fecha`) VALUES
(1, 'Puma', '123123123', '123123123', '098123123', 'ropa.@gmail.com', '$2y$10$jmoYxy7Um4IH68pQG8NomOMIAr..x5m2SDD9tSKGlQ8xdQ.U4oTGi', '2024-11-03 17:30:01'),
(2, 'Nike', '123456789', '123123123789', '098132465', 'muebles.@gmail.com', '$2y$10$2gtfH3F.X2Tw5u8wMggyFO3WfVFhgjzpJv3FxbneBrlpP0LQhytTm', '2024-11-03 17:30:45'),
(3, 'Adidas', '789799123', '123789074562', '097465982', 'informatica.@gmail.com', '$2y$10$fzDxCu/8lpUQqgxX/iY5MOtlqx1A0D7LkySpySJ45xqx7eRLh.it.', '2024-11-03 17:31:27'),
(4, 'asd', '789799144', '123123123733', '097456444', 'manolo@gmail.com', '$2y$10$KYtcR8h8yVjWvMLGpvNtGO6Mf7yb9IC6kQHhwnKzUXHDsk5YdO5PG', '2024-11-05 00:52:11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ofertas`
--

CREATE TABLE `ofertas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `descuento` int(11) NOT NULL,
  `fecha_expiracion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idOrden` int(11) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `metodo_pago` varchar(20) DEFAULT NULL,
  `transaccion_id` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paquete`
--

CREATE TABLE `paquete` (
  `idPaquete` int(11) NOT NULL,
  `idDireccion` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idCarrito` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `estadoEnvio` enum('Pendiente','Esperando productos','Cancelado','En depósito','En camino','Entregado') NOT NULL,
  `tipoEntrega` enum('Domicilio','Centro de recogida') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pass_reset`
--

CREATE TABLE `pass_reset` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `token` int(6) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `pass_reset`
--

INSERT INTO `pass_reset` (`id`, `email`, `token`, `fecha`) VALUES
(1, 'pipeta217@gmail.com', 792451, '2024-11-03 21:32:09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `descripcion` varchar(20) NOT NULL,
  `precio` int(6) NOT NULL,
  `stock` int(3) NOT NULL,
  `oferta` enum('Si','No') NOT NULL,
  `condicion` enum('Nuevo','Usado') NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `idEmpresa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `nombre`, `descripcion`, `precio`, `stock`, `oferta`, `condicion`, `file_path`, `categoria`, `idEmpresa`) VALUES
(1, 'Remera', 'Blanca algodón', 700, 1, 'Si', 'Nuevo', '6727b49c61e5d.png', 'Ropa y Calzado', 1),
(2, 'Pantalon', 'Beige slim', 1500, 4, 'Si', 'Nuevo', '6727b4c17b355.jpg', 'Ropa y Calzado', 1),
(3, 'Campera de abrigo', 'Color verde', 2000, 3, 'Si', 'Nuevo', '6727b548d8e45.jpg', 'Ropa y Calzado', 1),
(4, 'Buzo algodón', 'Color rojo', 800, 1, 'Si', 'Nuevo', '6727b56d42ea0.jpg', 'Ropa y Calzado', 1),
(5, 'Pantalón deportivo', 'Gris algodón', 1200, 10, 'Si', 'Nuevo', '6727b656c1681.jpg', 'Ropa y Calzado', 1),
(6, 'Sofa', 'Marrón minimal', 4500, 3, 'Si', 'Nuevo', '6727b72377803.jpg', 'Hogar y Cocina', 2),
(7, 'Cajonera', 'Madera 4 cajones', 1300, 10, 'Si', 'Nuevo', '6727b8d83eac0.png', 'Hogar y Cocina', 2),
(8, 'Mesa comedor', 'Madera con sillas', 1700, 12, 'Si', 'Nuevo', '6727b93440a3f.png', 'Hogar y Cocina', 2),
(9, 'Escritorio', 'Con cajones', 1700, 9, 'Si', 'Nuevo', '6727b97118fd6.png', 'Hogar y Cocina', 2),
(10, 'Silla', 'Escritorio', 1500, 15, 'Si', 'Nuevo', '6727ba3736aec.png', 'Muebles', 2),
(11, 'Mouse Gamer', 'Inalambrico', 1200, 3, 'Si', 'Nuevo', '6727ba7982f59.png', 'Computadoras y Accesorios', 3),
(12, 'Teclado', '60 porciento', 3000, 3, 'No', 'Nuevo', '6727bac63cd7f.png', 'Computadoras y Accesorios', 3),
(13, 'Mouse pad', 'Mario bross', 500, 4, 'No', 'Nuevo', '6727baf95e812.png', 'Computadoras y Accesorios', 3),
(14, 'Monitor', 'Gamer 24 pulgadas', 7000, 4, 'No', 'Nuevo', '6727bb2b05938.png', 'Computadoras y Accesorios', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_vistos`
--

CREATE TABLE `productos_vistos` (
  `id` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `visto_en` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reseñas`
--

CREATE TABLE `reseñas` (
  `idReseña` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `reseña` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ticket`
--

CREATE TABLE `ticket` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `tipo` enum('Comprador','Empresa') NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `envio` varchar(100) DEFAULT NULL,
  `respuesta` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nombre`, `apellido`, `telefono`, `correo`, `password`, `fechaNac`) VALUES
(1, 'admin', '', '', 'admin', '$2y$10$8K8MIqevjjeo6OtgGq55U.zW1OlyDm7U8UhgNU2oQ5UsfjNSpML0u', '2001-06-11'),
(2, 'Facundo', 'Perez', '097456456', 'facundo.@gmail.com', '$2y$10$WY04yB3DHwYMGuSOQ.13UOPyexXUPWRAiTqu5rk7tDx8NZ/pLa8mK', '2001-05-05'),
(3, 'Luca', 'Cristaldo', '098789789', 'luca.@gmail.com', '$2y$10$5HekNARswx7pMDSLgVTwGeONm2/rlhKn0R8hjnD2imfaOiZfBrfV.', '2002-08-08'),
(4, 'Felipe', 'Cuiñas', '095555555', 'facu.@gmail.com', '$2y$10$WN.V2NHzR.u6wsHT75aAquiCfeHZ05ZO5TfiV.iyMKarVcdGfXHCW', '2003-06-11'),
(5, 'Alexander', 'Marquez', '096123123', 'alexander.@gmail.com', '$2y$10$F1KHA3SAKUfLRUqsudX.5ehIIUVMyuB89P1efQtviyBORp1rnc.dq', '2002-08-08');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_usuarios_empresas`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_usuarios_empresas` (
`id` int(11)
,`nombre` varchar(20)
,`correo` varchar(50)
,`password` varchar(255)
,`telefono` varchar(9)
,`tipo` varchar(7)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_usuarios_empresas`
--
DROP TABLE IF EXISTS `vista_usuarios_empresas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_usuarios_empresas`  AS SELECT `usuario`.`idUsuario` AS `id`, `usuario`.`nombre` AS `nombre`, `usuario`.`correo` AS `correo`, `usuario`.`password` AS `password`, `usuario`.`telefono` AS `telefono`, CASE WHEN `usuario`.`correo` = 'admin' THEN 'Admin' ELSE 'Usuario' END AS `tipo` FROM `usuario`union all select `empresa`.`idEmpresa` AS `id`,`empresa`.`nombre` AS `nombre`,`empresa`.`correo` AS `correo`,`empresa`.`password` AS `password`,`empresa`.`telefono` AS `telefono`,'Empresa' AS `tipo` from `empresa`  ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `almacena`
--
ALTER TABLE `almacena`
  ADD KEY `id` (`id`),
  ADD KEY `idCarrito` (`idCarrito`);

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
  ADD KEY `idPaquete` (`idPaquete`),
  ADD KEY `idProducto` (`idProducto`);

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
  ADD UNIQUE KEY `numeroCuenta` (`numeroCuenta`),
  ADD UNIQUE KEY `telefono` (`telefono`),
  ADD UNIQUE KEY `correo` (`correo`);

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
  ADD KEY `idCarrito` (`idCarrito`);

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
  ADD KEY `idEmpresa` (`idEmpresa`);

--
-- Indices de la tabla `productos_vistos`
--
ALTER TABLE `productos_vistos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idProducto` (`idProducto`,`idUsuario`);

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
  MODIFY `idCarrito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `direcciones`
--
ALTER TABLE `direcciones`
  MODIFY `idDireccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `empresa`
--
ALTER TABLE `empresa`
  MODIFY `idEmpresa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `ofertas`
--
ALTER TABLE `ofertas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `pagos`
--
ALTER TABLE `pagos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `paquete`
--
ALTER TABLE `paquete`
  MODIFY `idPaquete` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `pass_reset`
--
ALTER TABLE `pass_reset`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `productos_vistos`
--
ALTER TABLE `productos_vistos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `reseñas`
--
ALTER TABLE `reseñas`
  MODIFY `idReseña` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ticket`
--
ALTER TABLE `ticket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `almacena`
--
ALTER TABLE `almacena`
  ADD CONSTRAINT `almacena_ibfk_1` FOREIGN KEY (`id`) REFERENCES `producto` (`id`),
  ADD CONSTRAINT `almacena_ibfk_2` FOREIGN KEY (`idCarrito`) REFERENCES `carrito` (`idCarrito`);

--
-- Filtros para la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD CONSTRAINT `detalle_pedido_ibfk_1` FOREIGN KEY (`idEmpresa`) REFERENCES `empresa` (`idEmpresa`),
  ADD CONSTRAINT `detalle_pedido_ibfk_2` FOREIGN KEY (`idPaquete`) REFERENCES `paquete` (`idPaquete`),
  ADD CONSTRAINT `detalle_pedido_ibfk_3` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`id`);

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
  ADD CONSTRAINT `paquete_ibfk_1` FOREIGN KEY (`idCarrito`) REFERENCES `carrito` (`idCarrito`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`idEmpresa`) REFERENCES `empresa` (`idEmpresa`);

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
