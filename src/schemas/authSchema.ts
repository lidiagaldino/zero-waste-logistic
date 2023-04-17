import * as yup from "yup";
import IAuth from "../interfaces/Auth";

interface IBodyProps extends Omit<IAuth, "id"> {}

export const authBodyValidation: yup.SchemaOf<IBodyProps> = yup.object().shape({
  email: yup.string().email().required(),
  senha: yup.string().min(5).required(),
});
