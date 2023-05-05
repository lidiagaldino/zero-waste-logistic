import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { IPayload } from "../interfaces/Jwt";
import FindCollector from "../services/FindCollector";

export const isCatador =
  (mode: "user" | "params") =>
  async (req: Request, res: Response, next: NextFunction) => {
    let id: number;

    if (mode == "user") {
      id = req.user.id_modo;
    } else {
      id = Number(req.params.id);
    }

    const exists = await FindCollector.findCollector(id);

    if (!exists)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Catador não existe" });

    next();
  };
