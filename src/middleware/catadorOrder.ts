import { NextFunction, Request, Response } from "express";
import FindOrder from "../services/FindOrder";
import { StatusCodes } from "http-status-codes";

export const catadorOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id_modo } = req.user;
  const { id } = req.params;

  const order = await FindOrder.findCatadorOrder(id_modo, Number(id));

  if (order) {
    return next();
  }

  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: "O id informado não é o mesmo do registrado no pedido" });
};
