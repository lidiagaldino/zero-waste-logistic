import { NextFunction, Request, Response } from "express";
import FindOrder from "../services/FindOrder";
import { StatusCodes } from "http-status-codes";
import Rating from "../services/Rating";

export const verifyRatingGerador = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id_modo } = req.user;

  const exists = await Rating.findRatingByGerador(id_modo, req.body.id_catador);

  if (exists) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Esse catador já foi avaliado" });
  }

  return next();
};
