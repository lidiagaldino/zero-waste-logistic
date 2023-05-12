import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import FindGenerator from "../services/FindGenerator";

export const isGerador = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id_modo } = req.user;

  const exists = await FindGenerator.findGenerator(id_modo);
  console.log(exists);

  if (!exists)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Não autorizado" });

  return next();
};
