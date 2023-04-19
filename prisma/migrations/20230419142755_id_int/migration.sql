/*
  Warnings:

  - The primary key for the `catador` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `catador` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_usuario` on the `catador` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `endereco` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `endereco` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `enderecousuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `enderecousuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_endereco` on the `enderecousuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_usuario` on the `enderecousuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `favoritarcatador` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `favoritarcatador` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_catador` on the `favoritarcatador` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_gerador` on the `favoritarcatador` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `gerador` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `gerador` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_usuario` on the `gerador` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `materiais` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `materiais` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `materiaiscatador` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `materiaiscatador` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_materiais` on the `materiaiscatador` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_catador` on the `materiaiscatador` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `materiaispedido` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `materiaispedido` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_material` on the `materiaispedido` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_pedido` on the `materiaispedido` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `pedido` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `pedido` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_catador` on the `pedido` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_gerador` on the `pedido` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_endereco` on the `pedido` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `pessoajuridica` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `pessoajuridica` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_usuario` on the `pessoajuridica` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `tbl_pessoa_fisica` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `tbl_pessoa_fisica` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_usuario` on the `tbl_pessoa_fisica` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `tbl_usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `tbl_usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

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

-- DropForeignKey
ALTER TABLE `tbl_pessoa_fisica` DROP FOREIGN KEY `tbl_pessoa_fisica_id_usuario_fkey`;

-- AlterTable
ALTER TABLE `catador` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_usuario` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `endereco` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `enderecousuario` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_endereco` INTEGER NOT NULL,
    MODIFY `id_usuario` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `favoritarcatador` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_catador` INTEGER NOT NULL,
    MODIFY `id_gerador` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `gerador` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_usuario` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `materiais` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `materiaiscatador` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_materiais` INTEGER NOT NULL,
    MODIFY `id_catador` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `materiaispedido` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_material` INTEGER NOT NULL,
    MODIFY `id_pedido` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `pedido` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_catador` INTEGER NULL,
    MODIFY `id_gerador` INTEGER NOT NULL,
    MODIFY `id_endereco` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `pessoajuridica` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_usuario` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `tbl_pessoa_fisica` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_usuario` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `tbl_usuario` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `tbl_pessoa_fisica` ADD CONSTRAINT `tbl_pessoa_fisica_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PessoaJuridica` ADD CONSTRAINT `PessoaJuridica_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Catador` ADD CONSTRAINT `Catador_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MateriaisCatador` ADD CONSTRAINT `MateriaisCatador_id_materiais_fkey` FOREIGN KEY (`id_materiais`) REFERENCES `Materiais`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MateriaisCatador` ADD CONSTRAINT `MateriaisCatador_id_catador_fkey` FOREIGN KEY (`id_catador`) REFERENCES `Catador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnderecoUsuario` ADD CONSTRAINT `EnderecoUsuario_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `Endereco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnderecoUsuario` ADD CONSTRAINT `EnderecoUsuario_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Gerador` ADD CONSTRAINT `Gerador_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoritarCatador` ADD CONSTRAINT `FavoritarCatador_id_catador_fkey` FOREIGN KEY (`id_catador`) REFERENCES `Catador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoritarCatador` ADD CONSTRAINT `FavoritarCatador_id_gerador_fkey` FOREIGN KEY (`id_gerador`) REFERENCES `Gerador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MateriaisPedido` ADD CONSTRAINT `MateriaisPedido_id_material_fkey` FOREIGN KEY (`id_material`) REFERENCES `Materiais`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MateriaisPedido` ADD CONSTRAINT `MateriaisPedido_id_pedido_fkey` FOREIGN KEY (`id_pedido`) REFERENCES `Pedido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_id_catador_fkey` FOREIGN KEY (`id_catador`) REFERENCES `Catador`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_id_gerador_fkey` FOREIGN KEY (`id_gerador`) REFERENCES `Gerador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `Endereco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
