import ICatador from "./Catador";
import IGerador from "./Gerador";

export default interface IUser {
  id: string;
  email: string;
  senha?: string;
  telefone: string;
  foto: string;
  biografia: string | null;
  catador: ICatador[] | [];
  gerador: IGerador[] | [];
}
