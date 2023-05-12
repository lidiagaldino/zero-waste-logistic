import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import FindOrder from "../services/FindOrder";
import Endereco from "../services/Endereco";

export const isLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const exists = await FindOrder.findOrder(Number(req.params.id));

  if (exists) {
    const verify = await Endereco.verifyEndereco(
      Number(req.params.id),
      req.body.latitude,
      req.body.longitude
    );

    console.log(verify);

    if (!verify) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Você não está no local da coleta" });
    }

    return next();
  }

  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: "Você não está no local da coleta" });
};
