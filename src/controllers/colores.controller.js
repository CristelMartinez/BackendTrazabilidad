const prisma = require('../config/prisma');

const obtenerColores = async (req, res) => {

    try {

        const { modelo, codigo } = req.query;

        const colores = await prisma.colores.findMany({
            where: {
                modelo,
                codigo
            }
        });

        res.json({
            ok: true,
            colores
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            ok: false,
            mensaje: 'Error al obtener colores'
        });
    }
};

module.exports = {
    obtenerColores
};