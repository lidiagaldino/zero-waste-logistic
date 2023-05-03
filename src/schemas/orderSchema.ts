import * as yup from "yup";
import IOrder from "../interfaces/Order";

interface IBodyProps extends Omit<IOrder, "id"> {}

export const orderBodyValidation: yup.SchemaOf<IBodyProps> = yup
  .object()
  .shape({
    status: yup.string().notRequired(),
    id_endereco: yup.number().integer().required(),
    id_gerador: yup.number().integer().required(),
    id_materiais: yup.array().of(yup.number().integer().required()),
    id_catador: yup.number().integer().notRequired(),
    created_at: yup.date().notRequired(),
    finished_at: yup.date().notRequired(),
  });
