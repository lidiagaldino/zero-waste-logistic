import * as yup from "yup";
import IRating from "../interfaces/Rating";

interface IBodyProps extends Omit<IRating, "id"> {}

export const ratingBodyValidation: yup.SchemaOf<IBodyProps> = yup
  .object()
  .shape({
    id_catador: yup.number().integer().positive().required(),
    id_gerador: yup.number().integer().positive().notRequired(),
    nota: yup.number().integer().positive().max(5).required(),
  });
