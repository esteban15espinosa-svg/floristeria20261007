const mongoose = require('mongoose');
const PedidoOnline = require('../models/pedidoOnline.model');

const obtenerTodos = async () => {
  return await PedidoOnline.find()
    .populate('cliente', 'nombreRazonSocial contacto')
    .populate('items.producto', 'nombre precioVentaBase')
    .sort({ createdAt: -1 });
};

const obtenerPorId = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('El ID del pedido online no es válido');
    error.statusCode = 400;
    throw error;
  }

  const pedido = await PedidoOnline.findById(id)
    .populate('cliente', 'nombreRazonSocial contacto')
    .populate('items.producto', 'nombre precioVentaBase');

  if (!pedido) {
    const error = new Error('Pedido online no encontrado');
    error.statusCode = 404;
    throw error;
  }

  return pedido;
};

const crear = async (datosPedido) => {
  const nuevoPedido = new PedidoOnline(datosPedido);
  return await nuevoPedido.save();
};

const actualizar = async (id, datosPedido) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('El ID del pedido online no es válido');
    error.statusCode = 400;
    throw error;
  }

  const pedidoActualizado = await PedidoOnline.findByIdAndUpdate(
    id,
    datosPedido,
    { new: true, runValidators: true }
  )
    .populate('cliente', 'nombreRazonSocial contacto')
    .populate('items.producto', 'nombre');

  if (!pedidoActualizado) {
    const error = new Error('Pedido online no encontrado');
    error.statusCode = 404;
    throw error;
  }

  return pedidoActualizado;
};

const eliminar = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('El ID del pedido online no es válido');
    error.statusCode = 400;
    throw error;
  }

  const pedidoEliminado = await PedidoOnline.findByIdAndDelete(id);
  if (!pedidoEliminado) {
    const error = new Error('Pedido online no encontrado');
    error.statusCode = 404;
    throw error;
  }

  return pedidoEliminado;
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};