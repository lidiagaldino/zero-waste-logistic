export default interface IOrder{
    id: string,
    id_materiais: [string],
    id_gerador: string,
    id_catador?: string ,
    id_endereco: string,
    created_at?: Date,
    finished_at?: Date,
    status: string
}