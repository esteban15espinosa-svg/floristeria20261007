const express = require('express');
const router = express.Router();
const facturaCompraController = require('../controllers/facturaCompra.controller');
const { verificarToken, permitirRoles } = require('../middlewares/auth.middleware');

// Endpoints protegidos exclusivamente para ADMIN
router.use(verificarToken, permitirRoles('ADMIN'));

router.post('/', facturaCompraController.crear);
router.get('/', facturaCompraController.obtenerTodas);
router.get('/:id', facturaCompraController.obtenerPorId);
router.put('/:id', facturaCompraController.actualizar);
router.delete('/:id', facturaCompraController.eliminar);

module.exports = router;