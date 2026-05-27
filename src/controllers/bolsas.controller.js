const prisma = require('../config/prisma');

const crearBolsa = async (req, res) => {
    try {
        const {
            numero_pedido,
            modelo,
            codigo,
            talla_id,
            color_id,
            nuevo_color,
            piezas,
            status_id,
            total: totalDelRequest  // campo correcto según schema: "total"
        } = req.body;

        // Buscar si ya existe alguna bolsa del mismo grupo (pedido+modelo+codigo+talla)
        const bolsaExistente = await prisma.bolsas.findFirst({
            where: { numero_pedido, modelo, codigo, talla_id },
            orderBy: { folio: 'desc' }
        });

        let total;
        let restantes;

        if (bolsaExistente) {
            // Ya existen bolsas del grupo: tomar el total guardado
            total = bolsaExistente.total;

            const agregado = await prisma.bolsas.aggregate({
                where: { numero_pedido, modelo, codigo, talla_id },
                _sum: { piezas: true }
            });

            const piezasAcumuladas = agregado._sum.piezas || 0;
            restantes = total - piezasAcumuladas - piezas;
        } else {
            // Primera bolsa del grupo
            total = totalDelRequest;
            restantes = total - piezas;
        }

        if (restantes < 0) {
            return res.status(400).json({
                ok: false,
                mensaje: `Las piezas exceden el total. Solo quedan ${restantes + piezas} piezas disponibles.`
            });
        }
        let finalColorId = color_id;

        if (nuevo_color && nuevo_color.trim()) {

            const colorNormalizado = nuevo_color.trim();

            let colorExistente = await prisma.colores.findFirst({
                where: {
                    modelo,
                    codigo,
                    color: {
                        equals: colorNormalizado,
                        mode: 'insensitive'
                    }
                }
            });

            if (!colorExistente) {

                colorExistente = await prisma.colores.create({
                    data: {
                        modelo,
                        codigo,
                        color: colorNormalizado
                    }
                });
            }

            finalColorId = colorExistente.id;
        }

        if (!finalColorId) {

            return res.status(400).json({
                ok: false,
                mensaje: 'Color inválido'
            });
        }

        const nuevaBolsa = await prisma.bolsas.create({
            data: {
                numero_pedido,
                modelo,
                codigo,
                talla_id,
                color_id: finalColorId,
                piezas,
                status_id,
                total,       // campo correcto
                restantes
            }
        });

        res.status(201).json({ ok: true, bolsa: nuevaBolsa });

    } catch (error) {

    console.error('ERROR COMPLETO:');
    console.error(error);

    return res.status(500).json({
        ok: false,
        mensaje: error.message
    });
}
};

const obtenerBolsas = async (req, res) => {
    try {
        const bolsas = await prisma.bolsas.findMany({
            include: {
                talla: true,
                color: true,
                status: true
            },
            orderBy: { folio: 'desc' }
        });

        res.json({ ok: true, bolsas });

    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, mensaje: 'Error al obtener bolsas' });
    }
};

const actualizarStatus = async (req, res) => {
    try {
        const { folio } = req.params;
        const { status_id } = req.body;

        const bolsaActualizada = await prisma.bolsas.update({
            where: { folio: Number(folio) },
            data: { status_id },
            include: { status: true }
        });

        res.json({ ok: true, bolsa: bolsaActualizada });

    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, mensaje: 'Error al actualizar status' });
    }
};

const obtenerBolsasPorPedido = async (req, res) => {
    try {
        const { pedido } = req.params;

        const bolsas = await prisma.bolsas.findMany({
            where: { numero_pedido: pedido },
            include: {
                talla: true,
                color: true,
                status: true
            },
            orderBy: { folio: 'asc' }
        });

        res.json({ ok: true, bolsas });

    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, mensaje: 'Error al obtener bolsas del pedido' });
    }
};

const obtenerRestantes = async (req, res) => {
    try {
        const { numero_pedido, modelo, codigo, talla_id } = req.query;

        const bolsaExistente = await prisma.bolsas.findFirst({
            where: {
                numero_pedido,
                modelo,
                codigo,
                talla_id: Number(talla_id)
            },
            orderBy: { folio: 'desc' }
        });

        if (!bolsaExistente) {
            return res.json({ ok: true, primera: true, total: null, asignadas: 0, restantes: null });
        }

        const agregado = await prisma.bolsas.aggregate({
            where: {
                numero_pedido,
                modelo,
                codigo,
                talla_id: Number(talla_id)
            },
            _sum: { piezas: true }
        });

        const asignadas = agregado._sum.piezas || 0;
        const restantes = bolsaExistente.total - asignadas;

        res.json({
            ok: true,
            primera: false,
            total: bolsaExistente.total,  // campo correcto
            asignadas,
            restantes
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, mensaje: 'Error al calcular restantes' });
    }
};

module.exports = {
    crearBolsa,
    obtenerBolsas,
    actualizarStatus,
    obtenerBolsasPorPedido,
    obtenerRestantes
};