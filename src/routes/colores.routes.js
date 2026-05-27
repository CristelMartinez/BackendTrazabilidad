const express = require('express');

const router = express.Router();

const {
    obtenerColores
} = require('../controllers/colores.controller');

router.get('/', obtenerColores);

module.exports = router;