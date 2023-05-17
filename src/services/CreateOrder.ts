import { Endereco } from "@prisma/client";
import IOrder from "../interfaces/Order";
import IOrderData from "../interfaces/OrderData";
import prisma from "../lib/db";

class CreateOrder {
  public async createOrder(
    order: Omit<IOrder, "id">
  ): Promise<IOrderData | false> {
    try {
      const newOrder = await prisma.pedido.create({
        data: {
          id_status: 1,
          id_gerador: order.id_gerador,
          id_endereco: order.id_endereco,
        },
      });

      let data: { id_material: number; id_pedido: number }[] = [];

      order.id_materiais.forEach((item) =>
        data.push({ id_material: item, id_pedido: newOrder.id })
      );

      const materiais = await prisma.materiaisPedido.createMany({
        data,
      });

      const endereco = await prisma.endereco.findUnique({
        where: {
          id: order.id_endereco,
        },
      });

      const getMateriais = await prisma.materiaisPedido.findMany({
        where: {
          id_pedido: newOrder.id,
        },
        select: {
          material: {
            select: {
              nome: true,
            },
          },
        },
      });

      const retorno: IOrderData = {
        id_status: newOrder.id_status,
        id_gerador: newOrder.id_gerador,
        endereco,
        id_material: getMateriais,
        created_at: newOrder.created_at,
        finished_at: newOrder.finished_at,
        id_catador: newOrder.id_catador,
        id: newOrder.id,
      };

      console.log(materiais);

      return retorno;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async deleteOrder(id: number) {
    try {
      const teste = await prisma.materiaisPedido.deleteMany({
        where: {
          id_pedido: id,
        },
      });

      console.log("object");

      console.log(teste);
      const result = await prisma.pedido.delete({
        where: {
          id,
        },
      });

      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default new CreateOrder();
