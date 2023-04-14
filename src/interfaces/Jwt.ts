import { JwtPayload } from "jsonwebtoken";

export interface IPayload extends JwtPayload {
    id_usuario: string,
    id_modo: string,
    user_type: 'CATADOR' | 'GERADOR'
}
