import IOrder from "../interfaces/Order";
import prisma from "../lib/db";

class FinishOrder {
  public async finishOrder(id: number) {
    try {
      const orderFinished = await prisma.pedido.update({
        where: {
          id,
        },
        data: {
          finished_at: new Date(),
          id_status: 3,
        },
      });

      return orderFinished ? orderFinished : false;
    } catch (error) {
      return false;
    }
  }
}

export default new FinishOrder();
