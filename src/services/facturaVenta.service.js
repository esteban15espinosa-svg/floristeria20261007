const mongoose = require('mongoose');
const FacturaVenta = require('../models/facturaVenta.model');

const obtenerTodas = async () => {
  return await FacturaVenta.find()
    .populate('cliente', 'nombreRazonSocial documento')
    .populate('vendedor')
    .populate('items.producto', 'nombre')
    .sort({ createdAt: -1 });
};

const obtenerPorId = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('El ID de la factura no es válido');
    error.statusCode = 400;
    throw error;
  }

  const factura = await FacturaVenta.findById(id)
    .populate('cliente', 'nombreRazonSocial documento')
    .populate('vendedor')
    .populate('items.producto', 'nombre');

  if (!factura) {
    const error = new Error('Factura de venta no encontrada');
    error.statusCode = 404;
    throw error;
  }

  return factura;
};

const crear = async (datosFactura) => {
  const nuevaFactura = new FacturaVenta(datosFactura);
  return await nuevaFactura.save();
};

const actualizar = async (id, datosFactura) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('El ID de la factura no es válido');
    error.statusCode = 400;
    throw error;
  }

  const facturaActualizada = await FacturaVenta.findByIdAndUpdate(
    id,
    datosFactura,
    { new: true, runValidators: true }
  );

  if (!facturaActualizada) {
    const error = new Error('Factura de venta no encontrada');
    error.statusCode = 404;
    throw error;
  }

  return facturaActualizada;
};

const eliminar = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('El ID de la factura no es válido');
    error.statusCode = 400;
    throw error;
  }

  const facturaEliminada = await FacturaVenta.findByIdAndDelete(id);
  if (!facturaEliminada) {
    const error = new Error('Factura de venta no encontrada');
    error.statusCode = 404;
    throw error;
  }

  return facturaEliminada;
};

module.exports = {
  obtenerTodas,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};