const express = require('express');
const router = express.Router();
const pedidoOnlineController = require('../controllers/pedidoOnline.controller');
const { verificarToken, permitirRoles } = require('../middlewares/auth.middleware');

// Endpoint público (Web / WhatsApp)
router.post('/', pedidoOnlineController.crear);

// Endpoints protegidos para personal interno (ADMIN y EMPLEADO)
router.use(verificarToken, permitirRoles('ADMIN', 'EMPLEADO'));

router.get('/', pedidoOnlineController.obtenerTodos);
router.get('/:id', pedidoOnlineController.obtenerPorId);
router.put('/:id', pedidoOnlineController.actualizar);
router.delete('/:id', pedidoOnlineController.eliminar);

module.exports = router;