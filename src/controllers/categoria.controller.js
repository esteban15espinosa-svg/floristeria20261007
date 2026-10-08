const categoriaService = require('../services/categoria.service');

const obtenerTodas = async (req, res, next) => {
  try {
    const categorias = await categoriaService.obtenerTodas();
    return res.status(200).json({
      success: true,
      message: 'Categorías obtenidas correctamente',
      count: categorias.length,
      data: categorias
    });
  } catch (error) {
    next(error);
  }
};

const obtenerPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categoria = await categoriaService.obtenerPorId(id);
    return res.status(200).json({
      success: true,
      message: 'Categoría obtenida correctamente',
      data: categoria
    });
  } catch (error) {
    next(error);
  }
};

const crear = async (req, res, next) => {
  try {
    const nuevaCategoria = await categoriaService.crear(req.body);
    return res.status(201).json({
      success: true,
      message: 'Categoría creada correctamente',
      data: nuevaCategoria
    });
  } catch (error) {
    next(error);
  }
};

const actualizar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categoriaActualizada = await categoriaService.actualizar(id, req.body);
    return res.status(200).json({
      success: true,
      message: 'Categoría actualizada correctamente',
      data: categoriaActualizada
    });
  } catch (error) {
    next(error);
  }
};

const eliminar = async (req, res, next) => {
  try {
    const { id } = req.params;
    await categoriaService.eliminar(id);
    return res.status(200).json({
      success: true,
      message: 'Categoría eliminada correctamente'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  obtenerTodas,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};