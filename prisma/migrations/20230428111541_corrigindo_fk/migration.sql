/*
  Warnings:

  - You are about to drop the column `geradorId` on the `tbl_pedido` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `tbl_pedido` DROP FOREIGN KEY `tbl_pedido_geradorId_fkey`;

-- AlterTable
ALTER TABLE `tbl_pedido` DROP COLUMN `geradorId`;

-- AddForeignKey
ALTER TABLE `tbl_pedido` ADD CONSTRAINT `tbl_pedido_id_gerador_fkey` FOREIGN KEY (`id_gerador`) REFERENCES `tbl_gerador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
