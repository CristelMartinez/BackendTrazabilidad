const express = require('express');

const router = express.Router();

const {
    obtenerStatus
} = require('../controllers/status.controller');

router.get('/', obtenerStatus);

module.exports = router;