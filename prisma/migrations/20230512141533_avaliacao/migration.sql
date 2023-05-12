/*
  Warnings:

  - You are about to alter the column `latitude` on the `tbl_endereco` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `longitude` on the `tbl_endereco` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- AlterTable
ALTER TABLE `tbl_endereco` MODIFY `latitude` DOUBLE NOT NULL,
    MODIFY `longitude` DOUBLE NOT NULL;

-- CreateTable
CREATE TABLE `tbl_avaliacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nota` DOUBLE NOT NULL,
    `id_gerador` INTEGER NOT NULL,
    `id_catador` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_avaliacao_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_avaliacao` ADD CONSTRAINT `tbl_avaliacao_id_gerador_fkey` FOREIGN KEY (`id_gerador`) REFERENCES `tbl_gerador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_avaliacao` ADD CONSTRAINT `tbl_avaliacao_id_catador_fkey` FOREIGN KEY (`id_catador`) REFERENCES `tbl_catador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
