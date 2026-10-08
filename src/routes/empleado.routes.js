const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleado.controller');
const { verificarToken, permitirRoles } = require('../middlewares/auth.middleware');

// Endpoints protegidos exclusivamente para ADMIN
router.use(verificarToken, permitirRoles('ADMIN'));

router.post('/', empleadoController.crear);
router.get('/', empleadoController.obtenerTodos);
router.get('/:id', empleadoController.obtenerPorId);
router.put('/:id', empleadoController.actualizar);
router.delete('/:id', empleadoController.eliminar);

module.exports = router;