const express = require('express');

const router = express.Router();

const {
    imprimirBolsa
} = require('../controllers/reportes.controller');

router.get('/bolsa/:folio', imprimirBolsa);

module.exports = router;