/*
  Warnings:

  - You are about to drop the column `status` on the `tbl_catador` table. All the data in the column will be lost.
  - You are about to drop the `filapedidocatador` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_status_catador` to the `tbl_catador` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `filapedidocatador` DROP FOREIGN KEY `FilaPedidoCatador_catadorId_fkey`;

-- DropForeignKey
ALTER TABLE `filapedidocatador` DROP FOREIGN KEY `FilaPedidoCatador_pedidoId_fkey`;

-- AlterTable
ALTER TABLE `tbl_catador` DROP COLUMN `status`,
    ADD COLUMN `id_status_catador` INTEGER NOT NULL;

-- DropTable
DROP TABLE `filapedidocatador`;

-- CreateTable
CREATE TABLE `StatusCatador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `StatusCatador_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_fila_pedido_catador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `distancia` INTEGER NOT NULL,
    `id_pedido` INTEGER NOT NULL,
    `id_catador` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_fila_pedido_catador_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_catador` ADD CONSTRAINT `tbl_catador_id_status_catador_fkey` FOREIGN KEY (`id_status_catador`) REFERENCES `StatusCatador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_fila_pedido_catador` ADD CONSTRAINT `tbl_fila_pedido_catador_id_pedido_fkey` FOREIGN KEY (`id_pedido`) REFERENCES `tbl_pedido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_fila_pedido_catador` ADD CONSTRAINT `tbl_fila_pedido_catador_id_catador_fkey` FOREIGN KEY (`id_catador`) REFERENCES `tbl_catador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
