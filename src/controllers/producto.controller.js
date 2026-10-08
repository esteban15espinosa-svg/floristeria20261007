const productoService = require('../services/producto.service');

const obtenerTodos = async (req, res, next) => {
  try {
    const productos = await productoService.obtenerTodos();
    return res.status(200).json({
      success: true,
      message: 'Productos obtenidos correctamente',
      count: productos.length,
      data: productos
    });
  } catch (error) {
    next(error);
  }
};

const obtenerPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const producto = await productoService.obtenerPorId(id);
    return res.status(200).json({
      success: true,
      message: 'Producto obtenido correctamente',
      data: producto
    });
  } catch (error) {
    next(error);
  }
};

const crear = async (req, res, next) => {
  try {
    const nuevoProducto = await productoService.crear(req.body);
    return res.status(201).json({
      success: true,
      message: 'Producto creado correctamente',
      data: nuevoProducto
    });
  } catch (error) {
    next(error);
  }
};

const actualizar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productoActualizado = await productoService.actualizar(id, req.body);
    return res.status(200).json({
      success: true,
      message: 'Producto actualizado correctamente',
      data: productoActualizado
    });
  } catch (error) {
    next(error);
  }
};

const eliminar = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productoService.eliminar(id);
    return res.status(200).json({
      success: true,
      message: 'Producto eliminado correctamente'
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