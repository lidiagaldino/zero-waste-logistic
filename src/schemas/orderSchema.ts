import * as yup from 'yup'
import IOrder from '../interfaces/Order';

interface IBodyProps extends Omit<IOrder, 'id'> { }

export const orderBodyValidation: yup.SchemaOf<IBodyProps> = yup.object().shape({
    status: yup.string().required(),
    id_endereco: yup.string().uuid().required(),
    id_gerador: yup.string().uuid().required(),
    id_materiais: yup.array().of(yup.string().uuid().required()),
    id_catador: yup.string().uuid().notRequired(),
    created_at: yup.date().notRequired(),
    finished_at: yup.date().notRequired()
})