/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Catador` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Endereco` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `EnderecoUsuario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `FavoritarCatador` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Gerador` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `MateriaisCatador` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `MateriaisPedido` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Pedido` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `PessoaJuridica` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `tbl_pessoa_fisica` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `tbl_usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Catador_id_key` ON `Catador`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Endereco_id_key` ON `Endereco`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `EnderecoUsuario_id_key` ON `EnderecoUsuario`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `FavoritarCatador_id_key` ON `FavoritarCatador`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Gerador_id_key` ON `Gerador`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `MateriaisCatador_id_key` ON `MateriaisCatador`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `MateriaisPedido_id_key` ON `MateriaisPedido`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Pedido_id_key` ON `Pedido`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `PessoaJuridica_id_key` ON `PessoaJuridica`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `tbl_pessoa_fisica_id_key` ON `tbl_pessoa_fisica`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `tbl_usuario_id_key` ON `tbl_usuario`(`id`);
