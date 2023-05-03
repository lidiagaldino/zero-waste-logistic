import { NextFunction, Request, Response } from "express";
import prisma from "../lib/db";
import Queue from "../services/Queue";
import { StatusCodes } from "http-status-codes";

export const verifyQueue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { id_modo } = req.user;

  const queue = await Queue.getQueue(Number(id));

  if (queue[0].id_catador == id_modo) {
    return next();
  }

  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: "Catador informado não é o primeiro da fila" });
};
