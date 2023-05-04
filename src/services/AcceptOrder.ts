import IOrderData from "../interfaces/OrderData";
import prisma from "../lib/db";

class AcceptOrder {
  public async acceptOrder(id: number, id_catador: number) {
    try {
      const pedido = await prisma.pedido.update({
        where: {
          id,
        },
        data: {
          id_catador,
          id_status: 2,
        },
        include: {
          endereco: true,
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
      });

      const retorno: IOrderData = {
        id_status: pedido.id_status,
        id_gerador: pedido.id_gerador,
        endereco: pedido.endereco,
        id_material: pedido.MateriaisPedido,
        created_at: pedido.created_at,
        finished_at: pedido.finished_at,
        id_catador: pedido.id_catador,
        id: pedido.id,
      };

      return retorno;
    } catch (error) {
      return false;
    }
  }
}

export default new AcceptOrder();
