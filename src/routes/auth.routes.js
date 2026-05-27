const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const {
    login
} = require('../controllers/auth.controller');

const validarCampos = require('../middlewares/validarCampos');

router.post(
    '/login',
    [
        body('usuario')
            .notEmpty()
            .withMessage('El usuario es obligatorio'),

        body('contrasena')
            .notEmpty()
            .withMessage('La contraseña es obligatoria'),

        validarCampos
    ],
    login
);

module.exports = router;