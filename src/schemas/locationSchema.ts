import * as yup from "yup";
import ILocation from "../interfaces/Location";

interface IBodyProps extends ILocation {}

export const locationBodyValidation: yup.SchemaOf<IBodyProps> = yup
  .object()
  .shape({
    latitude: yup.number().required(),
    longitude: yup.number().required(),
  });
