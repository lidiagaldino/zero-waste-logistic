/*
  Warnings:

  - You are about to drop the `catador` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `endereco` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `enderecousuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `favoritarcatador` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gerador` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `materiais` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `materiaiscatador` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `materiaispedido` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pedido` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pessoajuridica` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `catador` DROP FOREIGN KEY `Catador_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `enderecousuario` DROP FOREIGN KEY `EnderecoUsuario_id_endereco_fkey`;

-- DropForeignKey
ALTER TABLE `enderecousuario` DROP FOREIGN KEY `EnderecoUsuario_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `favoritarcatador` DROP FOREIGN KEY `FavoritarCatador_id_catador_fkey`;

-- DropForeignKey
ALTER TABLE `favoritarcatador` DROP FOREIGN KEY `FavoritarCatador_id_gerador_fkey`;

-- DropForeignKey
ALTER TABLE `gerador` DROP FOREIGN KEY `Gerador_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `materiaiscatador` DROP FOREIGN KEY `MateriaisCatador_id_catador_fkey`;

-- DropForeignKey
ALTER TABLE `materiaiscatador` DROP FOREIGN KEY `MateriaisCatador_id_materiais_fkey`;

-- DropForeignKey
ALTER TABLE `materiaispedido` DROP FOREIGN KEY `MateriaisPedido_id_material_fkey`;

-- DropForeignKey
ALTER TABLE `materiaispedido` DROP FOREIGN KEY `MateriaisPedido_id_pedido_fkey`;

-- DropForeignKey
ALTER TABLE `pedido` DROP FOREIGN KEY `Pedido_id_catador_fkey`;

-- DropForeignKey
ALTER TABLE `pedido` DROP FOREIGN KEY `Pedido_id_endereco_fkey`;

-- DropForeignKey
ALTER TABLE `pedido` DROP FOREIGN KEY `Pedido_id_gerador_fkey`;

-- DropForeignKey
ALTER TABLE `pessoajuridica` DROP FOREIGN KEY `PessoaJuridica_id_usuario_fkey`;

-- DropTable
DROP TABLE `catador`;

-- DropTable
DROP TABLE `endereco`;

-- DropTable
DROP TABLE `enderecousuario`;

-- DropTable
DROP TABLE `favoritarcatador`;

-- DropTable
DROP TABLE `gerador`;

-- DropTable
DROP TABLE `materiais`;

-- DropTable
DROP TABLE `materiaiscatador`;

-- DropTable
DROP TABLE `materiaispedido`;

-- DropTable
DROP TABLE `pedido`;

-- DropTable
DROP TABLE `pessoajuridica`;

-- CreateTable
CREATE TABLE `tbl_pessoa_juridica` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cnpj` VARCHAR(191) NOT NULL,
    `nome_fantasia` VARCHAR(191) NOT NULL,
    `id_usuario` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_pessoa_juridica_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_catador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(191) NULL,
    `id_usuario` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_catador_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_materiais` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_materiais_catador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_materiais` INTEGER NOT NULL,
    `id_catador` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_materiais_catador_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_endereco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `logradouro` VARCHAR(191) NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `complemento` VARCHAR(191) NULL,
    `latitude` VARCHAR(191) NOT NULL,
    `longitude` VARCHAR(191) NOT NULL,
    `apelido` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tbl_endereco_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_endereco_usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_endereco` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_endereco_usuario_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_gerador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_gerador_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_favoritar_catador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_catador` INTEGER NOT NULL,
    `id_gerador` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_favoritar_catador_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_materiais_pedido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_material` INTEGER NOT NULL,
    `id_pedido` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_materiais_pedido_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_pedido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL,
    `finished_at` DATETIME(3) NULL,
    `id_catador` INTEGER NULL,
    `id_gerador` INTEGER NOT NULL,
    `id_endereco` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_pedido_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_pessoa_juridica` ADD CONSTRAINT `tbl_pessoa_juridica_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_catador` ADD CONSTRAINT `tbl_catador_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_materiais_catador` ADD CONSTRAINT `tbl_materiais_catador_id_materiais_fkey` FOREIGN KEY (`id_materiais`) REFERENCES `tbl_materiais`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_materiais_catador` ADD CONSTRAINT `tbl_materiais_catador_id_catador_fkey` FOREIGN KEY (`id_catador`) REFERENCES `tbl_catador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_endereco_usuario` ADD CONSTRAINT `tbl_endereco_usuario_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `tbl_endereco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_endereco_usuario` ADD CONSTRAINT `tbl_endereco_usuario_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_gerador` ADD CONSTRAINT `tbl_gerador_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_favoritar_catador` ADD CONSTRAINT `tbl_favoritar_catador_id_catador_fkey` FOREIGN KEY (`id_catador`) REFERENCES `tbl_catador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_favoritar_catador` ADD CONSTRAINT `tbl_favoritar_catador_id_gerador_fkey` FOREIGN KEY (`id_gerador`) REFERENCES `tbl_gerador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_materiais_pedido` ADD CONSTRAINT `tbl_materiais_pedido_id_material_fkey` FOREIGN KEY (`id_material`) REFERENCES `tbl_materiais`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_materiais_pedido` ADD CONSTRAINT `tbl_materiais_pedido_id_pedido_fkey` FOREIGN KEY (`id_pedido`) REFERENCES `tbl_pedido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_pedido` ADD CONSTRAINT `tbl_pedido_id_catador_fkey` FOREIGN KEY (`id_catador`) REFERENCES `tbl_catador`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_pedido` ADD CONSTRAINT `tbl_pedido_id_gerador_fkey` FOREIGN KEY (`id_gerador`) REFERENCES `tbl_gerador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_pedido` ADD CONSTRAINT `tbl_pedido_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `tbl_endereco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
