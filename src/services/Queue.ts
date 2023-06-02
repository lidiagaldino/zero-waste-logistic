import { FilaPedidoCatador, Pedido } from "@prisma/client";
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
      orderBy: {
        distancia: "asc",
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
      console.log("teste");

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

  public async findCollectorQueue(id_catador: number) {
    const rs = await prisma.filaPedidoCatador.findFirst({
      where: {
        id_catador,
        catador: {
          id_status_catador: 3,
        },
      },
      select: {
        pedido: {
          include: {
            endereco: true,
            FilaPedidoCatador: {
              select: {
                distancia: true,
              },
            },
            tbl_gerador: {
              select: {
                user: {
                  select: {
                    pessoa_fisica: true,
                    pessoa_juridica: true,
                  },
                },
              },
            },
            MateriaisPedido: {
              select: {
                material: {
                  select: {
                    nome: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    console.log(rs);

    return rs ? rs : false;
  }
}

export default new Queue();
