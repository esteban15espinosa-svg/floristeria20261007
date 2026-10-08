const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');
const { verificarToken, permitirRoles } = require('../middlewares/auth.middleware');

// Endpoints públicos (Catálogo de flores)
router.get('/', productoController.obtenerTodos);
router.get('/:id', productoController.obtenerPorId);

// Endpoints protegidos para ADMIN
router.use(verificarToken, permitirRoles('ADMIN'));

router.post('/', productoController.crear);
router.put('/:id', productoController.actualizar);
router.delete('/:id', productoController.eliminar);

module.exports = router;