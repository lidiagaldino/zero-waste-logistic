export default interface IOrder {
  id: number;
  id_materiais: [number];
  id_gerador: number;
  id_catador?: number;
  id_endereco: number;
  created_at?: Date;
  finished_at?: Date;
  status?: string;
}
