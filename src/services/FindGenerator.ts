import prisma from "../lib/db";

class FindGenerator {
  public async findGenerator(id: number) {
    const gerador = await prisma.gerador.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    return gerador;
  }
}

export default new FindGenerator();
