const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoria.controller');
const { verificarToken, permitirRoles } = require('../middlewares/auth.middleware');

// Endpoints públicos
router.get('/', categoriaController.obtenerTodas);
router.get('/:id', categoriaController.obtenerPorId);

// Endpoints protegidos para ADMIN
router.use(verificarToken, permitirRoles('ADMIN'));

router.post('/', categoriaController.crear);
router.put('/:id', categoriaController.actualizar);
router.delete('/:id', categoriaController.eliminar);

module.exports = router;