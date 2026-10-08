const express = require('express');
const router = express.Router();
const transaccionCajaController = require('../controllers/transaccionCaja.controller');
const { verificarToken, permitirRoles } = require('../middlewares/auth.middleware');

// Endpoints protegidos exclusivamente para ADMIN
router.use(verificarToken, permitirRoles('ADMIN'));

router.post('/', transaccionCajaController.crear);
router.get('/', transaccionCajaController.obtenerTodas);
router.get('/:id', transaccionCajaController.obtenerPorId);
router.put('/:id', transaccionCajaController.actualizar);
router.delete('/:id', transaccionCajaController.eliminar);

module.exports = router;