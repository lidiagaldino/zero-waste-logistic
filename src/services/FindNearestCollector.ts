import prisma from "../lib/db";

class FindNearestCollector {
    public async findNearestCollector(id: string){
        const getLatLong = await prisma.endereco.findUnique({
            where: {
                id
            }
        })

        if (!getLatLong) return false

        const sql = `
        SELECT Catador.id as id_catador, tbl_usuario.id as id_usuario, logradouro, cidade, numero, tbl_usuario.foto, tbl_pessoa_fisica.nome, PessoaJuridica.nome_fantasia, ST_DISTANCE_SPHERE(POINT(${getLatLong.latitude}, ${getLatLong.longitude}), POINT(latitude, longitude)) AS distance
                FROM Endereco
                INNER JOIN EnderecoUsuario
                    ON EnderecoUsuario.id_endereco = Endereco.id
                INNER JOIN tbl_usuario
                    ON tbl_usuario.id = EnderecoUsuario.id_usuario
                LEFT JOIN tbl_pessoa_fisica
                    ON tbl_pessoa_fisica.id_usuario = tbl_usuario.id
                LEFT JOIN PessoaJuridica
                    ON PessoaJuridica.id_usuario = tbl_usuario.id
                INNER JOIN Catador
                    ON Catador.id_usuario = tbl_usuario.id
                WHERE ST_DISTANCE_SPHERE(POINT(${getLatLong.latitude}, ${getLatLong.longitude}), POINT(latitude, longitude)) <= 10000
                ORDER BY distance
            LIMIT 10;`

        const queue = await prisma.$queryRawUnsafe(sql)

        return queue
    }
}

export default new FindNearestCollector()