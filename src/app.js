const express = require('express');
const cors = require('cors');

const bolsasRoutes = require('./routes/bolsas.routes');
const tallasRoutes = require('./routes/tallas.routes');
const coloresRoutes = require('./routes/colores.routes');
const authRoutes = require('./routes/auth.routes');
const statusRoutes = require('./routes/status.routes');
const reportesRoutes = require('./routes/reportes.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/bolsas', bolsasRoutes);
app.use('/tallas', tallasRoutes);
app.use('/colores', coloresRoutes);
app.use('/auth', authRoutes);
app.use('/status', statusRoutes);
app.use('/reportes', reportesRoutes);

module.exports = app;