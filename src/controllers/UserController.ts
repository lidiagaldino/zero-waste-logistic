import IAuth from "../interfaces/Auth";
import { Request, Response } from "express";
import FindByEmail from "../services/FindByEmail";
import bcrypt from "bcryptjs";
import { IPayload } from "../interfaces/Jwt";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";

class UserController {
  public async auth(req: Request<{}, {}, IAuth>, res: Response) {
    const { email, senha } = req.body;

    const user = await FindByEmail.findByEmail(email);

    if (!user || !user.senha)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Não autorizado" });

    const isPassValid = bcrypt.compare(senha, user.senha);

    if (!isPassValid) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: "Não autorizado" });
    }

    const jwtSettings: IPayload = {
      id: user.id,
      user_type: user.catador.length > 0 ? "CATADOR" : "GERADOR",
      id_usuario: user.id,
      id_modo:
        user.catador.length > 0 ? user.catador[0].id : user.gerador[0].id,
    };

    const token = jwt.sign(jwtSettings, "secret", { expiresIn: "1d" });

    delete user.senha;

    res.status(StatusCodes.OK).json({ user, token });
  }
}

export default new UserController();
