import prisma from "../lib/db";

class Endereco {
  public async getEndereco(id: number) {
    const rs = await prisma.endereco.findUnique({
      where: {
        id,
      },
    });

    return rs;
  }

  public async verifyEndereco(id: number, lat: number, lgt: number) {
    const sql = `SELECT tbl_pedido.id, ST_DISTANCE_SPHERE(POINT(${lgt}, ${lat}), POINT(longitude, latitude)) AS distance
    FROM tbl_pedido
    INNER JOIN tbl_endereco
    ON tbl_endereco.id = tbl_pedido.id_endereco
    WHERE ST_DISTANCE_SPHERE(POINT(${lgt}, ${lat}), POINT(longitude, latitude)) <= 2000 AND tbl_pedido.id = ${id}
    ORDER BY distance
LIMIT 10;`;

    console.log(sql);

    const result: { id: number; distance: number }[] =
      await prisma.$queryRawUnsafe(sql);

    console.log(result);

    return result.length > 0 ? result : false;
  }
}

export default new Endereco();
