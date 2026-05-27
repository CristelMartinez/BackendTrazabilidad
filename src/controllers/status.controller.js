const prisma = require('../config/prisma');

const obtenerStatus = async (req, res) => {

    try {

        const status = await prisma.status.findMany({
            orderBy: {
                id: 'asc'
            }
        });

        res.json({
            ok: true,
            status
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            ok: false,
            mensaje: 'Error al obtener status'
        });
    }
};

module.exports = {
    obtenerStatus
};