const transaccionCajaService = require('../services/transaccionCaja.service');

const obtenerTodas = async (req, res, next) => {
  try {
    const transacciones = await transaccionCajaService.obtenerTodas();
    return res.status(200).json({
      success: true,
      message: 'Transacciones de caja obtenidas correctamente',
      count: transacciones.length,
      data: transacciones
    });
  } catch (error) {
    next(error);
  }
};

const obtenerPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaccion = await transaccionCajaService.obtenerPorId(id);
    return res.status(200).json({
      success: true,
      message: 'Transacción de caja obtenida correctamente',
      data: transaccion
    });
  } catch (error) {
    next(error);
  }
};

const crear = async (req, res, next) => {
  try {
    const nuevaTransaccion = await transaccionCajaService.crear(req.body);
    return res.status(201).json({
      success: true,
      message: 'Transacción de caja registrada correctamente',
      data: nuevaTransaccion
    });
  } catch (error) {
    next(error);
  }
};

const actualizar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaccionActualizada = await transaccionCajaService.actualizar(id, req.body);
    return res.status(200).json({
      success: true,
      message: 'Transacción de caja actualizada correctamente',
      data: transaccionActualizada
    });
  } catch (error) {
    next(error);
  }
};

const eliminar = async (req, res, next) => {
  try {
    const { id } = req.params;
    await transaccionCajaService.eliminar(id);
    return res.status(200).json({
      success: true,
      message: 'Transacción de caja eliminada correctamente'
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