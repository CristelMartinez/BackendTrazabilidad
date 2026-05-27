const xlsx = require('xlsx');

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function importar() {

    const workbook = xlsx.readFile('/Users/cristel/Desktop/provisional/backend/Colores.xlsx');

    const sheet = workbook.Sheets['Hoja1'];

    const datos = xlsx.utils.sheet_to_json(sheet);

    for (const item of datos) {

        await prisma.colores.create({
            data: {
                modelo: String(item.modelo),
                codigo: String(item['codigo ']).trim(),
                color: String(item.color).trim()
            }
        });
    }

    console.log('Colores importados');

    await prisma.$disconnect();
}

importar();