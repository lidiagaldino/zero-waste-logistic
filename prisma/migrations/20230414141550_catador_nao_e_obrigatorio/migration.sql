-- DropForeignKey
ALTER TABLE `pedido` DROP FOREIGN KEY `Pedido_id_catador_fkey`;

-- AlterTable
ALTER TABLE `pedido` MODIFY `id_catador` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_id_catador_fkey` FOREIGN KEY (`id_catador`) REFERENCES `Catador`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
