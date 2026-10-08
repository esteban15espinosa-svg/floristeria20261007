const mongoose = require('mongoose');
const Empleado = require('../models/empleado.model');

const obtenerTodos = async () => {
  return await Empleado.find()
    .populate('usuario', 'nombreRazonSocial documento contacto email')
    .sort({ createdAt: -1 });
};

const obtenerPorId = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('El ID del empleado no es válido');
    error.statusCode = 400;
    throw error;
  }

  const empleado = await Empleado.findById(id).populate(
    'usuario',
    'nombreRazonSocial documento contacto email'
  );

  if (!empleado) {
    const error = new Error('Empleado no encontrado');
    error.statusCode = 404;
    throw error;
  }

  return empleado;
};

const crear = async (datosEmpleado) => {
  const empleadoExistente = await Empleado.findOne({ usuario: datosEmpleado.usuario });
  if (empleadoExistente) {
    const error = new Error('El usuario especificado ya está registrado como empleado');
    error.statusCode = 409;
    throw error;
  }

  const nuevoEmpleado = new Empleado(datosEmpleado);
  return await nuevoEmpleado.save();
};

const actualizar = async (id, datosEmpleado) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('El ID del empleado no es válido');
    error.statusCode = 400;
    throw error;
  }

  const empleadoActualizado = await Empleado.findByIdAndUpdate(
    id,
    datosEmpleado,
    { new: true, runValidators: true }
  ).populate('usuario', 'nombreRazonSocial documento contacto email');

  if (!empleadoActualizado) {
    const error = new Error('Empleado no encontrado');
    error.statusCode = 404;
    throw error;
  }

  return empleadoActualizado;
};

const eliminar = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('El ID del empleado no es válido');
    error.statusCode = 400;
    throw error;
  }

  const empleadoEliminado = await Empleado.findByIdAndDelete(id);
  if (!empleadoEliminado) {
    const error = new Error('Empleado no encontrado');
    error.statusCode = 404;
    throw error;
  }

  return empleadoEliminado;
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};