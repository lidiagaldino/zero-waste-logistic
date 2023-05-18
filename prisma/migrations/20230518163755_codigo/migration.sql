/*
  Warnings:

  - Added the required column `codigo` to the `tbl_cupom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tbl_cupom` ADD COLUMN `codigo` VARCHAR(191) NOT NULL;
