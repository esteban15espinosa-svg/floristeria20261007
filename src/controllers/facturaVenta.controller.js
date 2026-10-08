const facturaVentaService = require('../services/facturaVenta.service');

const obtenerTodas = async (req, res, next) => {
  try {
    const facturas = await facturaVentaService.obtenerTodas();
    return res.status(200).json({
      success: true,
      message: 'Facturas de venta obtenidas correctamente',
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
    const factura = await facturaVentaService.obtenerPorId(id);
    return res.status(200).json({
      success: true,
      message: 'Factura de venta obtenida correctamente',
      data: factura
    });
  } catch (error) {
    next(error);
  }
};

const crear = async (req, res, next) => {
  try {
    const nuevaFactura = await facturaVentaService.crear(req.body);
    return res.status(201).json({
      success: true,
      message: 'Factura de venta creada correctamente',
      data: nuevaFactura
    });
  } catch (error) {
    next(error);
  }
};

const actualizar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const facturaActualizada = await facturaVentaService.actualizar(id, req.body);
    return res.status(200).json({
      success: true,
      message: 'Factura de venta actualizada correctamente',
      data: facturaActualizada
    });
  } catch (error) {
    next(error);
  }
};

const eliminar = async (req, res, next) => {
  try {
    const { id } = req.params;
    await facturaVentaService.eliminar(id);
    return res.status(200).json({
      success: true,
      message: 'Factura de venta eliminada correctamente'
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