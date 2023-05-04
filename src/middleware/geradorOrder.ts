import { NextFunction, Request, Response } from "express";
import FindOrder from "../services/FindOrder";
import { StatusCodes } from "http-status-codes";

export const geradorOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id_modo } = req.user;

  const order = await FindOrder.findOrderByGerador(id_modo);

  if (order && order[0].id_gerador == id_modo) {
    return next();
  }

  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: "O id informado não é o mesmo do registrado no pedido" });
};
