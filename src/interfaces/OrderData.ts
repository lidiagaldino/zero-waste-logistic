export default interface IOrderData {
  id: number;
  id_material: { material: { nome: string } }[];
  id_gerador: number;
  id_catador?: number;
  endereco: object;
  created_at: Date;
  finished_at?: Date;
  id_status: number;
  distancia?: number;
}
