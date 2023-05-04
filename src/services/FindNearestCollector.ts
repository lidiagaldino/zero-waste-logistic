import prisma from "../lib/db";

class FindNearestCollector {
  public async findNearestCollector(id: number, materiais: number[]) {
    const getLatLong = await prisma.endereco.findUnique({
      where: {
        id,
      },
    });

    if (!getLatLong) return false;

    const sql = `
    SELECT tbl_materiais_catador.id_catador as id_catador,
    ST_DISTANCE_SPHERE(POINT(${getLatLong.latitude}, ${
      getLatLong.longitude
    }), POINT(latitude, longitude)) AS distancia,
    COUNT(DISTINCT id_materiais) AS qtd_materiais
    FROM tbl_materiais_catador
      INNER JOIN tbl_materiais ON tbl_materiais.id = tbl_materiais_catador.id_materiais
      INNER JOIN tbl_catador ON tbl_catador.id = tbl_materiais_catador.id_catador
      INNER JOIN tbl_status_catador ON tbl_catador.id_status_catador = tbl_status_catador.id
      INNER JOIN tbl_usuario ON tbl_usuario.id = tbl_catador.id_usuario
      LEFT JOIN tbl_pessoa_fisica ON tbl_pessoa_fisica.id_usuario = tbl_usuario.id
      LEFT JOIN tbl_pessoa_juridica ON tbl_pessoa_juridica.id_usuario = tbl_usuario.id
      INNER JOIN tbl_endereco_usuario ON tbl_usuario.id = tbl_endereco_usuario.id_usuario
      INNER JOIN tbl_endereco ON tbl_endereco.id = tbl_endereco_usuario.id_endereco
    WHERE ST_DISTANCE_SPHERE(POINT(${getLatLong.latitude}, ${
      getLatLong.longitude
    }), POINT(latitude, longitude)) <= 10000
      AND id_status_catador = 1
      AND id_materiais in (${materiais.toString()})
    GROUP BY id_catador, longitude, latitude
      HAVING qtd_materiais = ${materiais.length}
    ORDER BY distancia LIMIT 10;`;

    const queue: [] = await prisma.$queryRawUnsafe(sql);

    console.log(queue);

    return queue.length > 0 ? queue : false;
  }

  public async getDistance(id_catador: number) {
    try {
      const sql = `
        SELECT tbl_materiais_catador.id_catador as id_catador 
      `;
    } catch (error) {
      return false;
    }
  }
}

export default new FindNearestCollector();
