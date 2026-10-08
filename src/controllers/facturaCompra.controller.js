const facturaCompraService = require('../services/facturaCompra.service');

const obtenerTodas = async (req, res, next) => {
  try {
    const facturas = await facturaCompraService.obtenerTodas();
    return res.status(200).json({
      success: true,
      message: 'Facturas de compra obtenidas correctamente',
      count: facturas.length,
      data: facturas
    });
  } catch (error) {
    next(error);
  }
};

const obtenerPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const factura = await facturaCompraService.obtenerPorId(id);
    return res.status(200).json({
      success: true,
      message: 'Factura de compra obtenida correctamente',
      data: factura
    });
  } catch (error) {
    next(error);
  }
};

const crear = async (req, res, next) => {
  try {
    const nuevaFactura = await facturaCompraService.crear(req.body);
    return res.status(201).json({
      success: true,
      message: 'Factura de compra registrada correctamente',
      data: nuevaFactura
    });
  } catch (error) {
    next(error);
  }
};

const actualizar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const facturaActualizada = await facturaCompraService.actualizar(id, req.body);
    return res.status(200).json({
      success: true,
      message: 'Factura de compra actualizada correctamente',
      data: facturaActualizada
    });
  } catch (error) {
    next(error);
  }
};

const eliminar = async (req, res, next) => {
  try {
    const { id } = req.params;
    await facturaCompraService.eliminar(id);
    return res.status(200).json({
      success: true,
      message: 'Factura de compra eliminada correctamente'
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