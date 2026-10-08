const express = require('express');
const router = express.Router();
const facturaVentaController = require('../controllers/facturaVenta.controller');
const { verificarToken, permitirRoles } = require('../middlewares/auth.middleware');

// Endpoints protegidos exclusivamente para ADMIN
router.use(verificarToken, permitirRoles('ADMIN'));

router.post('/', facturaVentaController.crear);
router.get('/', facturaVentaController.obtenerTodas);
router.get('/:id', facturaVentaController.obtenerPorId);
router.put('/:id', facturaVentaController.actualizar);
router.delete('/:id', facturaVentaController.eliminar);

module.exports = router;