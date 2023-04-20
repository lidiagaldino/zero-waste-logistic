import IOrder from "../interfaces/Order";
import prisma from "../lib/db";

class FinishOrder {
  public async finishOrder(order: IOrder) {
    try {
      const orderFinished = await prisma.pedido.update({
        where: {
          id: order.id,
        },
        data: {
          finished_at: new Date(),
        },
      });
    } catch (error) {
      return false;
    }
  }
}
