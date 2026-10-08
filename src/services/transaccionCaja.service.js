const mongoose = require('mongoose');
const TransaccionCaja = require('../models/transaccionCaja.model');

const obtenerTodas = async () => {
  return await TransaccionCaja.find().sort({ fecha: -1 });
};

const obtenerPorId = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('El ID de la transacción no es válido');
    error.statusCode = 400;
    throw error;
  }

  const transaccion = await TransaccionCaja.findById(id);
  if (!transaccion) {
    const error = new Error('Transacción no encontrada');
    error.statusCode = 404;
    throw error;
  }

  return transaccion;
};

const crear = async (datosTransaccion) => {
  if (!datosTransaccion.monto || datosTransaccion.monto <= 0) {
    const error = new Error('El monto debe ser mayor a 0');
    error.statusCode = 400;
    throw error;
  }

  const nuevaTransaccion = new TransaccionCaja(datosTransaccion);
  return await nuevaTransaccion.save();
};

const actualizar = async (id, datosTransaccion) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('El ID de la transacción no es válido');
    error.statusCode = 400;
    throw error;
  }

  const transaccionActualizada = await TransaccionCaja.findByIdAndUpdate(
    id,
    datosTransaccion,
    { new: true, runValidators: true }
  );

  if (!transaccionActualizada) {
    const error = new Error('Transacción no encontrada');
    error.statusCode = 404;
    throw error;
  }

  return transaccionActualizada;
};

const eliminar = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('El ID de la transacción no es válido');
    error.statusCode = 400;
    throw error;
  }

  const transaccionEliminada = await TransaccionCaja.findByIdAndDelete(id);
  if (!transaccionEliminada) {
    const error = new Error('Transacción no encontrada');
    error.statusCode = 404;
    throw error;
  }

  return transaccionEliminada;
};

module.exports = {
  obtenerTodas,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};