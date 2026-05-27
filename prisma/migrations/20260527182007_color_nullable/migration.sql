-- DropForeignKey
ALTER TABLE "Bolsas" DROP CONSTRAINT "Bolsas_color_id_fkey";

-- AlterTable
ALTER TABLE "Bolsas" ALTER COLUMN "color_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Bolsas" ADD CONSTRAINT "Bolsas_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "Colores"("id") ON DELETE SET NULL ON UPDATE CASCADE;
