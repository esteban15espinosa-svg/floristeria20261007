const empleadoService = require('../services/empleado.service');

const obtenerTodos = async (req, res, next) => {
  try {
    const empleados = await empleadoService.obtenerTodos();
    return res.status(200).json({
      success: true,
      message: 'Empleados obtenidos correctamente',
      count: empleados.length,
      data: empleados
    });
  } catch (error) {
    next(error);
  }
};

const obtenerPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const empleado = await empleadoService.obtenerPorId(id);
    return res.status(200).json({
      success: true,
      message: 'Empleado obtenido correctamente',
      data: empleado
    });
  } catch (error) {
    next(error);
  }
};

const crear = async (req, res, next) => {
  try {
    const nuevoEmpleado = await empleadoService.crear(req.body);
    return res.status(201).json({
      success: true,
      message: 'Empleado creado correctamente',
      data: nuevoEmpleado
    });
  } catch (error) {
    next(error);
  }
};

const actualizar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const empleadoActualizado = await empleadoService.actualizar(id, req.body);
    return res.status(200).json({
      success: true,
      message: 'Empleado actualizado correctamente',
      data: empleadoActualizado
    });
  } catch (error) {
    next(error);
  }
};

const eliminar = async (req, res, next) => {
  try {
    const { id } = req.params;
    await empleadoService.eliminar(id);
    return res.status(200).json({
      success: true,
      message: 'Empleado eliminado correctamente'
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