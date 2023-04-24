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
}

export default new FindOrder();
