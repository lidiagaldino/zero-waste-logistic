/*
  Warnings:

  - You are about to drop the `statuscatador` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tbl_catador` DROP FOREIGN KEY `tbl_catador_id_status_catador_fkey`;

-- DropTable
DROP TABLE `statuscatador`;

-- CreateTable
CREATE TABLE `tbl_status_catador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tbl_status_catador_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_catador` ADD CONSTRAINT `tbl_catador_id_status_catador_fkey` FOREIGN KEY (`id_status_catador`) REFERENCES `tbl_status_catador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
