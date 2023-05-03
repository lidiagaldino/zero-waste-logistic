import { NextFunction, Request, Response } from "express";
import FindOrder from "../services/FindOrder";
import { StatusCodes } from "http-status-codes";

export const geradorAlreadyHasOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id_modo } = req.user;

  const order = await FindOrder.findOrderByGerador(id_modo);
  console.log(order);

  if (order) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Cliente já tem uma coleta pendente" });
  }

  return next();
};
