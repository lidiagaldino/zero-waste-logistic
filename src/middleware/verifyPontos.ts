import { NextFunction, Request, Response } from "express";
import prisma from "../lib/db";
import Queue from "../services/Queue";
import { StatusCodes } from "http-status-codes";
import Coupon from "../services/Coupon";

export const verifyPontos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { id_usuario } = req.user;

  const verify = await Coupon.verifyPontos(Number(id), id_usuario);

  if (verify) {
    return next();
  }

  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: "Não tem pontos suficientes" });
};
