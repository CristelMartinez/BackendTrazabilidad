const express = require('express');

const router = express.Router();

const {
    obtenerTallas
} = require('../controllers/tallas.controller');

router.get('/', obtenerTallas);

module.exports = router;