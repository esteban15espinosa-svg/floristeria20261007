const mongoose = require('mongoose');
const Categoria = require('../models/categoria.model');

const obtenerTodas = async () => {
  return await Categoria.find().sort({ createdAt: -1 });
};

const obtenerPorId = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('El ID de la categoría no es válido');
    error.statusCode = 400;
    throw error;
  }

  const categoria = await Categoria.findById(id);
  if (!categoria) {
    const error = new Error('Categoría no encontrada');
    error.statusCode = 404;
    throw error;
  }

  return categoria;
};

const crear = async (datosCategoria) => {
  const categoriaExistente = await Categoria.findOne({
    nombre: { $regex: new RegExp(`^${datosCategoria.nombre}$`, 'i') }
  });

  if (categoriaExistente) {
    const error = new Error('Ya existe una categoría registrada con ese nombre');
    error.statusCode = 409;
    throw error;
  }

  const nuevaCategoria = new Categoria(datosCategoria);
  return await nuevaCategoria.save();
};

const actualizar = async (id, datosCategoria) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('El ID de la categoría no es válido');
    error.statusCode = 400;
    throw error;
  }

  const categoriaActualizada = await Categoria.findByIdAndUpdate(
    id,
    datosCategoria,
    { new: true, runValidators: true }
  );

  if (!categoriaActualizada) {
    const error = new Error('Categoría no encontrada');
    error.statusCode = 404;
    throw error;
  }

  return categoriaActualizada;
};

const eliminar = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('El ID de la categoría no es válido');
    error.statusCode = 400;
    throw error;
  }

  const categoriaEliminada = await Categoria.findByIdAndDelete(id);
  if (!categoriaEliminada) {
    const error = new Error('Categoría no encontrada');
    error.statusCode = 404;
    throw error;
  }

  return categoriaEliminada;
};

module.exports = {
  obtenerTodas,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};