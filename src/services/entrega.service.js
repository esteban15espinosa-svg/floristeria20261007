const mongoose = require('mongoose');
const Entrega = require('../models/entrega.model');

const obtenerTodas = async () => {
  return await Entrega.find()
    .populate({
      path: 'facturaVenta',
      populate: { path: 'cliente', select: 'nombreRazonSocial contacto' }
    })
    .populate({
      path: 'repartidor',
      populate: { path: 'usuario', select: 'nombreRazonSocial' }
    })
    .sort({ createdAt: -1 });
};

const obtenerPorId = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('El ID de la entrega no es válido');
    error.statusCode = 400;
    throw error;
  }

  const entrega = await Entrega.findById(id)
    .populate({
      path: 'facturaVenta',
      populate: { path: 'cliente', select: 'nombreRazonSocial contacto' }
    })
    .populate({
      path: 'repartidor',
      populate: { path: 'usuario', select: 'nombreRazonSocial' }
    });

  if (!entrega) {
    const error = new Error('Entrega no encontrada');
    error.statusCode = 404;
    throw error;
  }

  return entrega;
};

const crear = async (datosEntrega) => {
  const entregaExistente = await Entrega.findOne({
    facturaVenta: datosEntrega.facturaVenta
  });

  if (entregaExistente) {
    const error = new Error('Ya existe una orden de entrega para esta factura');
    error.statusCode = 409;
    throw error;
  }

  const nuevaEntrega = new Entrega(datosEntrega);
  return await nuevaEntrega.save();
};

const actualizar = async (id, datosEntrega) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('El ID de la entrega no es válido');
    error.statusCode = 400;
    throw error;
  }

  const entregaActualizada = await Entrega.findByIdAndUpdate(
    id,
    datosEntrega,
    { new: true, runValidators: true }
  );

  if (!entregaActualizada) {
    const error = new Error('Entrega no encontrada');
    error.statusCode = 404;
    throw error;
  }

  return entregaActualizada;
};

const eliminar = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('El ID de la entrega no es válido');
    error.statusCode = 400;
    throw error;
  }

  const entregaEliminada = await Entrega.findByIdAndDelete(id);
  if (!entregaEliminada) {
    const error = new Error('Entrega no encontrada');
    error.statusCode = 404;
    throw error;
  }

  return entregaEliminada;
};

module.exports = {
  obtenerTodas,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};