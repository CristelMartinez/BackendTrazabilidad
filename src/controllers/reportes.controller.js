const path = require('path');

const ExcelJS = require('exceljs');

const prisma = require('../config/prisma');

const imprimirBolsa = async (req, res) => {

    try {

        const { folio } = req.params;

        const bolsa = await prisma.bolsas.findUnique({
            where: {
                folio: Number(folio)
            },
            include: {
                talla: true,
                color: true,
                status: true
            }
        });

        if (!bolsa) {

            return res.status(404).json({
                ok: false,
                mensaje: 'Bolsa no encontrada'
            });
        }

        const workbook = new ExcelJS.Workbook();

        const templatePath = path.join(
            __dirname,
            '../../templates/trazabilidad de prenda 1.xlsx'
        );

        await workbook.xlsx.readFile(templatePath);

        const worksheet = workbook.getWorksheet('Hoja1');

        // PEDIDO
        worksheet.getCell('C7').value = bolsa.numero_pedido;

        // MODELO
        worksheet.getCell('D7').value = bolsa.modelo;

        // TALLA
        worksheet.getCell('E7').value = bolsa.talla?.talla;

       // PIEZAS
        const piezasCell = worksheet.getCell('G7');

        piezasCell.value = Number(bolsa.piezas);

        piezasCell.numFmt = '0';

        piezasCell.style = {
            ...piezasCell.style,
            numFmt: '0'
        };

        worksheet.getColumn('G').width = 12;

        // COLOR
        worksheet.getCell('I7').value = bolsa.color?.color;

        // FECHA DE INICIO
        const hoy = new Date();

        worksheet.getCell('C10').value = hoy;

        worksheet.getCell('C10').numFmt = 'dd/mm/yyyy';

        // FOLIO
        worksheet.getCell('K5').value = `Folio: ${bolsa.folio}`;
        worksheet.getCell('K5').font = {
            name: 'Arial',
            size: 16,
            bold: true
        };

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );

        res.setHeader(
            'Content-Disposition',
            `attachment; filename=bolsa-${bolsa.folio}.xlsx`
        );

        await workbook.xlsx.write(res);

        res.end();

    } catch (error) {

        console.error(error);

        res.status(500).json({
            ok: false,
            mensaje: 'Error al generar plantilla'
        });
    }
};

module.exports = {
    imprimirBolsa
};