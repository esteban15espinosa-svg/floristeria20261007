const preciosClienteService = require('../services/preciosCliente.service');

const obtenerTodos = async (req, res, next) => {
  try {
    const precios = await preciosClienteService.obtenerTodos();
    return res.status(200).json({
      success: true,
      message: 'Precios de cliente obtenidos correctamente',
      count: precios.length,
      data: precios
    });
  } catch (error) {
    next(error);
  }
};

const obtenerPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const precio = await preciosClienteService.obtenerPorId(id);
    return res.status(200).json({
      success: true,
      message: 'Precio de cliente obtenido correctamente',
      data: precio
    });
  } catch (error) {
    next(error);
  }
};

const crear = async (req, res, next) => {
  try {
    const nuevoPrecio = await preciosClienteService.crear(req.body);
    return res.status(201).json({
      success: true,
      message: 'Precio especial asignado correctamente',
      data: nuevoPrecio
    });
  } catch (error) {
    next(error);
  }
};

const actualizar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const precioActualizado = await preciosClienteService.actualizar(id, req.body);
    return res.status(200).json({
      success: true,
      message: 'Precio de cliente actualizado correctamente',
      data: precioActualizado
    });
  } catch (error) {
    next(error);
  }
};

const eliminar = async (req, res, next) => {
  try {
    const { id } = req.params;
    await preciosClienteService.eliminar(id);
    return res.status(200).json({
      success: true,
      message: 'Precio de cliente eliminado correctamente'
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