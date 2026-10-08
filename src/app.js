const express = require('express');
const cors = require('cors');

// Importación de Rutas
const usuarioRoutes = require('./routes/usuario.routes');
const productoRoutes = require('./routes/producto.routes');
const categoriaRoutes = require('./routes/categoria.routes');
const preciosClienteRoutes = require('./routes/preciosCliente.routes');
const pedidoOnlineRoutes = require('./routes/pedidoOnline.routes');
const facturaVentaRoutes = require('./routes/facturaVenta.routes');
const facturaCompraRoutes = require('./routes/facturaCompra.routes');
const empleadoRoutes = require('./routes/empleado.routes');
const entregaRoutes = require('./routes/entrega.routes');
const transaccionCajaRoutes = require('./routes/transaccionCaja.routes');

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: process.env.CLIENT_URL || '*', // O especifica tu frontend (ej: 'http://localhost:5173')
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions)); // Aplicar CORS globalmente
app.use(express.json());

// Registro de Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/precios-cliente', preciosClienteRoutes);
app.use('/api/pedidos-online', pedidoOnlineRoutes);
app.use('/api/facturas-venta', facturaVentaRoutes);
app.use('/api/facturas-compra', facturaCompraRoutes);
app.use('/api/empleados', empleadoRoutes);
app.use('/api/entregas', entregaRoutes);
app.use('/api/transacciones-caja', transaccionCajaRoutes);

module.exports = app;