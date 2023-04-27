import IQueue from "../interfaces/Queue";
import prisma from "../lib/db";

class Queue {
  public async storeQueue(queue: Omit<IQueue, "id">[], id_pedido: number) {
    try {
      const data = queue.map((item) => {
        console.log(item);
        return {
          id_catador: item.id_catador,
          id_pedido,
          distancia: Math.ceil(item.distancia),
        };
      });

      const queueRs = await prisma.filaPedidoCatador.createMany({
        data,
      });

      console.log(`${queueRs} oioioi`);

      return queueRs ? data : false;
    } catch (error) {
      return false;
    }
  }

  public async getQueue(id_pedido: number) {
    const rs = await prisma.filaPedidoCatador.findFirst({
      where: {
        id_pedido,
      },
    });

    return rs ? rs : false;
  }

  public async deleteFromQueueById(id_catador: number, id_pedido: number) {
    try {
      const result = await prisma.filaPedidoCatador.deleteMany({
        where: {
          id_catador,
          id_pedido,
        },
      });

      return result ? result : false;
    } catch (error) {
      return false;
    }
  }

  public async deleteQueue(id: number) {
    try {
      const result = await prisma.filaPedidoCatador.delete({
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

export default new Queue();
