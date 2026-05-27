const express = require('express');
const { body } = require('express-validator');
const validarCampos = require('../middlewares/validarCampos');
const router = express.Router();

const {
    crearBolsa,
    obtenerBolsas,
    actualizarStatus,
    obtenerBolsasPorPedido,
    obtenerRestantes
} = require('../controllers/bolsas.controller');

router.post(
    '/',
    [
        body('numero_pedido').notEmpty().withMessage('El número de pedido es obligatorio'),
        body('modelo').notEmpty().withMessage('El modelo es obligatorio'),
        body('codigo').notEmpty().withMessage('El código es obligatorio'),
        body('talla_id').isInt({ min: 1 }).withMessage('La talla es inválida'),
        body('color_id')
            .optional({ nullable: true })
            .isInt({ min: 1 })
            .withMessage('El color es inválido'),
        body('status_id').isInt({ min: 1 }).withMessage('El status es inválido'),
        body('piezas').isInt({ min: 1, max: 1000 }).withMessage('Las piezas deben estar entre 1 y 1000'),
        body('total_piezas').if((value, { req }) => !req.body._esPrimeraBolsa)
            .optional()
            .isInt({ min: 1 }).withMessage('El total de piezas debe ser mayor a 0'),
        validarCampos
    ],
    crearBolsa
);

// Importante: /restantes debe ir ANTES de /:folio/status para que Express no lo confunda
router.get('/restantes', obtenerRestantes);
router.get('/', obtenerBolsas);
router.put('/:folio/status', actualizarStatus);
router.get('/pedido/:pedido', obtenerBolsasPorPedido);

module.exports = router;