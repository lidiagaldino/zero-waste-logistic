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

      console.log(queueRs);

      return queueRs ? data : false;
    } catch (error) {
      return false;
    }
  }

  public async getQueue(id_pedido: number) {
    const rs = await prisma.filaPedidoCatador.findMany({
      where: {
        id_pedido,
      },
    });

    console.log(rs);

    return rs.length > 0 ? rs : false;
  }

  public async deleteFromQueueById(id_catador: number, id_pedido: number) {
    try {
      const result = await prisma.filaPedidoCatador.deleteMany({
        where: {
          id_catador,
          id_pedido,
        },
      });

      console.log(result);

      return result ? result : false;
    } catch (error) {
      return false;
    }
  }

  public async deleteQueue(id_pedido: number) {
    try {
      const result = await prisma.filaPedidoCatador.deleteMany({
        where: {
          id_pedido,
        },
      });

      return result;
    } catch (error) {
      return false;
    }
  }
}

export default new Queue();
