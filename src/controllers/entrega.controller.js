const entregaService = require('../services/entrega.service');

const obtenerTodas = async (req, res, next) => {
  try {
    const entregas = await entregaService.obtenerTodas();
    return res.status(200).json({
      success: true,
      message: 'Entregas obtenidas correctamente',
      count: entregas.length,
      data: entregas
    });
  } catch (error) {
    next(error);
  }
};

const obtenerPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const entrega = await entregaService.obtenerPorId(id);
    return res.status(200).json({
      success: true,
      message: 'Entrega obtenida correctamente',
      data: entrega
    });
  } catch (error) {
    next(error);
  }
};

const crear = async (req, res, next) => {
  try {
    const nuevaEntrega = await entregaService.crear(req.body);
    return res.status(201).json({
      success: true,
      message: 'Entrega registrada correctamente',
      data: nuevaEntrega
    });
  } catch (error) {
    next(error);
  }
};

const actualizar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const entregaActualizada = await entregaService.actualizar(id, req.body);
    return res.status(200).json({
      success: true,
      message: 'Entrega actualizada correctamente',
      data: entregaActualizada
    });
  } catch (error) {
    next(error);
  }
};

const eliminar = async (req, res, next) => {
  try {
    const { id } = req.params;
    await entregaService.eliminar(id);
    return res.status(200).json({
      success: true,
      message: 'Entrega eliminada correctamente'
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