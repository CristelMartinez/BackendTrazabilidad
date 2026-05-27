-- CreateTable
CREATE TABLE "Tallas" (
    "id" SERIAL NOT NULL,
    "talla" VARCHAR(20) NOT NULL,
    "codigo" VARCHAR(20),

    CONSTRAINT "Tallas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Colores" (
    "id" SERIAL NOT NULL,
    "modelo" VARCHAR(50),
    "codigo" VARCHAR(50),
    "color" VARCHAR(50) NOT NULL,

    CONSTRAINT "Colores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "status" VARCHAR(50) NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuarios" (
    "id" SERIAL NOT NULL,
    "usuario" VARCHAR(50) NOT NULL,
    "contrasena" VARCHAR(255) NOT NULL,
    "tipo" VARCHAR(20) NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bolsas" (
    "id" SERIAL NOT NULL,
    "folio" SERIAL NOT NULL,
    "numero_pedido" VARCHAR(50) NOT NULL,
    "modelo" VARCHAR(50) NOT NULL,
    "codigo" VARCHAR(50) NOT NULL,
    "talla_id" INTEGER NOT NULL,
    "color_id" INTEGER NOT NULL,
    "piezas" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bolsas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tallas_talla_key" ON "Tallas"("talla");

-- CreateIndex
CREATE UNIQUE INDEX "Status_status_key" ON "Status"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_usuario_key" ON "Usuarios"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Bolsas_folio_key" ON "Bolsas"("folio");

-- AddForeignKey
ALTER TABLE "Bolsas" ADD CONSTRAINT "Bolsas_talla_id_fkey" FOREIGN KEY ("talla_id") REFERENCES "Tallas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bolsas" ADD CONSTRAINT "Bolsas_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "Colores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bolsas" ADD CONSTRAINT "Bolsas_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
