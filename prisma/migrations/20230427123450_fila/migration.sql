/*
  Warnings:

  - You are about to drop the column `status` on the `tbl_pedido` table. All the data in the column will be lost.
  - Added the required column `id_status` to the `tbl_pedido` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tbl_catador` DROP FOREIGN KEY `tbl_catador_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_endereco_usuario` DROP FOREIGN KEY `tbl_endereco_usuario_id_endereco_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_endereco_usuario` DROP FOREIGN KEY `tbl_endereco_usuario_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_favoritar_catador` DROP FOREIGN KEY `tbl_favoritar_catador_id_catador_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_favoritar_catador` DROP FOREIGN KEY `tbl_favoritar_catador_id_gerador_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_gerador` DROP FOREIGN KEY `tbl_gerador_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_materiais_catador` DROP FOREIGN KEY `tbl_materiais_catador_id_catador_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_materiais_catador` DROP FOREIGN KEY `tbl_materiais_catador_id_materiais_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_materiais_pedido` DROP FOREIGN KEY `tbl_materiais_pedido_id_material_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_materiais_pedido` DROP FOREIGN KEY `tbl_materiais_pedido_id_pedido_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_pedido` DROP FOREIGN KEY `tbl_pedido_id_endereco_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_pedido` DROP FOREIGN KEY `tbl_pedido_id_gerador_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_pessoa_fisica` DROP FOREIGN KEY `tbl_pessoa_fisica_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_pessoa_juridica` DROP FOREIGN KEY `tbl_pessoa_juridica_id_usuario_fkey`;

-- AlterTable
ALTER TABLE `tbl_pedido` DROP COLUMN `status`,
    ADD COLUMN `geradorId` INTEGER NULL,
    ADD COLUMN `id_status` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `tbl_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tbl_status_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FilaPedidoCatador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `distancia` INTEGER NOT NULL,
    `pedidoId` INTEGER NOT NULL,
    `catadorId` INTEGER NOT NULL,

    UNIQUE INDEX `FilaPedidoCatador_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `tbl_pedido_geradorId_fkey` ON `tbl_pedido`(`geradorId`);

-- AddForeignKey
ALTER TABLE `tbl_pessoa_fisica` ADD CONSTRAINT `tbl_pessoa_fisica_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_pessoa_juridica` ADD CONSTRAINT `tbl_pessoa_juridica_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_catador` ADD CONSTRAINT `tbl_catador_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_materiais_catador` ADD CONSTRAINT `tbl_materiais_catador_id_catador_fkey` FOREIGN KEY (`id_catador`) REFERENCES `tbl_catador`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_materiais_catador` ADD CONSTRAINT `tbl_materiais_catador_id_materiais_fkey` FOREIGN KEY (`id_materiais`) REFERENCES `tbl_materiais`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_endereco_usuario` ADD CONSTRAINT `tbl_endereco_usuario_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `tbl_endereco`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_endereco_usuario` ADD CONSTRAINT `tbl_endereco_usuario_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_gerador` ADD CONSTRAINT `tbl_gerador_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_favoritar_catador` ADD CONSTRAINT `tbl_favoritar_catador_id_catador_fkey` FOREIGN KEY (`id_catador`) REFERENCES `tbl_catador`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_favoritar_catador` ADD CONSTRAINT `tbl_favoritar_catador_id_gerador_fkey` FOREIGN KEY (`id_gerador`) REFERENCES `tbl_gerador`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_materiais_pedido` ADD CONSTRAINT `tbl_materiais_pedido_id_material_fkey` FOREIGN KEY (`id_material`) REFERENCES `tbl_materiais`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_materiais_pedido` ADD CONSTRAINT `tbl_materiais_pedido_id_pedido_fkey` FOREIGN KEY (`id_pedido`) REFERENCES `tbl_pedido`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_pedido` ADD CONSTRAINT `tbl_pedido_geradorId_fkey` FOREIGN KEY (`geradorId`) REFERENCES `tbl_gerador`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_pedido` ADD CONSTRAINT `tbl_pedido_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `tbl_endereco`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_pedido` ADD CONSTRAINT `tbl_pedido_id_status_fkey` FOREIGN KEY (`id_status`) REFERENCES `tbl_status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FilaPedidoCatador` ADD CONSTRAINT `FilaPedidoCatador_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `tbl_pedido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FilaPedidoCatador` ADD CONSTRAINT `FilaPedidoCatador_catadorId_fkey` FOREIGN KEY (`catadorId`) REFERENCES `tbl_catador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
