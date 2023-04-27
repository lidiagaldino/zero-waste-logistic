import IOrder from "../interfaces/Order";
import prisma from "../lib/db";

class CreateOrder {
  public async createOrder(order: Omit<IOrder, "id">) {
    try {
      const newOrder = await prisma.pedido.create({
        data: {
          id_status: 2,
          id_gerador: order.id_gerador,
          id_endereco: order.id_endereco,
        },
      });

      let data: { id_material: number; id_pedido: number }[] = [];

      order.id_materiais.forEach((item) =>
        data.push({ id_material: item, id_pedido: newOrder.id })
      );

      await prisma.materiaisPedido.createMany({
        data,
      });

      console.log(newOrder);

      return newOrder;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async deleteOrder(id: number) {
    try {
      const result = await prisma.pedido.delete({
        where: {
          id,
        },
      });

      return result;
    } catch (error) {
      return false;
    }
  }
}

export default new CreateOrder();
