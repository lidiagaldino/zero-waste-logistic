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
      });

      return pedido;
    } catch (error) {
      return false;
    }
  }
}

export default new AcceptOrder();
