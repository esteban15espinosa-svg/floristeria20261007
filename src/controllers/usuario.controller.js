const usuarioService = require('../services/usuario.service');

const obtenerTodos = async (req, res, next) => {
  try {
    const usuarios = await usuarioService.obtenerTodos();
    return res.status(200).json({
      success: true,
      message: 'Usuarios obtenidos correctamente',
      count: usuarios.length,
      data: usuarios
    });
  } catch (error) {
    next(error);
  }
};

const obtenerPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuario = await usuarioService.obtenerPorId(id);
    return res.status(200).json({
      success: true,
      message: 'Usuario obtenido correctamente',
      data: usuario
    });
  } catch (error) {
    next(error);
  }
};

const crear = async (req, res, next) => {
  try {
    const nuevoUsuario = await usuarioService.crear(req.body);
    return res.status(201).json({
      success: true,
      message: 'Usuario creado correctamente',
      data: nuevoUsuario
    });
  } catch (error) {
    next(error);
  }
};

const actualizar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuarioActualizado = await usuarioService.actualizar(id, req.body);
    return res.status(200).json({
      success: true,
      message: 'Usuario actualizado correctamente',
      data: usuarioActualizado
    });
  } catch (error) {
    next(error);
  }
};

const eliminar = async (req, res, next) => {
  try {
    const { id } = req.params;
    await usuarioService.eliminar(id);
    return res.status(200).json({
      success: true,
      message: 'Usuario eliminado correctamente'
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