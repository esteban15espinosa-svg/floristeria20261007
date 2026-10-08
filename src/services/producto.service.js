const mongoose = require('mongoose');
const Producto = require('../models/producto.model');

const obtenerTodos = async () => {
  return await Producto.find().populate('categoria', 'nombre').sort({ createdAt: -1 });
};

const obtenerPorId = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('El ID del producto no es válido');
    error.statusCode = 400;
    throw error;
  }

  const producto = await Producto.findById(id).populate('categoria', 'nombre');
  if (!producto) {
    const error = new Error('Producto no encontrado');
    error.statusCode = 404;
    throw error;
  }

  return producto;
};

const crear = async (datosProducto) => {
  const nuevoProducto = new Producto(datosProducto);
  return await nuevoProducto.save();
};

const actualizar = async (id, datosProducto) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('El ID del producto no es válido');
    error.statusCode = 400;
    throw error;
  }

  const productoActualizado = await Producto.findByIdAndUpdate(
    id,
    datosProducto,
    { new: true, runValidators: true }
  ).populate('categoria', 'nombre');

  if (!productoActualizado) {
    const error = new Error('Producto no encontrado');
    error.statusCode = 404;
    throw error;
  }

  return productoActualizado;
};

const eliminar = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('El ID del producto no es válido');
    error.statusCode = 400;
    throw error;
  }

  const productoEliminado = await Producto.findByIdAndDelete(id);
  if (!productoEliminado) {
    const error = new Error('Producto no encontrado');
    error.statusCode = 404;
    throw error;
  }

  return productoEliminado;
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};