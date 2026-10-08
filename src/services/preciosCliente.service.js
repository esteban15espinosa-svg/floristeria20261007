const mongoose = require('mongoose');
const PreciosCliente = require('../models/preciosCliente.model');

const obtenerTodos = async () => {
  return await PreciosCliente.find()
    .populate('cliente', 'nombreRazonSocial documento')
    .populate('producto', 'nombre precioVentaBase')
    .sort({ createdAt: -1 });
};

const obtenerPorId = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('El ID de precio de cliente no es válido');
    error.statusCode = 400;
    throw error;
  }

  const precio = await PreciosCliente.findById(id)
    .populate('cliente', 'nombreRazonSocial documento')
    .populate('producto', 'nombre precioVentaBase');

  if (!precio) {
    const error = new Error('Registro de precio no encontrado');
    error.statusCode = 404;
    throw error;
  }

  return precio;
};

const crear = async (datosPrecio) => {
  const precioExistente = await PreciosCliente.findOne({
    cliente: datosPrecio.cliente,
    producto: datosPrecio.producto
  });

  if (precioExistente) {
    const error = new Error('Ya existe un precio especial configurado para este cliente y producto');
    error.statusCode = 409;
    throw error;
  }

  const nuevoPrecio = new PreciosCliente(datosPrecio);
  return await nuevoPrecio.save();
};

const actualizar = async (id, datosPrecio) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('El ID de precio no es válido');
    error.statusCode = 400;
    throw error;
  }

  const precioActualizado = await PreciosCliente.findByIdAndUpdate(
    id,
    datosPrecio,
    { new: true, runValidators: true }
  )
    .populate('cliente', 'nombreRazonSocial documento')
    .populate('producto', 'nombre precioVentaBase');

  if (!precioActualizado) {
    const error = new Error('Registro de precio no encontrado');
    error.statusCode = 404;
    throw error;
  }

  return precioActualizado;
};

const eliminar = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('El ID de precio no es válido');
    error.statusCode = 400;
    throw error;
  }

  const precioEliminado = await PreciosCliente.findByIdAndDelete(id);
  if (!precioEliminado) {
    const error = new Error('Registro de precio no encontrado');
    error.statusCode = 404;
    throw error;
  }

  return precioEliminado;
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};