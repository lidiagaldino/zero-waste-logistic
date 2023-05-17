import IRating from "../interfaces/Rating";
import prisma from "../lib/db";

class Rating {
  public async rating(rating: Omit<IRating, "id">, id_gerador: number) {
    try {
      const rs = await prisma.avaliacao.create({
        data: {
          nota: rating.nota,
          id_catador: rating.id_catador,
          id_gerador,
        },
      });

      return rs;
    } catch (error) {
      return false;
    }
  }

  public async average(id_catador: number) {
    const sql = `SELECT AVG(nota) as media FROM tbl_avaliacao where id_catador = ${id_catador}`;

    const rs: { media: number }[] = await prisma.$queryRawUnsafe(sql);

    return rs.length > 0 ? rs : false;
  }

  public async update(rating: Omit<IRating, "id">, id_gerador: number) {
    try {
      const rs = await prisma.avaliacao.updateMany({
        where: {
          id_gerador,
          id_catador: rating.id_catador,
        },
        data: {
          nota: rating.nota,
        },
      });

      if (rs.count > 0) {
        const avaliacao = await this.findRatingByGerador(
          id_gerador,
          rating.id_catador
        );

        console.log(avaliacao);

        return avaliacao ? avaliacao : false;
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  public async findRatingByGerador(id_gerador: number, id_catador: number) {
    const rs = await prisma.avaliacao.findMany({
      where: {
        id_gerador,
        id_catador,
      },
    });

    return rs.length > 0 ? rs : false;
  }
}

export default new Rating();
