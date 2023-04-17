import IOrder from "../interfaces/Order";
import prisma from "../lib/db";

class CreateOrder {
  public async createOrder(order: Omit<IOrder, "id">) {
    try {
      const newOrder = await prisma.pedido.create({
        data: {
          status: "pendente",
          id_gerador: order.id_gerador,
          id_endereco: order.id_endereco,
        },
      });

      let data: { id_material: string; id_pedido: string }[] = [];

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
}

export default new CreateOrder();
