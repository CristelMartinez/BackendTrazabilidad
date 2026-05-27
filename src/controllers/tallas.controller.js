const prisma = require('../config/prisma');

const obtenerTallas = async (req, res) => {

    try {

        const tallas = await prisma.tallas.findMany({
            orderBy: {
                id: 'asc'
            }
        });

        res.json({
            ok: true,
            tallas
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            ok: false,
            mensaje: 'Error al obtener tallas'
        });
    }
};

module.exports = {
    obtenerTallas
};