import prisma from "../lib/db";

class FindNearestCollector {
  public async findNearestCollector(id: number) {
    const getLatLong = await prisma.endereco.findUnique({
      where: {
        id,
      },
    });

    if (!getLatLong) return false;

    const sql = `
    SELECT tbl_catador.id as id_catador, ST_DISTANCE_SPHERE(POINT(${getLatLong.latitude}, ${getLatLong.longitude}), POINT(latitude, longitude)) AS distance
    FROM tbl_endereco
    INNER JOIN tbl_endereco_usuario
        ON tbl_endereco_usuario.id_endereco = tbl_endereco.id
    INNER JOIN tbl_usuario
        ON tbl_usuario.id = tbl_endereco_usuario.id_usuario
    LEFT JOIN tbl_pessoa_fisica
        ON tbl_pessoa_fisica.id_usuario = tbl_usuario.id
    LEFT JOIN tbl_pessoa_juridica
        ON tbl_pessoa_juridica.id_usuario = tbl_usuario.id
    INNER JOIN tbl_catador
        ON tbl_catador.id_usuario = tbl_usuario.id
    INNER JOIN tbl_materiais_catador
        ON tbl_catador.id = tbl_materiais_catador.id_catador
    INNER JOIN tbl_materiais
        ON tbl_materiais.id = tbl_materiais_catador.id_materiais
    WHERE ST_DISTANCE_SPHERE(POINT(${getLatLong.latitude}, ${getLatLong.longitude}), POINT(latitude, longitude)) <= 10000 AND id_materiais in (1,2) GROUP BY id_catador, longitude, latitude HAVING count(id_catador) >= (SELECT count(*) AS id FROM tbl_materiais WHERE id IN(1,2))
    ORDER BY distance
    LIMIT 10;`;

    const queue = await prisma.$queryRawUnsafe(sql);

    return queue;
  }
}

export default new FindNearestCollector();
