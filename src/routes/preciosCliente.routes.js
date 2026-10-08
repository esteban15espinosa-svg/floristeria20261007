const express = require('express');
const router = express.Router();
const preciosClienteController = require('../controllers/preciosCliente.controller');
const { verificarToken, permitirRoles } = require('../middlewares/auth.middleware');

// Endpoints protegidos exclusivamente para ADMIN
router.use(verificarToken, permitirRoles('ADMIN'));

router.post('/', preciosClienteController.crear);
router.get('/', preciosClienteController.obtenerTodos);
router.get('/:id', preciosClienteController.obtenerPorId);
router.put('/:id', preciosClienteController.actualizar);
router.delete('/:id', preciosClienteController.eliminar);

module.exports = router;