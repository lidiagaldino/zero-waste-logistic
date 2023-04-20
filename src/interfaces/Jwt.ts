import { JwtPayload } from "jsonwebtoken";

export interface IPayload extends JwtPayload {
  id_usuario: number;
  id_modo: number;
  user_type: "CATADOR" | "GERADOR";
}
