/*
  Warnings:

  - Added the required column `pontos` to the `tbl_usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tbl_usuario` ADD COLUMN `pontos` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `tbl_cupom` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `criterios` VARCHAR(191) NOT NULL,
    `pontos` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_cupom_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_cupom_usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cupom` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_cupom_usuario_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_cupom_usuario` ADD CONSTRAINT `tbl_cupom_usuario_id_cupom_fkey` FOREIGN KEY (`id_cupom`) REFERENCES `tbl_cupom`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_cupom_usuario` ADD CONSTRAINT `tbl_cupom_usuario_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
