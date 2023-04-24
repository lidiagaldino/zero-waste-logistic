import prisma from "../lib/db";

class FindCollector {
  public async findCollector(id: number): Promise<any> {
    const rs = await prisma.catador.findUnique({
      where: {
        id,
      },
    });

    return rs ? rs : false;
  }
}

export default new FindCollector();
