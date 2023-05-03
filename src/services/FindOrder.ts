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

  public async findOrderByGerador(id_gerador: number) {
    const rs = await prisma.pedido.findMany({
      where: {
        id_gerador,
        id_status: {
          not: 3,
        },
      },
    });

    return rs.length > 0 ? rs : false;
  }

  public async findCatadorOrder(id_catador: number, id: number) {
    const rs = await prisma.pedido.findMany({
      where: {
        id,
        id_catador,
      },
    });

    return rs.length > 0 ? rs : false;
  }
}

export default new FindOrder();
