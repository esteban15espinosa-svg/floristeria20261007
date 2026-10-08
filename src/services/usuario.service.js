const mongoose = require('mongoose');
const Usuario = require('../models/usuario.model');

const obtenerTodos = async () => {
  return await Usuario.find().select('-password').sort({ createdAt: -1 });
};

const obtenerPorId = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('El ID de usuario no es válido');
    error.statusCode = 400;
    throw error;
  }

  const usuario = await Usuario.findById(id).select('-password');
  if (!usuario) {
    const error = new Error('Usuario no encontrado');
    error.statusCode = 404;
    throw error;
  }
  return usuario;
};

const crear = async (datosUsuario) => {
  const usuarioExistente = await Usuario.findOne({
    $or: [{ email: datosUsuario.email }, { documento: datosUsuario.documento }]
  });

  if (usuarioExistente) {
    const error = new Error('Ya existe un usuario con ese correo o documento');
    error.statusCode = 409;
    throw error;
  }

  const nuevoUsuario = new Usuario(datosUsuario);
  return await nuevoUsuario.save();
};

const actualizar = async (id, datosUsuario) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('El ID de usuario no es válido');
    error.statusCode = 400;
    throw error;
  }

  const usuarioActualizado = await Usuario.findByIdAndUpdate(
    id,
    datosUsuario,
    { new: true, runValidators: true }
  ).select('-password');

  if (!usuarioActualizado) {
    const error = new Error('Usuario no encontrado');
    error.statusCode = 404;
    throw error;
  }

  return usuarioActualizado;
};

const eliminar = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('El ID de usuario no es válido');
    error.statusCode = 400;
    throw error;
  }

  const usuarioEliminado = await Usuario.findByIdAndDelete(id);
  if (!usuarioEliminado) {
    const error = new Error('Usuario no encontrado');
    error.statusCode = 404;
    throw error;
  }

  return usuarioEliminado;
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};