const pedidoOnlineService = require('../services/pedidoOnline.service');

const obtenerTodos = async (req, res, next) => {
  try {
    const pedidos = await pedidoOnlineService.obtenerTodos();
    return res.status(200).json({
      success: true,
      message: 'Pedidos online obtenidos correctamente',
      count: pedidos.length,
      data: pedidos
    });
  } catch (error) {
    next(error);
  }
};

const obtenerPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pedido = await pedidoOnlineService.obtenerPorId(id);
    return res.status(200).json({
      success: true,
      message: 'Pedido online obtenido correctamente',
      data: pedido
    });
  } catch (error) {
    next(error);
  }
};

const crear = async (req, res, next) => {
  try {
    const nuevoPedido = await pedidoOnlineService.crear(req.body);
    return res.status(201).json({
      success: true,
      message: 'Pedido online creado correctamente',
      data: nuevoPedido
    });
  } catch (error) {
    next(error);
  }
};

const actualizar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pedidoActualizado = await pedidoOnlineService.actualizar(id, req.body);
    return res.status(200).json({
      success: true,
      message: 'Pedido online actualizado correctamente',
      data: pedidoActualizado
    });
  } catch (error) {
    next(error);
  }
};

const eliminar = async (req, res, next) => {
  try {
    const { id } = req.params;
    await pedidoOnlineService.eliminar(id);
    return res.status(200).json({
      success: true,
      message: 'Pedido online eliminado correctamente'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};