import prisma from "../lib/db";

class FindOrder {
  public async findOrder(id: number) {
    const rs = await prisma.pedido.findUnique({
      where: {
        id,
      },
    });

    return rs ? rs : false;
  }

  public async findOrderByGerador(id_gerador) {
    const rs = await prisma.pedido.findMany({
      where: {
        id_gerador
      }
    })
  }
}

export default new FindOrder();
