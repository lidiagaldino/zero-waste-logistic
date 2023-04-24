import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { IPayload } from "../interfaces/Jwt";
import FindCollector from "../services/FindCollector";

export const isCatador = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id_modo } = req.user;

  const exists = await FindCollector.findCollector(id_modo);
  console.log(exists);

  if (!exists)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Não autorizado" });

  next();
};
