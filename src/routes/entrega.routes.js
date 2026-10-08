const express = require('express');
const router = express.Router();
const entregaController = require('../controllers/entrega.controller');
const { verificarToken, permitirRoles } = require('../middlewares/auth.middleware');

// Endpoints protegidos para personal logístico (ADMIN y EMPLEADO)
router.use(verificarToken, permitirRoles('ADMIN', 'EMPLEADO'));

router.post('/', entregaController.crear);
router.get('/', entregaController.obtenerTodas);
router.get('/:id', entregaController.obtenerPorId);
router.put('/:id', entregaController.actualizar);
router.delete('/:id', entregaController.eliminar);

module.exports = router;